import React, { useState, useEffect} from "react";

import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import TinderCard from "react-tinder-card";

const useStyles = makeStyles({
  card: {
    position: "relative",
    width: "600px",
    maxWidth: "75vw",
    height: "75vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    backgroundColor: "white"
  },
  image: {
    position: "relative",
    height: "50vh",
    borderRadius: "7px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "10vh"
  },
  swipe: {
    position: "absolute"
  },
  title: {
    position: "absolute",
    margin: 10,
    color: "orange"
  },
  text: {
    // position: "absolute",
    margin: 5,
    variant: "p3"
  }
});

const TinderCards = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([])
  let lastDirection = ""

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    lastDirection = direction
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
      fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          // content: {lastDirection === 'left' ? 'y' : 'n'
          }),
      })
  }

  useEffect(() => {
    fetch('/api').then(response => response.json()).then(data => setMovies(Array.from(data)))
  },[]);

  return (
    <div className={classes.container}>
      {movies.map((movie) => (
        <TinderCard
          className={classes.swipe}
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen(movie.title)}
          preventSwipe={["up", "down"]}
          key={movie}
          backgroundColor="white"
        >
          <div className={classes.card}>
            {/*<div*/}
            {/*  style={{ backgroundImage: `url(${movie.url})` }}*/}
            {/*  className={classes.image} >*/}
            {/*</div>*/}
            <Typography className={classes.text}>{movie.summary}</Typography>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default TinderCards;
