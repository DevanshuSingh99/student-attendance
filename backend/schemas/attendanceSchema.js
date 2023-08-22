var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var attendanceSchema = new Schema(
    {
        date: Date,
        students: { },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
