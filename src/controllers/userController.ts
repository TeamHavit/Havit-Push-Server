import express, { Request, Response } from "express";
import { userService } from "../services";
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
        return res.status(sc.BAD_REQUEST).send(util.fail(sc.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
        const user = await userService.createUser({ fcmToken });
        res.status(sc.OK).send(util.success(sc.OK, responseMessage.CREATED_USER, user));
    } catch (error) {
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.fail(sc.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
};

export default {
    registerUser
};