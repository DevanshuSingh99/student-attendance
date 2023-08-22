import {
    Alert,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    ListItem,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ALL_SUBJECTS } from "../../redux/actions";

function StudentDatabase() {
    const token = useSelector((state) => state.user?.user?.token);
    const [subjects, setSubjects] = useState(["Math", "English", "Science", "History", "Psychology", "Social Science"]);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [newSubject, setNewSubject] = useState("");
    const [allStudents, setAllStudents] = useState([]);
    const [newStudentError, setNewStudentError] = useState({ name: false, age: false, classIn: false, username: false, password: false, subjects: false });
    const [newStudent, setNewStudent] = useState({ name: "", age: "", classIn: "", username: "", password: "", subjects: [] });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                token,
            },
            url: "http://localhost:3000/subject/getAllSubjects",
        }).then((res) => {
            let response = res.data;
            dispatch({ type: ALL_SUBJECTS, payload: response });
            setSubjects(response);
        });
    }, []);
    useEffect(() => {
        getAllStudents();
    }, []);
    const getAllStudents = () => {
        axios({
            method: "get",
            headers: {
                token,
            },
            url: "http://localhost:3000/user/getAllStudent",
        }).then((res) => {
            let response = res.data;
            // dispatch({ type: ALL_SUBJECTS, payload: response });
            setAllStudents(response);
        });
    };
    const createHandler = () => {
        setNewStudent({ name: "", age: "", classIn: "", username: "", password: "", subjects: [] });
        setNewStudentError({ name: false, age: false, classIn: false, username: false, password: false, subjects: false });
        setModalOpen(true);
    };
    const modalCloseHandler = () => {
        setModalOpen(false);
    };
    const onSubmit = () => {
        if (validate()) {
            axios({
                method: "post",
                headers: {
                    token,
                },
                url: "http://localhost:3000/user/createStudent",
                data: newStudent,
            }).then((res) => {
                let response = res.data;
                setSnackbar({ open: true, message: "New student created!", severity: "success" });
                setModalOpen(false);
                getAllStudents();
            });
        }
    };
    const addNewSubjectHandler = (e) => {
        if (newSubject.trim() && !subjects.includes(newSubject)) {
            axios({
                method: "post",
                headers: {
                    token,
                },
                url: "http://localhost:3000/subject/addNewSubject",
                data: { subject: newSubject },
            }).then((res) => {
                let response = res.data;
                setSubjects((prev) => [...prev, newSubject]);
            });
        }
    };
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewStudent({ ...newStudent, subjects: typeof value === "string" ? value.split(",") : value });
    };
    function validate() {
        var validation = true;
        var errors = { username: false, password: false, age: false, class: false, name: false, subject: false };
        if (!newStudent.username.trim()) {
            errors.username = true;
            validation = false;
        }
        if (!newStudent.password.trim()) {
            errors.password = true;
            validation = false;
        }
        if (!newStudent.age.trim()) {
            errors.age = true;
            validation = false;
        }
        if (!newStudent.classIn.trim()) {
            errors.class = true;
            validation = false;
        }
        if (!newStudent.name.trim()) {
            errors.name = true;
            validation = false;
        }
        if (!newStudent.subjects.length) {
            errors.subject = true;
            validation = false;
        }
        setNewStudentError(errors);
        return validation;
    }
    const handleClose = (event, reason) => {
        setSnackbar({ open: false, message: "" });
    };
    return (
        <>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Dialog open={modalOpen} onClose={modalCloseHandler}>
                <DialogTitle>New Student Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>To create new student, fill out the form.</DialogContentText>
                    <TextField
                        error={newStudentError.name}
                        autoFocus
                        margin="dense"
                        label="Name*"
                        type="text"
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={newStudentError.dob}
                        margin="dense"
                        type="number"
                        label="Age*"
                        onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={newStudentError.classIn}
                        margin="dense"
                        label="Class*"
                        type="text"
                        onChange={(e) => setNewStudent({ ...newStudent, classIn: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={newStudentError.username}
                        margin="dense"
                        label="Username*"
                        type="text"
                        onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={newStudentError.password}
                        margin="dense"
                        label="Password*"
                        type="password"
                        onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <InputLabel id="demo-multiple-checkbox-label">Subjects*</InputLabel>
                    <Select
                        error={newStudentError.subject}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={newStudent.subjects}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        // MenuProps={MenuProps}
                        fullWidth
                    >
                        {subjects.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={newStudent.subjects.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        <ListItem>
                            <TextField value={newSubject} autoFocus margin="dense" label="New Subject" type="text" onChange={(e) => setNewSubject(e.target.value)} fullWidth variant="standard" />
                            <Button variant="contained" onClick={addNewSubjectHandler} sx={{ whiteSpace: "nowrap", minWidth: "auto" }}>
                                Add new
                            </Button>
                        </ListItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" onClick={createHandler}>
                Create
            </Button>
            <TableContainer component={Paper} sx={{ maxWidth: 950 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">AGE</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Subjects</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allStudents.map((row) => (
                            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                                <TableCell align="right">{row.classIn}</TableCell>
                                <TableCell align="right">{row.subjects.join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default StudentDatabase;
