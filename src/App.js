import { useSprings, animated } from "react-spring";
import { CardContent } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";

import TinderCards from "./TinderCards.js";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  header_icon: {
    padding: "20px",
    fill: "orange",
    fontSize: "large"
  },
  mainBackground: {
    height: "97.3vh",
    background: "linear-gradient(40deg, #6DD5FA 10%, #FFFFFF 90%)",

    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainBackground}>
      {/* <div className={classes.header}>
        <PersonIcon className={classes.header_icon} />
        <MessageIcon className={classes.header_icon} />
        <InfoIcon className={classes.header_icon} />
      </div> */}
      <div>
        <TinderCards />
      </div>
    </div>
  );
};

export default App;