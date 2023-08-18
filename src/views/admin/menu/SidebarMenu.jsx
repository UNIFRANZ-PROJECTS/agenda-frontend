import { useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useSelector } from 'react-redux';

export const SideNav = ({ open, onClose }) => {

    const { data } = useSelector((state) => state.auth);

    const { pathname } = useLocation();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const content = (
        <Box
            component="nav"
            sx={{
                flexGrow: 1,
                px: 2,
                py: 3
            }}
        >
            <Stack
                component="ul"
                spacing={0.5}
                sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0
                }}
            >
                {items(data).map((item) => (
                    <Box
                        key={item.title}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        <Typography
                            color="inherit"
                            variant="subtitle1"
                        >
                            {item.title}
                        </Typography>
                        {item.subitems.map((element) => {
                            const active = element.path ? (pathname === element.path) : false;
                            return (
                                <SideNavItem
                                    key={element.title}
                                    active={active}
                                    disabled={element.disabled}
                                    external={element.external}
                                    icon={element.icon}
                                    path={element.path}
                                    title={element.title}
                                />
                            );
                        })}
                    </Box>
                ))}
            </Stack>
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#092044',
                        color: 'white',
                        width: 220
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#092044',
                    color: 'white',
                    width: 220
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
