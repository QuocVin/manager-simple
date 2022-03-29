import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
} from '@material-ui/core';
import { useStyles } from "./Dashboard-styles";
import { Bar } from 'react-chartjs-2';
import { API, endpoints } from '../../common/api';

const ROLE = [
    'admin', 'manager', 'register',
]

export default function Dashboard() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [chartRole, setChartRole] = useState([]);

    useEffect(() => {
        async function init() {
            setLoading(true)
            await fetchChart()
        }
        init()
    }, [])

    const fetchChart = async () => {
        setLoading(true);
        setTimeout(() => {
            API.get(endpoints["user-chart"]).then(res => {
                setChartRole(res?.data?.data?.data)
            })
            setLoading(false);
        }, 500);
    }

    const chartData = {
        labels: ROLE,
        datasets: [
            {
                label: 'Thống kê số lượng User Role',
                data: chartRole,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }
        ]
    }

    const abc = () => {
        console.info(chartRole)
    }

    return (
        <Container maxWidth='md'>
            <Typography className={classes.title} variant="h4" onClick={abc}>Báo cáo thống kê</Typography>

                {loading ? <p>loading. . .</p> : (
                    <Bar
                        data={chartData}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            },
                        }} />
                )}

        </Container>
    );
}