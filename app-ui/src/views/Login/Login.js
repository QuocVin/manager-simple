import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import cookies from 'react-cookies';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from "./Login-styles";
import { setAuthLS, LS_KEY } from "../../helpers/localStorage";
import { FIELDS_LOGIN, endpoints, API } from '../../common'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLogged, setLogged] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [acc, setAcc] = useState({});

    const accInfo = (event) => {
        event.persist();
        setAcc({
            ...acc,
            [event.target.name]: event.target.value
        })
    }

    const signInSucess = (role) => {
        setAuthLS(LS_KEY.R0LE, role);
    }

    const login = async () => {
        try {
            const res = await API.post(endpoints['login'], acc)
            if (res?.data?.code === 'Success') {
                let user = res?.data?.data?.profile

                cookies.save("access_token", res?.data?.data?.auth?.access_token)

                cookies.save("user", user);
                signInSucess(user?.role_name);
                dispatch({
                    "type": "login",
                    "payload": user
                })
                setLogged(true);
                window.location.reload();

            } else {
                setErrorText(res?.data?.error)
                setErrorAlert(true)
            }
        } catch (err) {
            setErrorText("Hệ thống bị lỗi")
            setErrorAlert(true)
        }
    }

    const onSubmit = async () => {
        login();
    }

    // xử lý tắt thông báo
    const handleCloseAlert = () => {
        setErrorAlert(false);
    };

    if (isLogged)
        return <Redirect to="/" />
    else
        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <form className={classes.form}>
                        {FIELDS_LOGIN.map((f) => {
                            return (
                                <TextField
                                    key={f.id + 'login'}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    margin='normal'
                                    id={f.id}
                                    name={f.id}
                                    label={f.label}
                                    type={f.type ? f.type : 'text'}
                                    onChange={accInfo} />
                            )
                        })}

                        <Button
                            fullWidth
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Đăng nhâp
                        </Button>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link href="/Register" variant="body2">
                                    {"Bạn chưa có tài khoản? Đăng ký"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                {/* xử lý thông báo khi đăng nhâp thất bại */}
                <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning">{errorText}</Alert>
                </Snackbar>
            </Container>
        );
}