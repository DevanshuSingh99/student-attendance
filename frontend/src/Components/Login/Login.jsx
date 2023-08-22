import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOG_IN, USER_LOGOUT } from "../../redux/actions";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: USER_LOGOUT });
    }, []);
    const [formDetails, setFormDetails] = useState({
        userName: "",
        password: "",
    });
    const [formDetailsError, setFormDetailsError] = useState({
        userName: false,
        password: false,
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
    });

    const onSubmit = async () => {
        if (validate()) {
            console.log("asd");
            await axios({
                method: "post",
                url: "http://localhost:3000/user/login",
                data: formDetails,
            })
                .then((res) => {
                    let response = res.data;
                    console.log(response);
                    dispatch({ type: LOG_IN, payload: response });
                    navigate("/dashboard");
                })
                .catch((err) => {
                    setSnackbar({ open: true, message: err.response.data });
                });
        }
    };
    function validate() {
        var validation = true;
        var errors = { userName: false, password: false };
        if (!formDetails.userName.trim()) {
            errors.userName = true;
            validation = false;
        }
        if (!formDetails.password.trim()) {
            errors.password = true;
            validation = false;
        }
        setFormDetailsError(errors);
        return validation;
    }
    const handleClose = (event, reason) => {
        setSnackbar({ open: false, message: "" });
    };
    return (
        <Container>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <form>
                <Stack spacing={2}>
                    <TextField
                        value={formDetails.userName}
                        onChange={(e) => setFormDetails({ ...formDetails, userName: e.target.value })}
                        label="Username"
                        type="text"
                        error={formDetailsError.userName}
                    />
                    <TextField
                        value={formDetails.password}
                        onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })}
                        label="Password"
                        type="password"
                        error={formDetailsError.password}
                    />
                    <Button variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
