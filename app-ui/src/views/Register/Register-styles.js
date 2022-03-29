import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    margin: 'auto'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radio: {
    marginLeft:  theme.spacing(3),
    marginTop:  theme.spacing(2),
  },
  dateTime: {
    textAlign: 'center'
  }
}));
