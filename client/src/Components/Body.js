import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Button } from "@material-ui/core";
import { Grid, Typography, Slide } from "@material-ui/core";
import "./Body.css";

export const Body = () => {
  const [digiList, setDigiList] = useState([]);

  //need to sort out this as image dont render when refreshing
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon").then((res) => {
      setDigiList(res.data);
      setIsLoading(false);
    });
  }, []);

  console.log(digiList);
  const [currentDigimon, setCurrentDigimon] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [slideDir, setslideDir] = useState("down");
  const content = digiList[currentDigimon];
  const numImg = digiList.length;

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
      {isLoading ? (
        <>
          <Typography variant="h2">Loading</Typography>
          <img src="https://image.pngaaa.com/80/1332080-middle.png" />
        </>
      ) : (
        <>
          <ArrowBackIosIcon onClick={() => onArrowClick("left")} />

          <Slide direction={slideDir} in={slideIn}>
            <img
              src={digiList[currentDigimon].img}
              alt="Digimon"
              style={{ height: "40vh", width: "40wh", borderRadius: "40%" }}
            />
          </Slide>
          <ArrowForwardIosIcon onClick={() => onArrowClick("right")} />

          <Typography className="NameText" variant="h2">
            {digiList[currentDigimon].name}
          </Typography>
        </>
      )}
    </>
  );
};
