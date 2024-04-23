import { Rating } from "@gotroc/types";

export class RatingService {
  /**
   * Calculate the average rating from a list of ratings
   * @param ratings List of ratings
   * @returns The average rating
   */
  public static getAverage(ratings: Rating[]): number {
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    const average = sum / ratings.length;
    return average;
  }
}