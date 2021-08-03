import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioComponent from './RadioComponent'

const RadioFormOptions = ({options, tabId, costComponentTitle}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const radioOptions = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[7]])
    const dispatch = useDispatch()

    const renderChoices= () => {
        if (typeObj[options] === "Radio") {
            const radioOptionsArr = radioOptions[options].split(",")
            return (radioOptionsArr.map((radioOptionsArr) => (
                <div>
                    <div 
                        id={`radio button for ${options}`} 
                        className={`${radioOptionsArr}`}>
                        <RadioComponent options={radioOptionsArr} tabId={tabId} costComponentTitle={costComponentTitle}/>
                    </div>
                </div>
            )))
        }
        
    }
    return (
        <div className="Radio Logic" onBlur={(e) => dispatch({ type: 'formMemory/costComponentConcat', payload: {tabId: tabId, title:(costComponentTitle), item: (e.target.value)}})}>
            {typeObj[options] === "Radio" &&
                <div className="radioOptions">
                    <p>{renderChoices()}</p>
                </div>}
        </div>
      );
}
 
export default RadioFormOptions;
