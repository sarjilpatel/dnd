import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import "../App.css";
import Element from "./Element";
import axios from "axios";
import "./dragdrop.css";

const charactersList = [
  {
    _id: "a",
    character: "a",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211270/dnd/A_hdongs.png",
  },
  {
    _id: "b",
    character: "b",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/B_cgxh91.png",
  },
  {
    _id: "c",
    character: "c",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211270/dnd/C_przgq6.png",
  },
  {
    _id: "d",
    character: "d",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/D_tjfkut.png",
  },
  {
    _id: "e",
    character: "e",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/E_c0geqo.png",
  },
  {
    _id: "f",
    character: "f",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/F_uztzvp.png",
  },
  {
    _id: "g",
    character: "g",
    isOperator: false,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/G_rzgjtb.png",
  },
  {
    _id: "plus",
    character: "+",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/qukjcv55vw4ynj13e7sh.png",
  },
  {
    _id: "minus",
    character: "-",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/div_n616d2.png",
  },
  {
    _id: "635f817b65280ed7141c33c4",
    character: "/",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/qukjcv55vw4ynj13e7sh.png",
  },
  {
    _id: "635f818365280ed7141c33c7",
    character: "*",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/multiply_fwxom2.png",
  },
  {
    _id: "635f818965280ed7141c33ca",
    character: "=",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/eq_mnbitx.png",
  },
  {
    _id: "635f818f65280ed7141c33cd",
    character: ">",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/gt_rpmymh.png",
  },
  {
    _id: "635f819765280ed7141c33d0",
    character: "<",

    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/lt_ytcgsu.png",
  },
];

const DragDrop = () => {
  const [board, setBoard] = useState([]);
  const [charFlag, setCharFlag] = useState(true);
  const [oprFlag, setOprFlag] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    // const characterList = charactersList.filter(
    //   (picture) => id === picture._id
    // );
    const flag = oprFlag;

    if (id.isOperator === oprFlag) {
      setOprFlag(!flag);
      setBoard((board) => [...board, id]);
      console.log(id.isOperator);
      console.log(oprFlag);
      console.log(board);
    } else {
      console.log(board);
    }
  };

  return (
    <div className="wrapper">
      <div className="characters">
        {charactersList.map((character) => {
          if (!character.isOperator) {
            return <Element url={character.url} id={character} />;
          }
        })}
      </div>

      <div className="characters">
        {charactersList.map((character) => {
          if (character.isOperator) {
            return <Element url={character.url} id={character} />;
          }
        })}
      </div>

      <div className="Board" ref={drop}>
        {board.map((picture) => {
          return <Element url={picture.url} id={picture} />;
        })}
      </div>
    </div>
  );
};

export default DragDrop;
