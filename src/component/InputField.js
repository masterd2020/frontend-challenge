import React, { useState, useEffect } from 'react';

const InputField = ({ showShape, setShowShape, shapeType, setShapeType, setCircularValue, setNonCircularValue, setCurrentShape, circularValue, nonCircularValue }) => {
  
  const handleShapeType = (e) => {
    setShapeType(e.target.value);
  };
  
  const handleCircularChange = (e) => {
    setCircularValue(e.target.value);
  };
  
  const handleNonCircularChange = (e) => {
    const {name, value} = e.target;
    setNonCircularValue({...nonCircularValue, [name]: value});
  };
  
  const callCircularValue = () => {
    // Creating new circular shape
    const newCircularShape = { name: `shape ${circularValue} radii`, r: circularValue, cx: "50%", cy: "50%" }
      
    // Checking for the Non existence of the same name
    let res;
    const d = JSON.parse(localStorage.getItem("data"));
      
    JSON.parse(localStorage.getItem("data")) ? (
      res = d.map((shape) => {
        return shape.name !== newCircularShape.name
      })
    ) : (
      res = showShape.map((shape) => {
        console.log("map", shape.name);
        return shape.name !== newCircularShape.name
      })
    )
   
    if(!res.includes(false)) {
      setCurrentShape(newCircularShape.name)
      setShowShape([...showShape, newCircularShape]);

      // Saving to localStorage
      if(localStorage.getItem("data")) {
        // Get the old data from the localStorage
        const oldData = JSON.parse(localStorage.getItem("data"))
        
        // Merging the old and the newly created shape together
        const newData = [...oldData, newCircularShape];
        
        // Saving a new item to the localStorage
        localStorage.setItem("data", JSON.stringify(newData))
        
        // Logging
        //console.log("olddata", oldData);
        //console.log("new data", newData);
      } else {
        // if there is no data in the localStorage we initialize it to the data array in our state
        localStorage.setItem("data", JSON.stringify([...showShape, newCircularShape]));
        
        // Logging
        //console.log("localStorage", JSON.parse(localStorage.getItem("data")));
        //console.log("first item");
      }
      
    } else {
      // alerting if there exist two shape with the same name
      console.log("A shape with that radii already exists")
      alert("A shape with that radii already exists")
    }
    
    // Clearing input field
      setCircularValue("");
    
    // Logging circularValue
    console.log(`Circular ${circularValue}`);
  }
  
  
  const callNonCircularValue = () => {
    // Destructure WIDTH & HEIGHT
      const { width, height } = nonCircularValue;
      
      // Creating New Non Circular Shape
      const newNonCircularShape = { name: `shape ${width} x ${height}`, width, height, x: "20%", y: "20%"  }
      
      // Checking for Non Existence of the same name
      let res;
      const d = JSON.parse(localStorage.getItem("data"));
      
      JSON.parse(localStorage.getItem("data")) ? (
        res = d.map((shape) => {
          return shape.name !== newNonCircularShape.name
        })
      ) : (
        res = showShape.map((shape) => {
          return shape.nam !== newNonCircularShape.name
        })
      )

      if(!res.includes(false)) {
        setCurrentShape(newNonCircularShape.name)
        
        setShowShape([...showShape, newNonCircularShape]);
     
        // Saving to localStorage
        if(localStorage.getItem("data")) {
          // Get the old data from the localStorage
          const oldData = JSON.parse(localStorage.getItem("data"))
          
          // Merging the old and the newly created shape together
          const newData = [...oldData, newNonCircularShape];
          
          // Saving a new item to the localStorage
          localStorage.setItem("data", JSON.stringify(newData))
          
          // Logging
          //console.log("olddata Non", oldData);
          //console.log("new data Non", newData);
        } else {
          localStorage.setItem("data", JSON.stringify([...showShape, newNonCircularShape]));
        }
      } else {
        // alerting if there exist two shape with the same name
        console.log("The shape with that value already exists")
        alert("The shape with that value already exists")
      }
      
      // Clearing the input field
      setNonCircularValue({ width: '', height: '' })
      
      // logging nonCircularValue
      //console.log(`Non Circular ${JSON.stringify(nonCircularValue)}`);
  }
  
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if(circularValue) {
      callCircularValue();
    }
    
    if(nonCircularValue.width && nonCircularValue.height) {
      callNonCircularValue();
    }
  };
  
  
  return(
    <div>
      <h4>Create new shape</h4>
      <form onSubmit={handleInputSubmit}>
        <div>
          <label htmlFor="select__type">Choose type of shape below</label><br />
          <select id="select__type" className="select" onChange={handleShapeType} value={shapeType}>
            <option value="non-circular-shape">Non Circular Shape</option>
            <option value="circular-shape">Circular Shape</option>
          </select><b />
        </div>
        <div className="select__content">
          {shapeType === "non-circular-shape" ? <NonCircularShape handleNonCircularChange={handleNonCircularChange} /> : <CircularShape handleCircular={handleCircularChange} />}
        </div>
      </form>
    </div>
  );
}

const CircularShape = ({ handleCircular }) => {
  return(
    <>
      <input onChange={(e) => handleCircular(e)} className="length__input" type="number" placeholder="radii" /><br />
      <button type="submit" className="btn btn__active">Add</button>
    </>
  );
}

const NonCircularShape = ({handleNonCircularChange}) => {
  return(
    <>
      <input className="length__input" type="number" name="width" placeholder="First length" onChange={(e) => handleNonCircularChange(e)} /><br />
      <input className="length__input" type="number" name="height" placeholder="Second length" onChange={(e) => handleNonCircularChange(e)} /><br />
      <button type="submit" className="btn btn__active">Add</button>
    </>
  );
}

export default InputField;