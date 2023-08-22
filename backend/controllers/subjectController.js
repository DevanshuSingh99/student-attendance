const subjectController = {};
const subjectsSchema = require("../schemas/subjectsSchema");

subjectController.getAllSubjects = async (req, res) => {
    try {
        var subjects = await subjectsSchema.find({}).distinct("name")
        res.send(subjects)
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

subjectController.addNewSubject = async (req, res) => {
    try {
        console.log(req.body);
        var {subject} = req.body
        if(!subject.trim()) return res.status(400).send("Type a new subject to add")
        await subjectsSchema.create({name:subject})
        res.send("New subject added.")
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

module.exports = subjectController;
