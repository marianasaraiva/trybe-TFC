import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = ({ isJoi }, _req, res, _next) => {
  if (isJoi) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return res.status(500).json({ message: 'Server Error' });
};

export default errorHandler;
