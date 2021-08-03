import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const CheckBoxFormOptions = ({options, tabId, costComponentTitle}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const radioOptions = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[7]])
    const dispatch = useDispatch()
    
    // an array of checkbox options
    const radioOptionsArr = radioOptions[options].split(",")
    // a boolean array of falses, one for each checkbox
    const [checkedState, setCheckedState] = useState(
        new Array(radioOptionsArr.length).fill(false)
      );
    // filters the array of checkboxes based on the boolean array
    const results = radioOptionsArr.filter((d, ind) => checkedState[ind])
    // each change switches the appropriate item on boolean array
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position) {
              return !item;
            } else {
              return item;
            }
        });
        // updates boolean array with switches
      setCheckedState(updatedCheckedState);
    };

    const renderChoices= () => {
            const radioOptionsArr = radioOptions[options].split(",")
            return (radioOptionsArr.map((radioOptionsArr, index) => (
                <div>
                    <div 
                        id={`Checkbox for ${options}`} 
                        className={`${radioOptionsArr}`}>
                        <div>
                            <input
                                type="checkbox"
                                id= {`Checkbox-${index}`}
                                name= {radioOptionsArr}
                                value= {radioOptionsArr}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                                ></input>
                                <label 
                                    htmlFor={radioOptionsArr}> {radioOptionsArr} 
                                    </label> <br></br>
                            </div>
                    </div>
                </div>
            )))
        
    }

    return (
        <div 
            className="checkBoxLogic" 
            onBlur={() => dispatch({ type: 'formMemory/costComponentConcat', payload: {tabId: tabId, title:(costComponentTitle), item: (results)}})}
        >
                <div className="Checkbox Options">
                    <p> {renderChoices()} </p>
                </div>
        </div>
      );
}
 
export default CheckBoxFormOptions;
