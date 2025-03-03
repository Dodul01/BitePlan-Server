// import bcrypt from 'bcrypt';

// import { User } from '../user/user.model';
// import config from '../../config';
// import { createToken } from './auth.utils';
// import { TLoginUser } from './auth.interface';

// export const loginUser = async (payload: TLoginUser) => {
//   const { email, phone, password } = payload;

//   // Find user by email or phone
//   const user = await User.findOne({
//     $or: [{ email }, { phone }],
//   });

//   if (!user) {
//     throw {
//       message: 'User not found',
//       statusCode: 404,
//       details: {
//         field: 'email/phone',
//         issue: 'No user exists with the given email or phone',
//       },
//     };
//   }

//   // Verify password
//   if (!user.password) {
//     throw {
//       message: 'Invalid credentials',
//       statusCode: 401,
//       details: {
//         field: 'password',
//         issue: 'Password is not set for this user',
//       },
//     };
//   }
//   // check it match or not
//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) {
//     throw {
//       message: 'Invalid credentials',
//       statusCode: 401,
//       details: {
//         field: 'password',
//         issue: 'The provided password is incorrect',
//       },
//     };
//   }

//   // Generate JWT token
//   const jwtPayload = {
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//   };

//   //send it to create token
//   const jwtToken = createToken(
//     jwtPayload,
//     config.Jwt_Token as string,
//     config.jwt_access_expiry,
//   );

//   return {
//     jwtToken,
//   };
// };

// export const AuthServices = {
//   loginUser,
// };

import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';
import { TLoginUser } from './auth.interface';

export const loginUser = async (payload: TLoginUser) => {
  const { identifier, password } = payload;

  // Determine if identifier is an email or phone based on a simple check.
  const isEmail = identifier.includes('@');

  // Find user by email if identifier is an email, otherwise by phone.
  const user = await User.findOne(
    isEmail ? { email: identifier } : { phone: identifier },
  );

  if (!user) {
    throw {
      message: 'User not found',
      statusCode: 404,
      details: {
        field: 'identifier',
        issue: 'No user exists with the given email or phone',
      },
    };
  }

  if (!user.password) {
    throw {
      message: 'Invalid credentials',
      statusCode: 401,
      details: {
        field: 'password',
        issue: 'Password is not set for this user',
      },
    };
  }

  // Compare the provided password with the stored hash.
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw {
      message: 'Invalid credentials',
      statusCode: 401,
      details: {
        field: 'password',
        issue: 'The provided password is incorrect',
      },
    };
  }

  // Prepare the payload for JWT.
  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  // Create a JWT token using your helper function.
  const jwtToken = createToken(
    jwtPayload,
    config.Jwt_Token as string,
    config.jwt_access_expiry as string,
  );

  return { jwtToken };
};

export const AuthServices = {
  loginUser,
};
