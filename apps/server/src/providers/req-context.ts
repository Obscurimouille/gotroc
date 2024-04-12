import { User } from "@gotroc/types";

type ReqContextVariables = { [key: string]: any } & { user?: User | null };

export class ReqContext {
  private variables: ReqContextVariables = {};

  constructor() {}

  public get user(): User | null | undefined {
    return this.variables.user;
  }

  public set user(user: User | null) {
    this.variables.user = user;
  }
}

declare global {
  namespace Express {
    interface Request {
      context: ReqContext;
    }
  }
}
