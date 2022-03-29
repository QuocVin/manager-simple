import { makeStyles, alpha } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    "& .menu-icon": {
      color: "#000",
      marginRight: 10,
    },
    "& .block-left": {
      flex: 1,
      display: "flex",
      "& .logo-text": {
        fontWeight: 500,
      },
    },
    "& .block-right": {
      display: "flex",
      "& .profile": {
        marginLeft: theme.spacing(2),
      },
      "& .noti": {
        alignItems: 'center',
        marginRight: theme.spacing(3.5),
        "& .MuiBadge-anchorOriginTopRightRectangle": {
          top: 7
        }
      },
    },
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    // 	easing: theme.transitions.easing.easeOut,
    // 	duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    backgroundColor: '#ebfae8',
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

    //
    height: "100vh",
    overflow: "auto",
    position: "relative",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
    marginTop: 50,
    marginBottom: 10,
  },
  role: {
    textAlign: 'center',
    marginBottom: '25',
  },

  // header
  rootProfileMenu: {
    "& .display-name": {
      "& .avatar-icon": {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
      },
    },
    "& .menu-item": {
      "& .item-icon": {
        minWidth: "unset",
        paddingRight: 10,
      },
    },
    "& .MuiList-root": {
      padding: 0,
    },
  },
  rootLangMenu: {
    "& .lang-icon": {
      width: "36px",
      height: "36px",
    },
  },
  langPopover: {
    "& .MuiBox-root": {
      backgroundColor: "transparent",
    },
  },
  langMenuList: {
    padding: "0px !important",
    backgroundColor: "rgba(255,255,255,1)",
    "& .MuiListItem-root": {
      padding: "5px 8px",
    },
  },

  /////////////////
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    marginTop: '3px',
    height: '35px',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));
