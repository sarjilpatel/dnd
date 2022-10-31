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
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211270/dnd/A_hdongs.png",
  },
  {
    _id: "b",
    character: "b",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/B_cgxh91.png",
  },
  {
    _id: "c",
    character: "c",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211270/dnd/C_przgq6.png",
  },
  {
    _id: "d",
    character: "d",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/D_tjfkut.png",
  },
  {
    _id: "e",
    character: "e",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/E_c0geqo.png",
  },
  {
    _id: "f",
    character: "f",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/F_uztzvp.png",
  },
  {
    _id: "g",
    character: "g",
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667211269/dnd/G_rzgjtb.png",
  },
];

const operatorsList = [
  {
    _id: "635f816b65280ed7141c33be",
    character: "+",
    value: "+",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f817465280ed7141c33c1",
    character: "-",
    value: "-",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f817b65280ed7141c33c4",
    character: "/",
    value: "/",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f818365280ed7141c33c7",
    character: "*",
    value: "*",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f818965280ed7141c33ca",
    character: "=",
    value: "=",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f818f65280ed7141c33cd",
    character: ">",
    value: ">",
    isOperator: true,
    __v: 0,
  },
  {
    _id: "635f819765280ed7141c33d0",
    character: "<",
    value: "<",
    isOperator: true,
    __v: 0,
  },
];

const DragDrop = () => {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const characterList = charactersList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, characterList[0]]);
  };

  return (
    <>
      <div className="characters">
        {charactersList.map((character) => {
          return <Element url={character.url} id={character.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((picture) => {
          return <Element url={picture.url} id={picture.id} />;
        })}
      </div>
    </>
  );
};

export default DragDrop;
