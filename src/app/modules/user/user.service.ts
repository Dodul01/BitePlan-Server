/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getUserFromDB = async (email: string) => {
  const user = await User.findOne({ email }).select('-password');
  return user;
};

const updateUserFromDB = async (email: string, data: any) => {
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: data },
    { new: true, projection: { password: 0 } },
  );

  return updatedUser;
};

export const UserService = {
  createUserIntoDB,
  getUserFromDB,
  updateUserFromDB,
};
