import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';

const RadioComponent = ({options, tabId, costComponentTitle}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const costComponentObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[6]])
    // const dispatch = useDispatch()

    
    return (
        <div>
          <input
              type="radio"
              // onBlur={(fullValue) => { 
              //   dispatch({ type: 'formMemory/costComponentConcat', payload: {tabId: tabId, title:(costComponentTitle), item: (fullValue)}})
              // }}
              id= {costComponentTitle}
              name= {costComponentTitle}
              value= {options}></input>
              <label 
                  htmlFor={options}> {options} 
                  </label> <br></br>
        </div>
    );
}
 
export default RadioComponent;
