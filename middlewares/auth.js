import Errorhandler from '../utils/errorHandler';
import { getSession } from 'next-auth/client';
import catchAsyncError from './catchAsyncError';
import ErrorHandler from '../utils/errorHandler';

//Verify Login Middleware
const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new Errorhandler('Login Invalid', 401));
  }
  req.user = session.user;
  next();
});

//Authorize Role Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Your role ${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
