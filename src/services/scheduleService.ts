import Schedule from "../models/Schedule";
import { ISchedule } from "../interfaces/ISchedule";

const createSchedule = async (data: ISchedule) => {
    const { _id, sendAt } = data;
    try {
        await Schedule.create({
            _id, sendAt
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createSchedule
}