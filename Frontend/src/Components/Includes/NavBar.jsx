import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const xpages = [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, {name:'My Tasks', path: '/tasks'}, { name: "Contact", path: '/Contact' }];

export const NavBar = ({ userInfo, logOut }) => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        if (e.target?.innerText === 'Logout') {
            logOut();
        }
        setAnchorElUser(null);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <TaskAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Typography
                                    component={Link}
                                    to="/"
                                    variant="h6"
                                    noWrap
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Just Do It
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {xpages.map((page, i) => (
                                        <Button
                                            LinkComponent={Link}
                                            to={page.path}
                                            key={i}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page.name}
                                        </Button>
                                    ))}
                                </Box>

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >
                                        {xpages.map((page, i) => (
                                            <MenuItem key={i} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page.name}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>

                                <TaskAltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                <Typography
                                    component={Link}
                                    to="/"
                                    variant="h5"
                                    noWrap
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Just Do It
                                </Typography>

                                {
                                    userInfo?.userid ?

                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <MenuItem component={Link} to={"/profile"} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">{"Profile"}</Typography>
                                                </MenuItem>
                                                {
                                                    userInfo.admin && (
                                                        <MenuItem component={Link} to={"/dashboard"} onClick={handleCloseUserMenu}>
                                                            <Typography textAlign="center">{"Dashboard"}</Typography>
                                                        </MenuItem>
                                                    )
                                                }
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">{"Logout"}</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                        :
                                        <Button
                                            LinkComponent={Link}
                                            to="/login"
                                            onClick={handleCloseNavMenu}
                                            sx={{ color: 'white' }}
                                        >
                                            Login
                                        </Button>

                                }
                            </Toolbar>
                        </Container>
                    </AppBar>
                </ThemeProvider>
            </Stack>

        </>
    )
}