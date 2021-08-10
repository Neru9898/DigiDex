import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { Button } from "@material-ui/core";
import { Grid, Typography, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Body = () => {
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon").then((res) => {
      setDigiList(res.data);
    });
  }, []);

  const [digiList, setDigiList] = useState([]);
  const [currentDigimon, setCurrentDigimon] = useState(0);

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ margin: "50px", position: "relative" }}
      >
        <Grid item xs style={{ position: "absolute", marginTop: "20%" }}>
          <Button>
            <ArrowBackIosRoundedIcon style={{ borderRadius: "50%" }} />
          </Button>
        </Grid>
        <Slide>
          <Grid item xs={6} style={{ position: "absolute", padding: "250px" }}>
            <img
              src={digiList[currentDigimon].img}
              alt="Digimon"
              style={{ height: "40vh", width: "40wh", borderRadius: "50%" }}
            />
          </Grid>
        </Slide>
        <Grid
          item
          xs
          style={{ position: "absolute", marginTop: "20%", marginLeft: "43%" }}
        >
          <ArrowForwardIosRoundedIcon />
        </Grid>
      </Grid>
    </>
  );
};
