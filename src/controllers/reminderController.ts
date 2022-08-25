import express, { Request, Response } from 'express';
import { ReminderTitleUpdateDto } from '../interfaces/IReminder';
import { scheduleService, reminderService } from '../services';
const sc = require('../modules/statusCode');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');

/**
 *  @route POST /reminder
 *  @desc add reminder
 *  @access Public
 */
const createReminder = async (req: Request, res: Response) => {
  const { time, userId, contentId, ogTitle, ogImage, url } = req.body;
  try {
    const reminder = await reminderService.createReminder({
      time,
      userId,
      contentId,
      ogTitle,
      ogImage,
      url,
    });
    await scheduleService.createSchedule({
      _id: reminder._id,
      sendAt: reminder.time,
    });
    res
      .status(sc.CREATED)
      .send(util.success(sc.CREATED, responseMessage.CREATED_REMINDER));
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
 *  @route PATCH /reminder
 *  @desc Modify reminder time
 *  @access Public
 */
const modifyReminder = async (req: Request, res: Response) => {
  const { contentId, time } = req.body;
  try {
    const updatedReminder = await reminderService.updateReminder({
      contentId,
      time,
    });
    if (!updatedReminder) {
      return res
        .status(sc.NOT_FOUND)
        .send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));
    }
    const updatedSchedule = await scheduleService.updateSchedule({
      _id: updatedReminder._id,
      sendAt: updatedReminder.time,
    });
    res
      .status(sc.OK)
      .send(util.success(sc.OK, responseMessage.UPDATED_REMINDER));
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
 *  @route PATCH /reminder
 *  @desc Modify reminder time
 *  @access Public
 */
const modifyTitle = async (req: Request, res: Response) => {
  const reminderTitleUpdateDto: ReminderTitleUpdateDto = req.body;

  try {
    const updatedReminder = await reminderService.updateReminderTitle(
      reminderTitleUpdateDto,
    );
    if (!updatedReminder)
      return res
        .status(sc.NOT_FOUND)
        .send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));

    return res.status(sc.NO_CONTENT).send();
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
 *  @route DELETE /reminder/:contentId
 *  @desc Delete reminder
 *  @access Public
 */
const deleteReminder = async (req: Request, res: Response) => {
  const id = req.params.contentId;
  const contentId = +id;
  try {
    const deletedReminder = await reminderService.deleteReminder({ contentId });
    if (!deleteReminder) {
      return res
        .status(sc.NOT_FOUND)
        .send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));
    }
    const deletedSchedule = await scheduleService.deleteSchedule({
      _id: deletedReminder._id,
    });
    res
      .status(sc.OK)
      .send(util.success(sc.OK, responseMessage.DELETED_REMINDER));
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
  createReminder,
  modifyReminder,
  modifyTitle,
  deleteReminder,
};
