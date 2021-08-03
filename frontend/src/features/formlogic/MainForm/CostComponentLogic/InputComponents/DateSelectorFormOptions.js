import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

const DateSelectorFormOptions=({options, tabId}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const dispatch = useDispatch()
    
    // keeps the date current
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    
    today = `${yyyy}-${mm}-${dd}`

    return (
        <div className="Date Selector">
            {typeObj[options] === "Date Selector" &&
                <div>
                    <input
                        type="date"
                        id={`date Selector for ${options}`}
                        name={`date Selector for ${options}`}
                        onClick={(e) => dispatch({ type: 'formMemory/costComponentConcat', payload: {tabId: tabId, title:options, item: (e.target.value)}})}
                        min="2020-06-00"
                        max="2035-06-00"
                        ></input>
                </div>}
        </div>

      );
}
 
export default DateSelectorFormOptions;
