import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    title: {
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    radio: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    dateTime: {
        textAlign: 'center'
    }
}));