import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Components/Login/Login";
import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
import RequireAuth from "./RequireAuth";
import StudentDatabase from "./Components/Student/StudentDatabase";
import StudentAttendance from "./Components/Student/StudentAttendance";
import MyProfile from "./Components/Student/MyProfile";
import MyAttendance from "./Components/Student/MyAttendance";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Navbar />}>
                        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                            <Route path="studentdatabase" element={<StudentDatabase />} />
                            <Route path="studentattendance" element={<StudentAttendance />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["Student"]} />}>
                            <Route path="myprofile" element={<MyProfile />} />
                            <Route path="myAttendance" element={<MyAttendance />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
