import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  buttonStyles: {
    backgroundColor: "#ECFEFF",
    color: "#3B82F6",
    border: "1px solid #3B82F6",
    width: "10px",
    minWidth: "30px",
    minHeight: "30px",
    "&:hover": {
      backgroundColor: "#DBEAFE",
    },
  },
  buttonActive: {
    backgroundColor: "#F9A8D4",
    border: "1px solid #F9A8D4",
    color: "#3B82F6",
    width: "10px",
    minWidth: "30px",
    minHeight: "30px",
    transform: "translateY(-5px)",
    '&:hover': {
      backgroundColor: '#F472B6',
      border: '1px solid #AFAFAF',
    },
  }
});
