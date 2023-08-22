import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
function MyAttendance() {
    const token = useSelector((state) => state.user?.user?.token);
    const subjects = useSelector((state) => state.user?.user?.user?.subjects);
    const [selectedDate, setSelectedDate] = useState("");
    const [attendance, setAttendance] = useState(undefined);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });
    const fetchAttendance = () => {
        axios({
            method: "get",
            headers: {
                token,
            },
            url: `http://localhost:3000/attendance/getAttendance?date=${selectedDate}`,
        })
            .then((res) => {
                let response = res.data;
                if (typeof response === "string") {
                    setSnackbar({ open: true, message: response, severity: "info" });
                    setAttendance(undefined);
                } else {
                    setAttendance(response);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };
    const handleClose = (event, reason) => {
        setSnackbar({ open: false, message: "" });
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Stack gap={2}>
                <Typography variant="h4">View your attendance here</Typography>
                <DatePicker
                    disableFuture
                    format="YYYY/MM/DD"
                    onChange={(e) => {
                        console.log(e);
                        setSelectedDate(e.toString());
                    }}
                />
                <Button variant="contained" onClick={fetchAttendance}>
                    Get My Attendance
                </Button>
                {subjects &&
                    attendance &&
                    subjects.map((subject) => (
                        <Typography variant="h5">
                            {subject} : {attendance.includes(subject) ? ("Present", (<DoneAllRoundedIcon sx={{ color: "green" }} />)) : ("Absent", (<CancelIcon sx={{ color: "red" }} />))}
                        </Typography>
                    ))}
            </Stack>
        </LocalizationProvider>
    );
}

export default MyAttendance;
