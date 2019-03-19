import AppError from "./AppError";
import express from 'express';

export default function (err: any, req: express.Request, res: express.Response, next: any) {
  console.log("error", err);

  if (typeof err === typeof AppError) {
    const appError: AppError = err;
    return res.status(appError.statusCode)
      .json({ status: appError.statusCode, message: appError.message });
  }

  if (err.status) {
    return res.status(err.status).json(err);
  }

  return res.status(500).json({ status: 500, message: err.message });
}