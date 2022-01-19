import mongoose from "mongoose";
import config from "../config"; 
import Schedule from "../models/Schedule";
import Reminder from "../models/Reminder";
import * as admin from "firebase-admin";
import { ChangeStream } from "mongodb";
import { ISchedule } from "../interfaces/ISchedule";
const _ = require('lodash');
const serviceAccount = require('../config/fcm-admin-credentials.json');
const titles = require('../modules/titleArray');

const connectDB = async () => {
  let firebase;
  try {
    if(admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      firebase = admin.app();
    }
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");
    
    // 삭제 매칭 코드 뺌
    const changeStream = Schedule.watch([{ $match: { operationType: 'delete' } }]);
    changeStream.on('change', async (data) => {
      const id = data['documentKey']._id;
      const reminder = await Reminder.findOne({ _id: id }).populate({ path: 'userId', select: { fcmToken: 1, isDeleted: 1 } });
      if (reminder.userId['isDeleted']) return; // 삭제된 스케줄
      
      const randomTitle = _.shuffle(titles)[0];
      let message = {
        data: {
          title: randomTitle as string,
          body: reminder.ogTitle as string,
          image: reminder.ogImage as string,
          url: reminder.url as string
        },
        token: reminder.userId['fcmToken'],
      };
      admin
        .messaging()
        .send(message)
        .then(function (response) {
          console.log('Successfully sent message: : ', response)
        })
        .catch(function (err) {
          console.log('Error Sending message!!! : ', err)
        })

    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
