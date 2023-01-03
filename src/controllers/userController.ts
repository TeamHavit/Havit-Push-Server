import express, { Request, Response } from 'express';
import { UserTokenUpdateDto } from '../interfaces/IUser';
import { isValidObjectId } from '../modules/checkObjectIdValidation';
import { userService } from '../services';
const sc = require('../modules/statusCode');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');

/**
 *  @route POST /user
 *  @desc add user
 *  @access Public
 */
const registerUser = async (req: Request, res: Response) => {
  const { fcmToken } = req.body;
  if (!fcmToken) {
    return res
      .status(sc.BAD_REQUEST)
      .send(util.fail(sc.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try {
    const user = await userService.createUser({ fcmToken });
    res
      .status(sc.CREATED)
      .send(util.success(sc.CREATED, responseMessage.CREATED_USER, user));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          sc.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

/**
 *  @route POST /user/{userId}/refresh-token
 *  @desc refresh user fcm token
 *  @access Public
 */
const updateUserToken = async (req: Request, res: Response) => {
  const userTokenUpdateDto: UserTokenUpdateDto = req.body;
  const { userId } = req.params;

  try {
    const updatedToken = await userService.updateUserToken(
      userId,
      userTokenUpdateDto,
    );
    if (!updatedToken) {
      return res
        .status(sc.NOT_FOUND)
        .send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));
    }

    res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          sc.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

/**
 *  @route DELETE /user/{userId}
 *  @desc delete user
 *  @access Public
 */
const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const { userId } = req.params;

  const isValidId = isValidObjectId(userId);
  if (!isValidId) {
    return res
      .status(sc.BAD_REQUEST)
      .send(util.fail(sc.BAD_REQUEST, responseMessage.BAD_REQUEST));
  }
  try {
    const deleteCount = await userService.deleteUser(userId);
    if (!deleteCount) {
      return res
        .status(sc.NOT_FOUND)
        .send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));
    }

    res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          sc.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};
export default {
  registerUser,
  updateUserToken,
  deleteUser,
};
