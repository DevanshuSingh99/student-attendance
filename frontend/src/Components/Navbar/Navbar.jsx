import { AppBar, Container, IconButton, Menu, MenuItem } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavbarData } from "./Navbardata";
import styled from "styled-components";
import { useSelector } from "react-redux";
function Navbar() {
    const role = useSelector((state) => state.user?.user?.role);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const handleClose = (path) => {
        typeof path === "string" && navigate(path);
        setAnchorEl(null);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <AppBar position="fixed">
                <Container maxwidth="false">
                    <IconButton size="large" onClick={handleMenu} color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {NavbarData.map((item, index) => {
                            return (
                                item.roles.includes(role) && (
                                    <MenuItem key={index} onClick={(e) => handleClose(item.path)}>
                                        {item.title}
                                    </MenuItem>
                                )
                            );
                        })}
                    </Menu>
                </Container>
            </AppBar>
            <OutletContainer>
                <Outlet />
            </OutletContainer>
        </>
    );
}

export default Navbar;

const OutletContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
`;
