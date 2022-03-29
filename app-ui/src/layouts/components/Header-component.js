import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Slide,
    useScrollTrigger,
    Button,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    Badge,
    InputBase,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { useStore } from "react-redux";
import cookies from 'react-cookies';
import { clearAuthLS } from '../../helpers/localStorage'
import { getAuthLS, LS_KEY } from '../../helpers/localStorage';
import { ROLE } from '../../common';
import { RoutePaths } from '../../routes/route'

export default function ({ classes, open, setOpen, mainRef }) {
    const trigger = useScrollTrigger({ target: mainRef });
    const history = useHistory();
    const store = useStore();
    const auth = store.getState();
    const check = getAuthLS(LS_KEY.R0LE)


    const [openSet, setOpenSet] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpenSet((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenSet(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenSet(false);
        }
    }

    //   xử lý ẩn hiện btn drawer
    const hiddenBtn = () => {
        if (check === ROLE.ADMIN || check === ROLE.MANAGER) {
            return (
                <div className="block-left">
                    <IconButton
                        size="small"
                        className="menu-icon"
                        onClick={() => setOpen((pre) => !pre)}
                    >
                        {open ? <ArrowBackIosIcon /> : <MenuIcon />}
                    </IconButton>

                    <Button>
                        <Typography variant="h5" noWrap className="logo-text" onClick={() => handleView(RoutePaths.UserManager)}>
                            MANAGE USERS
                        </Typography>
                    </Button>
                </div>
            );
        } else
            return (
                <div className="block-left">
                    <Button>
                        <Typography variant="h5" noWrap className="logo-text">
                            USER INFO
                        </Typography>
                    </Button>
                </div >
            );
    }

    let user = auth;
    if (cookies.load("user") != null) {
        user = cookies.load("user")
    };

    // xóa token tại localStorage khi đăng xuất
    const signOut = () => {
        clearAuthLS();
    }

    // chọn đăng xuất
    const handleLogout_click = () => {
        cookies.remove("user");
        cookies.remove("access_token");
        signOut();
        setOpenSet(false);
        history.push('/');
        window.location.reload();
    };

    const handleView = (path) => {
        setOpenSet(false);
        if (path === RoutePaths.UserProfile) {
            history.push(RoutePaths.UserProfile.replace(":id", "user-info"), {
                userId: user.id,
            })
        } else {
            history.push(path);
        }
    }

    let userComponet = <>
        <Button onClick={() => handleView('/Login')} > <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng nhập</Typography> </Button>
        <Button onClick={() => handleView('/Register')} > <Typography variant="subtitle1" style={{ textTransform: 'none' }}>Đăng Ký</Typography> </Button>
    </>
    if (user != null) {
        if (user.username != null)
            userComponet = <>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Tìm kiếm"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Badge badgeContent={4} color="secondary" className="noti">
                    <NotificationsIcon style={{ top: 0 }} />
                </Badge>
                <div>
                    <Button
                        ref={anchorRef}
                        aria-controls={openSet ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        {user.username}
                    </Button>
                    <Popper open={openSet} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={openSet} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={() => handleView(RoutePaths.UserProfile)}>Thông tin</MenuItem>
                                            <MenuItem onClick={handleLogout_click}>Đăng xuất</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </>
    }

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {hiddenBtn()}

                    <div className="block-right " >
                        {userComponet}

                        {/* {userSetting()} */}
                    </div>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}