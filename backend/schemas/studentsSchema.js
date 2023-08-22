var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
        },
        classIn: {
            type: String,
            required: [true, "Class is required."],
        },
        username: {
            type: String,
            required: [true, "Username is required."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        subjects: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);
