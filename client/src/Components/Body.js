import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Button } from "@material-ui/core";
import { Grid, Typography, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Body = () => {
  const [digiList, setDigiList] = useState([]);

  //need to sort out this as image dont render when refreshing
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon").then((res) => {
      setDigiList(res.data);
    });
  }, []);

  const [currentDigimon, setCurrentDigimon] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDir, setslideDir] = useState("down");
  const content = digiList[currentDigimon];
  const numImg = digiList.length;

  console.log(digiList);
  const onArrowClick = (dir) => {
    const increment = dir === "left" ? -1 : 1;
    const newIndex = (currentDigimon + increment + numImg) % numImg;
    setslideDir(dir);
    setSlideIn(false);

    setTimeout(() => {
      setCurrentDigimon(newIndex);
      setslideDir(dir === "left" ? "right" : "left");
      setSlideIn(true);
    }, 700);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ margin: "50px", position: "relative" }}
      >
        <Grid item xs>
          <ArrowBackIosIcon onClick={() => onArrowClick("left")} />
        </Grid>{" "}
        <Slide direction={slideDir} in={slideIn}>
          <Grid item xs={6}>
            <img
              src={digiList[currentDigimon].img}
              alt="Digimon"
              style={{ height: "40vh", width: "40wh", borderRadius: "40%" }}
            />
          </Grid>
        </Slide>
        <Grid item xs>
          <ArrowForwardIosIcon onClick={() => onArrowClick("right")} />
        </Grid>
      </Grid>
    </>
  );
};
