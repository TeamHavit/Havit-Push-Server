import mongoose from 'mongoose';
import config from '../config';
import Schedule from '../models/Schedule';
import Reminder from '../models/Reminder';
import * as admin from 'firebase-admin';
import { reminderService } from '../services';
const _ = require('lodash');

import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../fcm-admin-credentials.json';

const titles = require('../modules/titleArray');

const connectDB = async () => {
  let firebase;
  const serAccount: ServiceAccount = serviceAccount as ServiceAccount;
  try {
    if (admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(serAccount),
      });
    } else {
      firebase = admin.app();
    }
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongoose Connected ...');

    const changeStream = Schedule.watch([
      { $match: { operationType: 'delete' } },
    ]);
    changeStream.on('change', async (data) => {
      const id = data['documentKey']._id;

      if (data['documentKey'].isDeleted) return;

      const reminder = await Reminder.findOne({ _id: id }).populate({
        path: 'userId',
        select: { fcmToken: 1 },
      });

      if (!reminder) return;

      const randomTitle = _.shuffle(titles)[0];

      let message = {
        data: {
          title: randomTitle as string,
          body: reminder.ogTitle as string,
          image: reminder.ogImage as string,
          url: reminder.url as string,
          contentId: reminder.contentId.toString(),
          isSeen: reminder.isSeen.toString(),
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: randomTitle as string,
                body: reminder.ogTitle as string,
                url: reminder.url as string,
                contentId: reminder.contentId.toString(),
                isSeen: reminder.isSeen.toString(),
              },
              category: 'havit',
              'thread-id': '5280',
              'mutable-content': 1,
            },
          },

          fcm_options: {
            image: reminder.ogImage as string,
          },
        },
        token: reminder.userId['fcmToken'],
      };

      const deletedReminder = await reminderService.deleteReminder({
        contentId: reminder.contentId,
      });

      admin
        .messaging()
        .send(message)
        .then(function (response) {
          console.log('Successfully sent message: : ', response);
        })
        .catch(function (err) {
          console.log('Error Sending message!!! : ', err);
        });
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
