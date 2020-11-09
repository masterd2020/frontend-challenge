import React, { useState, useEffect } from 'react';


const SelectField = ({ data, currentShape, setCurrentShape }) => {
  
  const handleSelectOnChange = (e) => {
    setCurrentShape(e.target.value);
  };
  
  // Checking if we have the data string on our localStorage
  const storedData = JSON.parse(localStorage.getItem("data"));
  let storedNames;
  if(storedData) {
    storedNames = storedData;
  } else {
    storedNames = data;
  }
  
  
  return(
    <div>
      <h4>Select from the below shape</h4>
      <form>
        <select className="select" onChange={handleSelectOnChange} value={currentShape}>
          {
            storedNames.map((data) => {
              return <option key={data.name} value={data.name}>{data.name}</option>
            })
          }
        </select><br />
        {/*<button onClick={handleSubmit} type="submit" className="btn btn__active">Select</button> */}
      </form>
    </div>
  );
}

export default SelectField;