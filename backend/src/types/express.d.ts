import { reqUser } from "./auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser; 
    }
  }
}

export {};