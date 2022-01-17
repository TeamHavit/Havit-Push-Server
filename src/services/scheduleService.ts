import Schedule from "../models/Schedule";
import { ISchedule, IScheduleDeleteDTO } from "../interfaces/ISchedule";

const createSchedule = async (data: ISchedule) => {
    const { _id, sendAt } = data;
    try {
        await Schedule.create({
            _id, sendAt, isDeleted: false
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

const deleteSchedule = async (data: IScheduleDeleteDTO) => {
    const { _id } = data;
    try {
        const deletedSchedule = await Schedule.findOneAndUpdate({ _id }, { isDeleted: true });
        return deletedSchedule;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createSchedule,
    updateSchedule,
    deleteSchedule
}