import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Link,
    Grid,
    Typography,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    RadioGroup,
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
import { useStyles } from './Register-styles';
import { useHistory } from 'react-router';
import { FIELDS_REGISTER, endpoints, API, ROLE } from '../../common';
import { RoutesApp } from '../../routes/route'
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function parse2Str(date = new Date(), format = "YYYY-MM-DD HH:mm:ss.SSS") {
    return moment(date).utcOffset("+07:00").format(format);
};

export default function Register() {
    const classes = useStyles();
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleCloseDialog = () => {
        setOpen(false);
        const _path = RoutesApp.Login.path;
        history.push(_path);
    };

    const [acc, setAcc] = useState({
        gen: 'M',
        date_ob: parse2Str(new Date()),
        role_name: ROLE.REGISTER
    });

    const accInfo = (event) => {
        if (event.toString().includes("GMT+")) {
            setAcc({
                ...acc,
                date_ob: parse2Str(event)
            })
        } else {
            event.persist();
            setAcc({
                ...acc,
                [event.target.name]: event.target.value
            })
        }
    }

    const register = async () => {
        try {
            let res = await API.post(endpoints["register"], acc);
            if (res?.data?.code === 'Success') {
                setOpen(true);
            } else {
                setErrorText(res?.data?.error)
                setErrorAlert(true)
            }
        } catch (err) {
            setErrorText("Hệ thống bị lỗi")
            setErrorAlert(true)
        }
    };

    const onSubmit = async () => {
        register();
    }

    const handleCloseAlert = () => {
        setErrorAlert(false);
    };

    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper} >
                    <Typography variant="h3">Đăng ký</Typography>
                    <form className={classes.form}>
                        <div>
                            {FIELDS_REGISTER.map((f) => {
                                return (
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        margin='normal'
                                        key={f.id + ' register'}
                                        id={f.id}
                                        name={f.id}
                                        label={f.label}
                                        type={f.type ? f.type : 'text'}
                                        onChange={accInfo}
                                    />
                                )
                            })}
                        </div>

                        <>
                            <FormControl component="fieldset" className={classes.radio}>
                                <FormLabel component="legend">Giới tính</FormLabel>
                                <RadioGroup row aria-label="gen" name="gen" value={acc.gen} onChange={accInfo}>
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
                                        value={acc.date_ob}
                                        onChange={accInfo}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </>

                        <Button
                            onClick={onSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Đăng ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Login" variant="body2">
                                    Đã có tài khoản? Đăng nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Bạn đã đăng ký thành công</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vui lòng đăng nhập để tiếp tục dịch vụ
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Đăng nhập
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">{errorText}</Alert>
            </Snackbar>
        </div>
    );
}
