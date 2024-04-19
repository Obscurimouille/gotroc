import { User } from '@gotroc/types';
import OfferService from '../services/offer-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { INVALID_PARAMS, NOT_FOUND, UNAUTHORIZED, handleInternalError } from './utils.js';
import vine from '@vinejs/vine';
import {
  OfferDescriptionSchema,
  OfferImageUUIDSchema,
  OfferPriceSchema,
  OfferTitleSchema,
  SubCategoryNameSchema,
} from '../validators/fields-validator.js';
import OfferImagesService from '../services/offer-images-service.js';
import fs from 'fs';
import UserService from '../services/user-service.js';
import path from 'path';
import { FileRef } from '../providers/file-reference.js';

const __appRoot = process.cwd();

class OfferController {
  public static async getBookmarked(user: User) {
    try {
      const bookmarks = await OfferService.getBookmarked(user.id);

      return {
        success: true,
        data: bookmarks.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getImage(uuid: string) {
    try {
      const schema = vine.object({
        uuid: OfferImageUUIDSchema,
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ uuid });

      const image = await OfferImagesService.get(field.uuid);
      if (!image) return NOT_FOUND;

      const filepath = path.join(
        __appRoot,
        OfferImagesService.createPath(image.uuid, image.extension),
      );

      return {
        success: true,
        data: { ...image, path: filepath },
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async create(
    offerData: {
      title: string;
      description: string;
      price: number;
      subCategoryName: string;
      images: FileRef[];
    },
    user: User,
  ) {
    try {
      const schema = vine.object({
        title: OfferTitleSchema,
        description: OfferDescriptionSchema,
        price: OfferPriceSchema,
        subCategoryName: SubCategoryNameSchema,
        images: vine.array(vine.any()).minLength(1).maxLength(5),
      });

      const validator = vine.compile(schema);
      const fields = await validator.validate(offerData);

      // Check if the user exists
      if (!(await UserService.getById(user.id))) return UNAUTHORIZED;

      const uuids: string[] = [];
      for (const imageRef of fields.images as FileRef[]) {
        const { uuid } = await OfferImagesService.add(imageRef);
        uuids.push(uuid);
      }

      OfferService.add({
        title: fields.title,
        description: fields.description,
        price: fields.price,
        subCategoryName: fields.subCategoryName,
        images: uuids,
        authorId: user.id,
      });

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      for (const imageRef of offerData.images) {
        if (fs.existsSync(imageRef.absolutePath)) fs.unlinkSync(imageRef.absolutePath);
      }
      return handleInternalError(error);
    }
  }

  public static async getAll(user: User | null): Promise<ControllerResponse> {
    try {
      const offers = await OfferService.getAll({
        userId: user ? user.id : undefined,
      });
      return {
        success: true,
        data: offers.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getById(id: number, user: User | null): Promise<ControllerResponse> {
    if (id === undefined || typeof id != 'number' || isNaN(id)) return INVALID_PARAMS;
    if (id < 0) return INVALID_PARAMS;

    try {
      const foundOffer = await OfferService.getById(id, {
        userId: user ? user.id : undefined,
      });
      if (foundOffer === null) return NOT_FOUND;
      const recommendations = (
        await OfferService.getRecommendationsForOffer(
          { ...foundOffer },
          {
            userId: user ? user.id : undefined,
          },
        )
      ).map(this.formatOfferData);

      const offer = this.formatOfferData(foundOffer);

      return {
        success: true,
        data: { ...offer, recommendations },
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getRecommendations(
    user: User | null,
    limit?: number,
  ): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        limit: vine.number().min(0).optional(),
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ limit });

      const options: { limit?: number; excludeUserId?: number; userId?: number } = {};
      if (field.limit) options['limit'] = field.limit;
      if (user) {
        options['excludeUserId'] = user.id;
        options['userId'] = user.id;
      }

      const offers = await OfferService.getAll(options);

      return {
        success: true,
        data: offers.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getRecommendationsForOffer(
    id: number,
    user: User | null,
  ): Promise<ControllerResponse> {
    if (id === undefined || typeof id != 'number' || isNaN(id)) return INVALID_PARAMS;
    if (id < 0) return INVALID_PARAMS;

    try {
      const offer = await OfferService.getById(id, {
        userId: user ? user.id : undefined,
      });
      if (offer === null) return NOT_FOUND;
      const offers = await OfferService.getRecommendationsForOffer(
        { ...offer },
        {
          userId: user ? user.id : undefined,
        },
      );

      return {
        success: true,
        data: offers.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getByAuthorId(
    authorId: number,
    user: User | null,
  ): Promise<ControllerResponse> {
    if (authorId === undefined || typeof authorId != 'number' || isNaN(authorId))
      return INVALID_PARAMS;
    if (authorId < 0) return INVALID_PARAMS;

    const offers = await OfferService.getByAuthorId(authorId, {
      userId: user ? user.id : undefined,
    });

    try {
      return {
        success: true,
        data: offers.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async search(
    {
      subCategoryName,
      rawText,
      mainCategoryName,
    }: {
      subCategoryName?: string;
      rawText?: string;
      mainCategoryName?: string;
    },
    user: User | null,
  ): Promise<ControllerResponse> {
    if (subCategoryName !== undefined && typeof subCategoryName != 'string') return INVALID_PARAMS;
    if (rawText !== undefined && typeof rawText != 'string') return INVALID_PARAMS;
    if (mainCategoryName !== undefined && typeof mainCategoryName != 'string')
      return INVALID_PARAMS;
    if (subCategoryName === undefined && rawText === undefined && mainCategoryName === undefined)
      return INVALID_PARAMS;

    const offers = await OfferService.search(
      { subCategoryName, rawText, mainCategoryName },
      {
        userId: user ? user.id : undefined,
      },
    );

    try {
      return {
        success: true,
        data: offers.map(this.formatOfferData),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  private static formatOfferData(offer: any) {
    const { bookmarks, ...rest } = offer;
    return {
      ...rest,
      bookmarked: bookmarks && bookmarks.length > 0,
    };
  }
}

export default OfferController;
