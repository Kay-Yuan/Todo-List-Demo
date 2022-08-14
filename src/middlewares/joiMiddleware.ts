import { Response, Request, NextFunction } from "express";

const joiMiddleware = (schema: any) =>
  function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req, { allowUnknown: true });

    if (error) {
      next(error);
      return;
    }

    req.headers = value.headers;
    req.params = value.params;
    req.query = value.query;
    req.body = value.body;

    next();
  };

// module.exports = joiMiddleware;
export = joiMiddleware;
