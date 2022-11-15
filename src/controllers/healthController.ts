import express, { Request, Response } from 'express';
const sc = require('../modules/statusCode');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');

/**
 *  @route GET /health
 *  @desc GET health status
 *  @access Public
 */

const getHealthStatus = async (req: Request, res: Response) => {
  try {
    return res
      .status(sc.OK)
      .send(util.success(sc.OK, responseMessage.HEALTH_STATUS_SUCCESS));
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
  getHealthStatus,
};
