import React, { useState, useEffect, useMemo } from 'react';
import {
    Typography,
    Container,
    Button,
    Grid,
    TextField,
    Box,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from "./Home-styles";
import { useHistory } from 'react-router';
import { FIELDS_STUDENT, UsersColumns, API2, endpoints2 } from '../../common';
import AppTable from '../../component/Table';
import { mean } from "lodash"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(stt, name, toan, ly, hoa, diemtb, userId) {
    return { stt, name, toan, ly, hoa, diemtb, userId };
}

// function avg

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [req, setReq] = useState('');

    const [viewCre, setViewCre] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [alertUp, setAlertUp] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function init() {
            await fetchUsers()
        }
        init()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        setTimeout(() => {
            API2.get(endpoints2["users-search"](req)).then(res => {
                setUserList(
                    res?.data.map((r, idx) =>
                        createData(idx + 1, r.name, r.toan, r.ly, r.hoa, parseFloat(dtb(r.toan, r.ly, r.hoa)).toFixed(2), r.id)
                    )
                );
                setLoading(false)
            })
        }, 500);
    }

    const dtb = (a, b, c) => {
        return eval(`(${a} +${b} + ${c})/3`)

    }

    const fetchUserById = async (id) => {
        API2.get(endpoints2["users-by-id"](id)).then(res => {
            setUserInfo(res?.data[0])
        })
    }

    const updateInfo = async () => {
        try {
            let res = await API2.patch(endpoints2["users-update"](userInfo?.id), userInfo);
            if (res?.status === 200) {
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
            let res = await API2.post(endpoints2["users"], userInfo);
            if (res?.status === 201) {
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
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    const handleChooseUser = useMemo(() => function (userId) {
        fetchUserById(userId)
        setTitle(`Thông tin người dùng ${userId}`)
        setViewCre("update")
    }, [])

    const handleCreate = () => {
        setViewCre("create")
        setTitle("Tạo mới người dùng")
    };

    const handleDel = async () => {
        try {
            let res = await API2.delete(endpoints2["users-del"](userInfo?.id));
            if (res?.status === 200) {
                setAlertText("Bạn đã xóa người dùng thành công")
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleChangeName = (e) => {
        setReq(e.target.value)
    };

    const handleSearch = () => {
        fetchUsers()
    };

    const handleCloseAlert = () => {
        setAlertUp(false);
        window.location.reload()
        if (error) {
            setError(false)
        }
    };

    const handleBack = () => {
        setUserInfo({})
        setViewCre(false)
        setTitle("")
    };

    return (
        <Container>
            <h1>home page</h1>
            <Box className={classes.boxForm}>
                <Typography variant="h3" className={classes.title}>{title}</Typography>

                {viewCre ? (
                    <form className={classes.form}>
                        <div>
                            {FIELDS_STUDENT.map((f) => {
                                return (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin='normal'
                                        key={f.id + ' register1'}
                                        id={f.id}
                                        name={f.id}
                                        label={f.label}
                                        value={userInfo[f.id]}
                                        type={f.type ? f.type : 'text'}
                                        onChange={accInfo}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )
                            })}
                        </div>

                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={handleBack}
                                >
                                    Quay về
                                </Button>
                            </Grid>

                            {viewCre === "create" ? (
                                <Grid item xs={8}>
                                    <Button
                                        onClick={() => createNew()}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Tạo mới
                                    </Button>
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xs={3}>
                                        <Button
                                            onClick={() => handleDel()}
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                        >
                                            Xóa
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={() => updateInfo()}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Cập nhật
                                        </Button>
                                    </Grid>
                                </>

                            )}

                        </Grid>
                    </form>
                ) : (
                    <></>
                )}
            </Box>

            <Grid container xs={12}>
                <Grid item xs={5}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Tên người dùng "
                        type="text"
                        id="name"
                        value={req?.name}
                        onChange={handleChangeName}
                        onKeyDown={handleKeyDown}
                    />
                </Grid>

                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.search}
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                    </Button>
                </Grid>

                <Grid item xs={5}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.btnCreate}
                        onClick={handleCreate}
                    >
                        Tạo mới
                    </Button>
                </Grid>
            </Grid>
            {loading ? <p>Loading ...</p> :
                <AppTable columns={UsersColumns} data={userList} handleChoose={handleChooseUser} />
            }
            <Snackbar open={alertUp} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={error ? "warning" : "success"}>{alertText}</Alert>
            </Snackbar>
        </Container>
    );
}