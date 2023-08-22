import { Box, Container, ListItem, Stack } from "@mui/material";
import { useSelector } from "react-redux";

function MyProfile() {
    const user = useSelector((state) => state.user?.user.user);
    console.log(user);
    return (
        <>
            {user && (
                <Box>
                    <Stack>
                        <ListItem>Name:{user.name}</ListItem>
                        <ListItem>Class:{user.classIn}</ListItem>
                        <ListItem>Age:{user.age}</ListItem>
                        <ListItem>Subjects:{user.subjects.join(", ")}</ListItem>
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default MyProfile;
