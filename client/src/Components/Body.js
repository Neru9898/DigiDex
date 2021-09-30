import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Body.css";

export const Body = () => {
  const [digiList, setDigiList] = useState([]);
  const [currentDigimon, setCurrentDigimon] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [slideDir, setSlideDir] = useState();
  const numImg = digiList.length;
  //need to sort out this as image dont render when refreshing
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon").then((res) => {
      setDigiList(res.data);
      setIsLoading(false);
    });
  }, []);

  console.log(digiList);

  const onArrowClick = (dir) => {
    const increment = dir === "left" ? -1 : 1;
    const newIndex = (currentDigimon + increment + numImg) % numImg;
    setSlideDir(dir);
    setSlideIn(false);

    setTimeout(() => {
      setCurrentDigimon(newIndex);
      setSlideDir(dir === "left" ? "right" : "left");
      setSlideIn(true);
    }, 100);
  };

  return (
    <>
      {isLoading ? (
        <>
          <img
            src="https://image.pngaaa.com/80/1332080-middle.png"
            alt="LOADING"
          />
        </>
      ) : (
        <div className="mainWrapper">
          <div className="arrowBox" onClick={() => onArrowClick("left")}>
            {"<"}
          </div>
          <div className="box">
            <img
              className="digimonImage"
              src={digiList[currentDigimon].img}
              alt="Digimon"
            />
            <h2> {digiList[currentDigimon].name}</h2>
            <h4> {digiList[currentDigimon].level}</h4>
          </div>
          <div className="arrowBox" onClick={() => onArrowClick("right")}>
            {">"}
          </div>
        </div>
      )}
    </>
  );
};
