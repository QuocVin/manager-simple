import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
        textAlign: 'center'
    },
    search: {
        height: 55,
        width: 55,
    },
    btnCreate: {
        height: 55,
        width: 55,
        float: 'right'
    },
    boxForm: {
        textAlign: "-webkit-center",
        marginBottom: "35px"
    },
    form: {
        width: "550px",
        alignItems: "center"
    }
}));