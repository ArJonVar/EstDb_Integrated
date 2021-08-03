import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

const TextFormOptions = ({options, tabId, costComponentTitle}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const costComponentObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[6]])
    const unitObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[8]])
    const dispatch = useDispatch()

    return (
        <div className={`text option for Id: ?, Data Row Id: ${options}`}>
            {typeObj[options] === 'Text Box' &&
            <div>
                <input
                type={typeObj[options]}
                id= {costComponentObj[options]}
                name={costComponentObj[options]}
                onBlur={(e) => { 
                        dispatch({ type: 'formMemory/costComponentConcat', payload: {tabId: tabId, title:(costComponentTitle), item: (e.target.value)}})
                }}
                ></input><label>{unitObj[options]}</label>
                <br></br><br></br>
            </div>}
        </div>
      );
}
 
export default TextFormOptions;
