import React from 'react';
import { useDispatch } from 'react-redux'

const DropdownComponent = ({options}) => {
    
  return (
    <option
      //   onBlur={(e) => 
      //       costComponentInformationArr.push(`${costComponentObj[options]}: ${(e.target.value)},  `)
      //   }
        value= {options}
        key= {options}> {options} 
    </option>
  );
}
 
export default DropdownComponent;
