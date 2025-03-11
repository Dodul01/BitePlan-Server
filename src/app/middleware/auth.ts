import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

type TUserRole = 'customer' | 'seller';

const auth = (...requiredRoles: TUserRole[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      // console.log(authHeader);

      // Check if the Authorization header is missing
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res
          .status(401)
          .json({ message: 'Authorization header is missing or invalid' });
        return;
      }

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Verify the token
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(token, config.Jwt_Token as string) as JwtPayload;
      } catch (err) {
        res.status(401).json({ message: 'Token is invalid', error: err });
        return;
      }

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { email, role, _id } = decoded;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Check if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        res.status(403).json({ message: 'Forbidden: insufficient role' });
        return;
      }

      // Attach the user to the request object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = decoded;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
};

export default auth;
