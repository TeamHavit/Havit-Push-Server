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

const updateSchedule = async (data: ISchedule) => {
    const { _id, sendAt } = data;
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate({ _id: _id }, { sendAt: sendAt});
        return updatedSchedule;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createSchedule,
    updateSchedule
}