import { Request, Response } from 'express';
import { userValidation } from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodPerseUser = userValidation.userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodPerseUser);

    res.status(200).send({
      success: true,
      message: 'User created successfully.',
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = await UserService.getUserFromDB(email);

    res.status(200).send({
      success: true,
      message: 'User get successfully.',
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = UserService.updateUserFromDB(email)

    res.status(200).send({
      success: true,
      message: 'User get successfully.',
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

export const UserControllers = {
  createUser,
  getUser,
  updateUser
};
