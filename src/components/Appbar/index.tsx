import { FunctionComponent, useState } from 'react'
import { Avatar } from '@material-ui/core';
import { globalState, User } from 'types'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
/**Material */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import useLogout from 'hooks/logout';



interface IAppbar {
    pathP: string,
    setopen: any,
    open: boolean
}

const Appbar: FunctionComponent<IAppbar> = ({ pathP, setopen, open }) => {
    const user: User = useSelector((state: globalState) => state.user);
    const { logout } = useLogout()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        handleMenuClose()
        logout()
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link
                    to={pathP}
                    style={{ textDecoration: "none", color: "#000" }}>
                    Profile
                </Link>
            </MenuItem>
            <MenuItem
                onClick={handleLogout}
            >
                Salir
            </MenuItem>
        </Menu>
    );




    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor:"#21ba45"}}>
                    <Toolbar>
                        <IconButton
                        onClick={() => setopen(!open)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            CMU
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar alt="img-profile" src={user.url} />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                disabled
                                aria-haspopup="true"
                                style={{ color: "#ffff" }}
                            >
                                {user.matricula}
                            </IconButton>

                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
        </>
    )
}
export default Appbar;

/**
 * <header className="header-custom">
                <h2>
                    <label onClick={() => setopen(!open)}>
                        <span className="las la-bars"></span>
                    </label>

                    Home
                </h2>
                <div className="user-wrapper">
                    <Link to={pathP} className="image-custom">
                        <Avatar alt="user" src={user.url} />
                    </Link>
                    <div>
                        <h4>{user.nombre} {user.a_paterno}</h4>
                        <small>{user.matricula}</small>
                    </div>
                </div>
            </header>
 */