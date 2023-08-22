var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subjectSchema = new Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Subject", subjectSchema);
