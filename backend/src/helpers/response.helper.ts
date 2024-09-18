import { Response } from 'express';

export default class ResponseHelpers {
  private statusCode: number = 200;
  private res: Response = null;

  constructor(res: Response) {
    this.res = res;
  }

  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  error(errorMessage: string) {
    this.res
      .status(this.statusCode)
      .json({ message: 'error', error: errorMessage });
  }

  success(data: any) {
    this.res.status(this.statusCode).json(data);
  }
}
