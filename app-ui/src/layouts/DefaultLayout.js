import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerComponent from "./components/Drawer-component";
import MainComponent from "./components/Main-component";
import HeaderComponent from "./components/Header-component";
import { useStyles } from "./DefaultLayout-styles";
import { Box, useScrollTrigger } from "@material-ui/core";
import { getAuthLS, LS_KEY } from '../helpers/localStorage';

export default function ({ children, setToken, ...rest }) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mainRef, setMainRef] = useState();
  const trigger = useScrollTrigger({ target: mainRef });

  useEffect(() => {
    if (trigger) {
      setOpenDrawer(false)
    }
  }, [trigger])

  return (
    <Box className={classes.root}>
      <CssBaseline />

      {/*  */}
      <HeaderComponent
        classes={classes}
        setToken={setToken}
        open={openDrawer}
        setOpen={setOpenDrawer}
        {...rest}
        mainRef={mainRef}
      />

      {/*  */}
      <DrawerComponent classes={classes} open={openDrawer} />

      {/*  */}
      <MainComponent classes={classes} children={children} open={openDrawer} setRef={setMainRef} />

      {/*  */}
    </Box>
  );
}
