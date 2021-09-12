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
  const [movies, setMovie] = useState([
    {
      "summary": "Welcome to Tinder for Movies, swipe right or left to get started!"
    }

  ]);
  let lastDirection = ""

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    lastDirection = direction
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
      fetch('/api/create', {
        method: 'POST',
        body: lastDirection
      }).then(response => {
        return response.json()
      }).then(message => {
        console.log(message)
        getLatestSummary()
      })
  }

  const getLatestSummary = () => {
    fetch('/api').then(response => {
      if(response.ok) {
        // console.log(response.json())
        return response.json()
      }
    }).then(data => {
      console.log(data)
      setMovie(data.data)
    })
  }

  useEffect(() => {
    fetch('/api').then(response => {
      if(response.ok) {
        // console.log(response.json())
        return response.json()
      }
    }).then(data => {
      console.log(data)
      setMovie(data.data)
    })
  },[]);

    console.log(movies)
    return (
      <div className={classes.container}>
        {movies.map((movie) => (
        <TinderCard
            className={classes.swipe}
            preventSwipe={["up", "down"]}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen("Card")}
            backgroundColor="white"
          >
            <div className={classes.card}>
              <div
                style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1569428034239-f9565e32e224?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1516&q=80'})` }}
                className={classes.image} >
              </div>
              <Typography className={classes.text}>{movie.summary}</Typography>
            </div>
          </TinderCard>
            ))}
      </div>
    );
};

export default TinderCards;