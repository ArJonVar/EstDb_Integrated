import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import DropdownComponent from './DropdownComponent'

const DropdownFormOptions = ({options}) => {
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    const radioOptions = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[7]])

    const renderChoices= () => {
        if (typeObj[options] === "Dropdown") {
            const radioOptionsArr = radioOptions[options].split(",")
            return (radioOptionsArr.map((radioOptionsArr) => (
                <DropdownComponent options={radioOptionsArr} />
            )))
        }
        
    }
    return (
        <div className="Dropdown Logic">
            {typeObj[options] === "Dropdown" &&
                <div className="DropdownOptions"> 
                    <select 
                        name={options} 
                        id={`dropdown for ${options}`} 
                        className={`dropdown for ${options}`}>
                            <option 
                                value = 'no option selected'
                                key = "defaultDropDown"
                                > Select the dropdown
                            </option>
                            {renderChoices()}
                    </select>
                </div>}
        </div>
      );
}
 
export default DropdownFormOptions;
