import React, { useState, useEffect, useMemo } from 'react';
import {
    Typography,
    Container,
    Button,
    Grid,
    TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from "./UserManager-styles";
import { useHistory } from 'react-router';
import { endpoints, API, ROLE, UsersColumns } from '../../common';
import AppTable from '../../component/Table';
import moment from 'moment';
import { RoutesApp } from '../../routes/route'

function createData(stt, name, username, date_ob, gen, role_name, created_date, userId) {
    return { stt, name, username, date_ob, gen, role_name, created_date, userId };
}

export default function UserManager() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [req, setReq] = useState({
        name: ''
    });

    useEffect(() => {
        async function init() {
            await fetchUsers()
        }
        init()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        setTimeout(() => {
            API.post(endpoints["user-search"], req).then(res => {
                setUserList(
                    res?.data?.data?.data.map((r, idx) =>
                        createData(idx + 1, r.name, r.username, moment(r.date_ob).format("DD-MM-YYYY").toString()
                            , r.gen, r.role_name, moment(r.created_date).format("DD-MM-YYYY").toString(), r.id)
                    )
                );
                setLoading(false)
            })
        }, 500);
    }

    const handleChooseUser = useMemo(() => function (userId) {
        history.push(RoutesApp.UserProfile.path.replace(":id", userId), {
            userId: userId,
        })
    }, [])

    const handleCreate = () => {
        history.push(RoutesApp.NewUser.path, {
            create: true
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleChangeName = (e) => {
        setReq({
            name: e.target.value
        })
    };

    const handleSearch = () => {
        fetchUsers()
    };

    return (
        <Container>
            <Typography variant="h3" className={classes.title}>Quản lý người dùng</Typography>

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
        </Container>
    );
}