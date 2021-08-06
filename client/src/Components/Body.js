import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Button } from "@material-ui/core";
import {
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
} from "@material-ui/core";
export const Body = () => {
  const [digiList, setDigiList] = useState([]);
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon").then((res) => {
      setDigiList(res.data);
    });
  }, []);
  return (
    <>
      {digiList.map((digimon) => {
        return (
          <Grid container direction="row" justifyContent="center">
            <Typography variant="h5">{digimon.name}</Typography>
            <img src={digimon.img} alt="digimon.name" />
          </Grid>
        );
      })}
    </>
  );
};
