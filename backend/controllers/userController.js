const userController = {};
const jwt = require("jsonwebtoken");
const studentsSchema = require("../schemas/studentsSchema");

userController.login = async (req, res) => {
    try {
        var { userName, password } = req.body;
        if (!userName.trim() || !password.trim()) return res.status(400).send("missing");
        if (userName.toLowerCase() === "admin" && password.toLowerCase() === "adminpass") {
            // admin login
            var token = jwt.sign({ role: "Admin" }, "Secret");
            res.send({ token, user: { userName: "Admin" }, role: "Admin" });
        } else {
            var student = await studentsSchema.findOne({ username:userName });
            if (!student) return res.status(400).send("Invalid username");
            if (password !== student.password) return res.status(400).send("Invalid password");
            var token = jwt.sign({ _id: student["_id"], role: "Student" }, "Secret");
            res.send({ token, user: student, role: "Student" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

userController.createStudent = async (req, res) => {
    try {
        var { username, password, name, age, subjects, classIn } = req.body;
        if (!username?.trim() || !password?.trim() || !name?.trim() || !age?.trim() || !subjects?.length || !classIn?.trim()) return res.status(400).send("All field are required");
        var newStudent = await studentsSchema.create({ username, password, name, age, subjects, classIn });

        res.send(newStudent);
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

userController.getAllStudent = async (req, res) => {
    try {
        var students = await studentsSchema.find({}, { __v: 0 }).sort({createdAt:-1});
        res.send(students);
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
};

module.exports = userController;
