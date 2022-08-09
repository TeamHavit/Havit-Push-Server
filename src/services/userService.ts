import User from '../models/User';
import { IUser, UserTokenUpdateDto } from '../interfaces/IUser';

const createUser = async (data: IUser) => {
  const { fcmToken } = data;
  try {
    const user = await User.create({
      fcmToken,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUserToken = async (
  userId: string,
  userTokenUpdateDto: UserTokenUpdateDto,
) => {
  const { fcmToken } = userTokenUpdateDto;

  try {
    const user = await User.findById(userId);
    if (!user) return undefined;

    const filter = {
      _id: userId,
    };
    const update = { fcmToken };

    const updatedUser = await User.findOneAndUpdate(filter, update);

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  updateUserToken,
};
