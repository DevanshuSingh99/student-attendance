import React, { useEffect, useState } from "react";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Checkbox, Container, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
function StudentAttendance() {
    const token = useSelector((state) => state.user?.user?.token);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [attendance, setAttendance] = useState({});
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("All");
    useEffect(() => {
        getAllStudents();
    }, []);
    useEffect(() => {
        getClasses();
    }, [allStudents]);
    const getClasses = () => {
        var tempClass = [];
        var tempAttendance = {};
        allStudents.map((student) => {
            if (!tempClass.includes(student.classIn)) {
                tempClass.push(student.classIn);
            }
            tempAttendance[student._id] = student.subjects;
        });
        setAttendance({ ...tempAttendance });
        setClasses([...tempClass]);
    };

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

    const onMarkAttendance = (userId) => {
        if (selectedDate.trim()) {
            axios({
                method: "post",
                headers: {
                    token,
                },
                url: "http://localhost:3000/attendance/markattendance",
                data: { userId, subjects: attendance[userId], date: selectedDate },
            }).then((res) => {
                let response = res.data;
                console.log(response);
                // dispatch({ type: ALL_SUBJECTS, payload: response });
                // setAllStudents(response);
            });
        } else {
            //snackbar error to select date
        }
    };

    const subjectChangeHandler = (userId, values) => {
        // console.log(attendance[userId], values);
        // setAttendance({ ...attendance, [userId]: values });
        setAttendance((previousAttendance) => ({ ...previousAttendance, [userId]: values }));
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <DatePicker
                    disableFuture
                    format="YYYY/MM/DD"
                    onChange={(e) => {
                        setSelectedDate(e.toString());
                    }}
                />
                {classes.length && (
                    <>
                        <InputLabel id="demo-simple-select-label" sx={{ display: "inline", maxWidth: "200px" }}>
                            Class Filter
                        </InputLabel>
                        <Select labelId="demo-simple-select-label" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} sx={{ minWidth: "200px" }}>
                            <MenuItem value={"All"} selected>
                                All
                            </MenuItem>
                            {classes.map((classIn) => (
                                <MenuItem key={classIn} value={classIn}>
                                    {classIn}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
            </Container>
            <TableContainer component={Paper} sx={{ maxWidth: 950 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Subjects</TableCell>
                            <TableCell align="right">Mark Attendance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allStudents.length &&
                            allStudents.map(
                                (row) =>
                                    (selectedClass === "All" || row.classIn === selectedClass) && (
                                        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.classIn}</TableCell>
                                            <TableCell align="right">
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={attendance[row._id] ?? []}
                                                    onChange={(e) => subjectChangeHandler(row._id, e.target.value)}
                                                    renderValue={(selected) => selected.join(", ")}
                                                    fullWidth
                                                >
                                                    {row.subjects.map((subject) => (
                                                        <MenuItem key={subject} value={subject}>
                                                            <Checkbox key={subject} checked={attendance[row._id]?.indexOf(subject) > -1} />
                                                            <ListItemText primary={subject} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button onClick={(e) => onMarkAttendance(row._id)} variant="contained">
                                                    Add
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </LocalizationProvider>
    );
}

export default StudentAttendance;
