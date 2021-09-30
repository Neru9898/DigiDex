import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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
          <img src="https://image.pngaaa.com/80/1332080-middle.png" />
        </>
      ) : (
        <div className="mainWrapper">
          <div className="arrowBox" onClick={() => onArrowClick("left")}>
            LEFT
          </div>
          <img
            className="digimonImage"
            src={digiList[currentDigimon].img}
            alt="Digimon"
          />
          <div onClick={() => onArrowClick("right")}>right</div>
        </div>
      )}
    </>
  );
};
