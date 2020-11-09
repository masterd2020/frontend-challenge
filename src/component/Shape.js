import React, { useState, useEffect, useRef } from 'react';

import SelectField from './SelectField';
import InputField from './InputField';


const data = [
  { name: "circle", r: 100, cx: "50%", cy: "50%", color: "black" },
  { name: "rectangle", width: 80, height: 40, x: "20%", y: "20%", color: "green" },
  { name: "square", width: 80, height: 80, x: "20%", y: "15%", color: "blue" }
];

const Shape = () => {
  const [showSelectField, setShowSelectField] = useState(true);
  const [showInputField, setShowInputField] = useState(false);
  const [showShape, setShowShape] = useState(data);
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [activeColor, setActiveColor] = useState("");
  
  
  const [currentShape, setCurrentShape] = useState('circle');

  const [shapeType, setShapeType] = useState('non-circular-shape');
  const [circularValue, setCircularValue] = useState('');
  const [nonCircularValue, setNonCircularValue] = useState({ width: '', height: '' });
  
  const testRef = useRef(null);
  

  const handleSelectField = () => {
    setShowSelectField(true);
    setShowInputField(false);
  };
  
  const handleInputField = () => {
    setShowSelectField(false);
    setShowInputField(true);
  };
  
  const changeIsChangeColor = (e) => {
    setIsChangeColor(!isChangeColor);
    console.log(e.target);
  };
  
  const storedData = JSON.parse(localStorage.getItem("data"));
  let storedNames;
  if(storedData) {
    storedNames = storedData;
  } else {
    storedNames = showShape;
  }
 
  const handleParagraphClick = (e, name) => {
    const cb = (color) => {
      //e.target.classList.add("change__color__active");
      
      //console.log(testRef.current);
      const a = storedNames.map((el) => {
        if(el.name === name) {
          // Update the color property
          el.color = color;
        }
        return el;
      });
      
      // Set the shape
      setShowShape(a);
      
      // Updating the localStorage with the new data with the updated color property
      localStorage.setItem("data", JSON.stringify(a));
    };
    
    if(e.target.textContent === "r") {
      cb("red");
    };
    
    if(e.target.textContent === "g") {
      cb("green");
    };
    
    if(e.target.textContent === "b") {
      cb("blue");
    };
    
    if(e.target.textContent === "y") {
      cb("yellow");
    };
    
    if(e.target.textContent === "d") {
      cb("black");
    };
  };
  
  let name;
 
  return(
    <>
      <h1>Basic Shape</h1>
      <div className="shape__container">
        {
          
          storedNames.map((shape) => {
            if(shape.name === currentShape) {
              if(shape.width && shape.height) {
                name = shape.name;
                
                return <svg key={shape.name} className="svg__basic__shape">
                  <rect width={shape.width} height={shape.height} x={shape.x} y={shape.y} fill={shape.color} />
                </svg>
              }
              
              if(shape.r) {
                name = shape.name;
                
                return <svg key={shape.name} className="svg__basic__shape">
                  <circle r={shape.r} cx={shape.cx} cy={shape.cy} fill={shape.color} />
                </svg>
              }
            }
          })
        }
        <p onClick={changeIsChangeColor} className="change__color__container">
            COLOR
          </p>
          {
            (isChangeColor ? (
            <div onClick={(e) => handleParagraphClick(e, name)} className="change__color__content">
              <p>r</p>
              <p>g</p>
              <p>b</p>
              <p>y</p>
              <p>d</p>
          </div>
            ) : '')
          }
      </div>
      <div className="shape__tab">
        <button onClick={handleSelectField} className={showSelectField ? "btn btn__active" : "btn"}>Shape Selection</button>
        <button onClick={handleInputField} className={showInputField ? "btn btn__active" : "btn"}>Create New Shape</button>
      </div>
      <div className="shape__content">
        { showSelectField ? <SelectField  data={showShape} currentShape={currentShape} setCurrentShape={setCurrentShape}  /> : '' }
        { showInputField ? <InputField showShape={showShape} setShowShape={setShowShape} shapeType={shapeType} setShapeType={setShapeType} setCircularValue={setCircularValue} setNonCircularValue={setNonCircularValue} setCurrentShape={setCurrentShape} circularValue={circularValue} nonCircularValue={nonCircularValue}  /> : '' }
      </div>
    </>
  );
}

export default Shape;