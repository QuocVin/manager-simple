import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { AdminDrawer, ManagerDrawer } from "../../routes/route"
import { getAuthLS, LS_KEY } from '../../helpers/localStorage';
import { ROLE } from '../../common';

export default function ({ classes, open }) {
    const history = useHistory();
    let checkAuth = false;
    const ROLE_NAME = getAuthLS(LS_KEY.R0LE)
    const loggedIn = getAuthLS(LS_KEY.R0LE) ? true : false;

    const managerDrawer = (userRole, loggedIn) => {
        if (loggedIn) {
            if (userRole === ROLE.ADMIN) {
                checkAuth = true;
                return (
                    Object.values(AdminDrawer)
                )
            } else {
                checkAuth = true;
                return (
                    Object.values(ManagerDrawer)
                )
            }
        } else {
            checkAuth = false;
            return (
                Object.values([])
            );
        }
    }

    const [childDrawer, setChildDrawer] = React.useState(
        managerDrawer(ROLE_NAME, loggedIn)
    );

    // chọn mục trên drawer
    const handleItem_click = ({ id, path }) => {
        if (id === "back") {
            const latest = history.location.pathname.split("/").pop();
            history.replace(history.location.pathname.replace(`/${latest}`, ""));
        } else if (path) {
            history.push(path);
        } else {
            history.goBacK();
        }
    };

    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            variant="persistent"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {childDrawer.map((route, idx) => {
                        const icon = route.bigIcon ? (
                            <route.bigIcon
                                fill="#3f51b5"
                                stroke="#3f51b5"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <route.icon color="primary" />
                        );

                        return (
                            <div key={route.id + idx}>
                                <ListItem button onClick={() => handleItem_click(route)} >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={route.label} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </div>
        </Drawer>
    );

}

