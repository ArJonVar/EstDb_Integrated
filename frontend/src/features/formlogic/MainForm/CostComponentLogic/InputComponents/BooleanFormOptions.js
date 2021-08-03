import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

const BooleanFormOptions = ({options}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const costComponentObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[6]])
    
    return (
        <div className="Boolean Logic">
            {typeObj[options] === 'Boolean' && 
         <div>
             <input
             type="radio"
             id= {` ${costComponentObj[options]}: True`}
             name={`${costComponentObj[options]}`}
             value="True"
            //  onBlur={(e) => 
            //      costComponentInformationArr.push(`${rowIDObj[options]}: ${(e.target.value)},  `)
            //  }
             ></input>
             <label for="True"> True </label> <br></br>
             <input
             type="radio"
             id= {`${costComponentObj[options]}: False`}
             name={`${costComponentObj[options]}`}
             value="False"
            //  onBlur={(e) => 
            //      costComponentInformationArr.push(`${rowIDObj[options]}: ${(e.target.value)},  `)
            //  }
             ></input>
             <label for="False"> False </label> <br></br>
             <br></br><br></br>
         </div>}
        </div>
      );
}
 
export default BooleanFormOptions;
