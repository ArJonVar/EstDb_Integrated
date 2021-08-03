import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

const FeetInchFormOptions=({options}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    
    return (
        <div className="Feet-Inch">
            {typeObj[options] === "Feet-Inch" &&
                <div>
                      <input 
                        type="number" 
                        min="0" 
                        step="1" 
                        placeholder="0"
                        id={`feet for ${options}`} 
                        name={`feet for ${options}`}
                        style={{width:"35px"}}></input>
                      <label htmlFor={`feet for ${options}`}>FT</label>
                      <input 
                        type="number" 
                        min="0" 
                        step=".01"  
                        id={`inches for ${options}`}
                        name={`inches for ${options}`}
                        placeholder="0.00"
                        style={{width:"45px"}}></input>
                      <label htmlFor={`inches for ${options}`}>INCHES</label>
                </div>}
        </div>

      );
}
 
export default FeetInchFormOptions;
