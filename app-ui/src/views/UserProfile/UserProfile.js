import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useStyles } from "./UserProfile-styles";
import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useLocation } from 'react-router';
import { FIELDS_UPDATE_USER, FIELDS_REGISTER, endpoints, API } from '../../common';
import { RoutesApp } from '../../routes/route'
import cookies from 'react-cookies';
import { useStore } from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserProfile() {
    const classes = useStyles();
    const history = useHistory();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [alertUp, setAlertUp] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('');
    const store = useStore();
    const auth = store.getState();
    const [createView, setCreateView] = useState(false)

    let user = auth;
    if (cookies.load("user") != null) {
        user = cookies.load("user")
    };

    useEffect(() => {
        // async function init() {
        //     await fetchUser()
        // }
        // init()
        checkCreate()
    }, [])

    const checkCreate = () => {
        if (state?.create) {
            setCreateView(true)
            setUserInfo({
                role_name: "REGISTER"
            })
            console.info('userInfo', userInfo)
        } else {
            fetchUser()
        }
    }

    const fetchUser = async () => {
        let USER_ID = state?.userId ? state?.userId : user.id
        setLoading(true)
        setTimeout(() => {
            API.get(endpoints["user-info"](USER_ID)).then(res => {
                setUserInfo(res?.data?.data)
                setTitle(res?.data?.data?.name)
            })
            setLoading(false)
        }, 500);
    }

    const updateInfo = async () => {
        try {
            let res = await API.put(endpoints["user-update"], userInfo);
            console.info(res?.data)
            if (res?.data?.code === 'Success') {
                setAlertText("Bạn đã cập nhật thành công")
                setAlertUp(true)
            } else {
                setAlertText(res?.data?.error)
                setAlertUp(true)
                setError(true)
            }
        } catch (err) {
            setAlertText("Hệ thống bị lỗi")
            setAlertUp(true)
            setError(true)
        }
    };

    const createNew = async () => {
        try {
            let res = await API.post(endpoints["register"], userInfo);
            if (res?.data?.code === 'Success') {
                setAlertUp(true)
                setAlertText("Bạn đã tạo mới thành công")
            } else {
                setAlertText(res?.data?.error)
                setAlertUp(true)
            }
        } catch (err) {
            setAlertText("Hệ thống bị lỗi")
            setAlertUp(true)
        }
    };

    const accInfo = (event) => {
        if (event.toString().includes("GMT+")) {
            setUserInfo({
                ...userInfo,
                date_ob: event
            })
        } else {
            event.persist();
            if (event.target.name === "username") {
                return
            } else {
                setUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value
                })
            }
        }
    }

    const newAcc = (event) => {
        if (event.toString().includes("GMT+")) {
            setUserInfo({
                ...userInfo,
                date_ob: event
            })
        } else {
            event.persist();
            setUserInfo({
                ...userInfo,
                [event.target.name]: event.target.value
            })
        }
    }

    const handleBack = () => {
        history.push(RoutesApp.UserManager.path);
    };

    const handleCloseAlert = () => {
        setAlertUp(false);
        if (error) {
            setError(false)
        } else {
            history.push(RoutesApp.UserManager.path)
        }
    };

    return (
        <Container>
            {createView ? (
                <Typography variant="h3" className={classes.title}>Tạo người dùng mới</Typography>
            ) : (
                <Typography variant="h3" className={classes.title}>Thông tin người dùng: {title}</Typography>
            )}
            <Container maxWidth="xs">
                {/* thông tin người dùng */}
                <form className={classes.form}>
                    {loading ? <p>loading . . .</p> :
                        <>
                            {createNew ? (
                                <div>
                                    {FIELDS_REGISTER.map((f) => {
                                        return (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                margin='normal'
                                                key={f.id + ' register'}
                                                id={f.id}
                                                name={f.id}
                                                label={f.label}
                                                value={userInfo[f.id]}
                                                onChange={newAcc}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <div>
                                    {FIELDS_UPDATE_USER.map((f) => {
                                        return (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                margin='normal'
                                                key={f.id + ' register'}
                                                id={f.id}
                                                name={f.id}
                                                label={f.label}
                                                value={userInfo[f.id]}
                                                onChange={accInfo}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            )}

                            <div>
                                <FormControl component="fieldset" className={classes.radio}>
                                    <FormLabel component="legend">Giới tính</FormLabel>
                                    <RadioGroup row aria-label="gen" name="gen" value={userInfo?.gen ? userInfo?.gen : "F"} onChange={accInfo}>
                                        <FormControlLabel value="F" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="M" control={<Radio />} label="Nam" />
                                    </RadioGroup>
                                </FormControl>

                                <div className={classes.dateTime}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date_ob"
                                            label="Ngày sinh"
                                            value={userInfo.date_ob}
                                            onChange={accInfo}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </>
                    }

                    {/* nút xử lý quay về hoặc thực hiện cập nhập */}
                    <Grid container spacing={5}>
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                // color="primary"
                                className={classes.submit}
                                onClick={handleBack}
                            >
                                Quay về
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            {createView ? (
                                <Button
                                    onClick={() => createNew()}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Tạo mới
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => updateInfo()}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Cập nhật
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbar open={alertUp} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={error ? "warning" : "success"}>{alertText}</Alert>
            </Snackbar>
        </Container >
    );
}