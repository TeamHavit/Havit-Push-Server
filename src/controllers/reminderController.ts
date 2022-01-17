import express, { Request, Response } from "express";
import { scheduleService, reminderService } from "../services";
const sc = require('../modules/statusCode');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');


/**
 *  @route POST /reminder
 *  @desc add reminder
 *  @access Public
 */
const createReminder = async (req: Request, res: Response) => {
    const { time, userId, contentId, ogTitle, ogImage } = req.body;
    try {
        const reminder = await reminderService.createReminder({ time, userId, contentId, ogTitle, ogImage });
        await scheduleService.createSchedule({ _id: reminder._id, sendAt: reminder.time });
        res.status(sc.OK).send(util.success(sc.OK, responseMessage.CREATED_REMINDER));
    } catch (error) {
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.fail(sc.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
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
        const updatedReminder = await reminderService.updateReminder({ contentId, time });
        if (!updatedReminder) {
            return res.status(sc.NOT_FOUND).send(util.fail(sc.NOT_FOUND, responseMessage.NOT_FOUND));
        }
        const updatedSchedule = await scheduleService.updateSchedule({ _id: updatedReminder._id, sendAt: updatedReminder.time });
        res.status(sc.OK).send(util.success(sc.OK, responseMessage.UPDATED_REMINDER));
    } catch (error) {
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.fail(sc.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
};

export default {
    createReminder,
    modifyReminder
}