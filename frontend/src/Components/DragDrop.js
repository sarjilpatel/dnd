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
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/-_qu6qvd.png",
  },
  {
    _id: "635f817b65280ed7141c33c4",
    character: "/",
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/div_n616d2.png",
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
    isCmp: true,
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/eq_mnbitx.png",
  },
  {
    _id: "635f818f65280ed7141c33cd",
    character: ">",
    isCmp: true,
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/gt_rpmymh.png",
  },
  {
    _id: "635f819765280ed7141c33d0",
    character: "<",
    isCmp: true,
    isOperator: true,
    url: "https://res.cloudinary.com/djnkkdrhb/image/upload/v1667217317/dnd/lt_ytcgsu.png",
  },
];

const DragDrop = () => {
  const [board, setBoard] = useState([]);
  var dataStr = "";
  var flag = false;
  var cmp = false;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    if (id.isOperator === flag) {
      if (id.isCmp) {
        if (!cmp) {
          flag = !flag;
          setBoard((board) => [...board, id]);
        }
        cmp = true;
      } else {
        flag = !flag;
        setBoard((board) => [...board, id]);
      }
    } else {
      console.log(board);
    }
  };

  const handleEvaluateClick = async () => {
    if (board[board.length - 1]?.isOperator) {
      alert("enter valid expression");
      return;
    }

    board.map((picture) => {
      dataStr += picture.character;
    });
    console.log(dataStr);

    await axios.post("/api/v1/calculate", { str: dataStr }).then((res) => {
      console.log(res.data.ans);
      alert(res.data.ans);
    });

    dataStr = "";
  };

  const handleRHSIntClick = async () => {
    if (
      !board[board.length - 1]?.isOperator ||
      board[board.length - 1]?.isInteger
    ) {
      alert("This will only work if comparison operator is at last");
      return;
    }
    var number = prompt("Enter Number: ");
    const item = {
      character: number,
      _id: number,
      isInteger: true,
    };
    setBoard((board) => [...board, item]);
  };

  const handleDeleteElement = (picture) => {
    if (picture.isCmp) {
      cmp = false;
    }
    const newArr = board.filter((e) => e._id !== picture._id);
    setBoard(newArr);
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

      <div className="board__wrapper">
        <div className="Board" ref={drop}>
          {board.map((picture) => {
            return picture.url ? (
              <div className="board__element">
                <Element url={picture.url} id={picture} />
                <span onClick={() => handleDeleteElement(picture)}>X</span>
              </div>
            ) : (
              <div className="board__element">
                <div className="number">{picture.character}</div>
                <span onClick={() => handleDeleteElement(picture)}>X</span>
              </div>
            );
          })}
        </div>
        <button onClick={handleRHSIntClick}>RHS INTEGER</button>
      </div>

      <div className="Button">
        <button onClick={handleEvaluateClick}>Evaluate</button>
      </div>
    </div>
  );
};

export default DragDrop;
