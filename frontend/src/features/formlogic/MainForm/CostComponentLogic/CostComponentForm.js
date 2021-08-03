import React from 'react';
import { useSelector} from 'react-redux'
import TextFormOptions from './InputComponents/TextFormOptions'
import BooleanFormOptions from './InputComponents/BooleanFormOptions'
import RadioFormOptions from './InputComponents/RadioFormOptions'
import TextAreaFormOptions from './InputComponents/TextAreaFormOptions'
import CheckBoxFormOptions from './InputComponents/CheckBoxFormOptions'
import DropdownFormOptions from './InputComponents/DropdownFormOptions'
import NumEntryFormOptions from './InputComponents/NumEntryFormOptions'
import DateSelectorFormOptions from './InputComponents/DateSelectorFormOptions'
import FeetInchFormOptions from './InputComponents/FeetInchFormOptions'

const CostComponentForm = ({tabId, options, masterObj}) => {

    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    


    //makes an object from the column that names component of input
    const costComponentObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[6]])
    
    
    return ( 
        <div className="Cost Components Main" key="4">   
            <br></br>
            <p>Cost Components:</p> 
            {options.map(options=> 
                        <div>
                            <label name={costComponentObj[options]}>
                                {costComponentObj[options]}: </label> 
                            
                            <TextFormOptions key="40" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <BooleanFormOptions key="41" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <RadioFormOptions key="42" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <TextAreaFormOptions key="43" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            {typeObj[options] === "Checkbox Array" && <CheckBoxFormOptions key="44" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>}
                            <DropdownFormOptions key="45" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <NumEntryFormOptions key="46" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <DateSelectorFormOptions key="47" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                            <FeetInchFormOptions key="48" options={options} tabId={tabId} costComponentTitle={costComponentObj[options]}/>
                        </div>)}
                            
        </div>



     );
}
 
export default CostComponentForm;
