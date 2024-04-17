import { User } from '@gotroc/types';
import { FileRef } from './file-reference.js';

type Storage = FileRef[];
type ReqContextVariables = { [key: string]: any } & { user?: User | null; storage?: Storage };

export class ReqContext {
  public variables: ReqContextVariables = {};

  constructor() {}

  public get user(): User | null | undefined {
    return this.variables.user;
  }

  public set user(user: User | null) {
    this.variables.user = user;
  }

  public get storage(): Storage | undefined {
    return this.variables.storage;
  }

  public set storage(storage: Storage) {
    this.variables.storage = storage;
  }
}

declare global {
  namespace Express {
    interface Request {
      context: ReqContext;
    }
  }
}
