const attendanceController = {};
const subjectsSchema = require("../schemas/subjectsSchema");
const attendanceSchema = require("../schemas/attendanceSchema");

attendanceController.markAttendance = async (req, res) => {
    try {
        var { userId, subjects, date } = req.body;
        if (!userId || !date) return res.status(400).send("Missing parameters!");
        var formatedDate = new Date(date);
        formatedDate.setDate(formatedDate.getDate() + 1);
        formatedDate = formatedDate.toISOString().split("T")[0];
        var attendanceRecord = await attendanceSchema.findOne({ date: formatedDate });
        if (attendanceRecord) {
            await attendanceSchema.findByIdAndUpdate(attendanceRecord["_id"], { [`students.${userId}`]: subjects });
        } else {
            await attendanceSchema.create({ date: formatedDate, students: { [userId]: subjects } });
        }

        res.send("Attendance Marked");
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

attendanceController.getAttendance = async (req, res) => {
    try {
        var { date } = req.query;
        if (!date) return res.status(400).send("Missing parameters!");
        var dateTime = new Date(date);
        dateTime.setDate(dateTime.getDate() + 1);
        var attendance = await attendanceSchema.findOne({ date: dateTime.toISOString().split("T")[0] });
        console.log(attendance.students[req.userDetails["_id"]]);
        res.send(attendance ? (attendance.students[req.userDetails["_id"]] ? attendance.students[req.userDetails["_id"]] : []) : "Attendance not marked yet");
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

module.exports = attendanceController;
