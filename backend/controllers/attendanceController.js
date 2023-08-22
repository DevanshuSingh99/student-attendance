const attendanceController = {};
const subjectsSchema = require("../schemas/subjectsSchema");
const attendanceSchema = require("../schemas/attendanceSchema");

attendanceController.markAttendance = async (req, res) => {
    try {
        var { userId, subjects, date } = req.body;
        if (!userId || !date) return res.status(400).send("Missing parameters!");
        console.log(userId, subjects, date);
        var formatedDate = new Date(date).toISOString().split("T")[0];
        console.log(formatedDate);
        var attendanceRecord = await attendanceSchema.findOne({ date: formatedDate });
        if (attendanceRecord) {
            await attendanceSchema.findByIdAndUpdate(attendanceRecord["_id"], {[`students.${userId}`]:subjects});
        } else {
            await attendanceSchema.create({ date:formatedDate, students: { [userId]: subjects } });
        }

        res.send("Attendance Marked");
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

module.exports = attendanceController;
