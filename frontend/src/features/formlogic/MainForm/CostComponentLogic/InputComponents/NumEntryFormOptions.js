import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';

const NumEntryFormOptions=({options}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const [num, setNum] = useState(0)

    return (
        <div className="num Entry situation">
            {typeObj[options] === "Number Entry" &&
                <div>
                    <br></br>
                    <button style={{height: "35px", width: "7%"}} onClick={() => setNum(num-1)}>-</button>
                    <label classname= "numEntryMiddle" htmlFor="+" style={{paddingTop: "2px", paddingRight:"20px", paddingLeft:"20px", border: "2px solid Black", padding: "1%"}}>{num}</label>
                    <button name="+" style={{height: "35px", width: "7%"}}  onClick={() => setNum(num+1)}>+</button>
                </div>}
        </div>

      );
}
 
export default NumEntryFormOptions;
