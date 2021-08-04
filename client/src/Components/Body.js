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
      {/* // <ImageList cols={2.5}>
    //   {digiList.map((item) => (
    //     <ImageListItem
    //       key={item.name}
    //       style={{ width: "100%", height: "auto" }}
    //     >
    //       <img
    //         src={item.img}
    //         alt={item.name}
    //         style={{ width: "auto", height: "auto" }}
    //       />
    //       <ImageListItemBar title={item.name} />
    //     </ImageListItem>
    //   ))}
    // </ImageList> */}
      {/* {digiList.map((digimon, i) => (
        <img src={digimon.img} />
      ))} */}

      <Carousel
        NavButton={({ onClick, className, style, next, prev }) => {
          // Other logic

          return (
            <Button onClick={onClick}>
              {next && "Next"}
              {prev && "Previous"}
            </Button>
          );
        }}
      >
        <img src={digiList[0].img} />
      </Carousel>
      {/* //   {digiList.map((digimon) => {
    //     return (
    //       <Grid
    //         container
    //         direction="row"
    //         justifyContent="space-evenly"
    //         alignItems="flex-start"
    //         pacing={1}
    //       >
    //         <Typography variant="h3"> {digimon.name}</Typography>
    //         <img src={digimon.img} alt="digimon.name" />
    //         <Typography variant="h5"> {digimon.level}</Typography>
    //       </Grid>
    //     );
    //   })} */}
    </>
  );
};
