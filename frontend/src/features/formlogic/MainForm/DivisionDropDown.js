import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CostCodeDropDown from './CostCodeDropDown'

const DivisionDropDown = ({ options, tabId }) => {
    const dispatch = useDispatch()

    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const formMemory = useSelector((state) => state.formMemory.mainData)
    
    // costCodeComponent!!

    //gets array of division choices for each tab (but just holds choice, not tab number)
    let divisionChoice = formMemory.map(({ divisionChoice }) => divisionChoice)
    //makes an object of column that names type of input
    const typeObj = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[5]])
    //makes object out of column of cost codes
    const costCodeObj = noCodeJson[0][Object.keys(noCodeJson[0])[2]]
    //returns array of keys (row#) from an object and specific (repeating) value within object
    const getKey = (obj, val) => Object.keys(obj).filter(key=>obj[key]=== val);
    //makes array of all row # that say "header" within input type object
    const costCodeArr = (getKey(typeObj, "HEADER"))
    // returns object of division options
    const divisionObj = noCodeJson[0][Object.keys(noCodeJson[0])[1]]
    //makes a matrix of rows (keys) that fall along each tab's division choice
    const divChoiceMatrix = divisionChoice.map((divisionChoice) => (getKey(divisionObj, divisionChoice)))
    //makes a matrix of relevent row numbers that fit each each tab's choice of division
    let divHeaderIntersectionMatrix =  divChoiceMatrix.map((divChoiceMatrix) => costCodeArr.filter(x => divChoiceMatrix.includes(x)))
    //makes a matrix of relevent cost codes (based off row numbers) that fit each tab's choice of division
    const headerDropDown = divHeaderIntersectionMatrix.map((divHeaderIntersectionMatrix) => divHeaderIntersectionMatrix.map(divHeaderIntersectionMatrix => costCodeObj[divHeaderIntersectionMatrix]))

    //merge TabIds w/ headerDropDown options to apply .map and render to each tab
    const costCodeDropDownMerged =
        headerDropDown.map((headerDropDown, tabId) =>{
        return { tabId: tabId, costCodeOptions: headerDropDown}
        })

    // console.log('S0LUTION TO MY PROBLEMS', costCodeDropDownMerged[0], 'tabId', tabId,
    // 'test 1', costCodeDropDownMerged[0].tabId, 'test2', costCodeDropDownMerged[0].costCodeOptions )
    const costHeaderForm=
            <div>
                <div id={`costCode dropdown: ${costCodeDropDownMerged[tabId].tabId}`} className="costCodeDropDown">
                    <CostCodeDropDown key={costCodeDropDownMerged[tabId].tabId} tabId={costCodeDropDownMerged[tabId].tabId} options={costCodeDropDownMerged[tabId].costCodeOptions} />
                </div>
            </div>


    return (
        <div className = "Cost Item dropdown Main" key="1">
            {/* <h3> Estimating Database Entry: {tabId+1} </h3>  */}

            {/* This ensures that only when unique Division (Array) is filled with data, will the dropdown display */}
            {options.length !== 0 && 
                <div className="dropdown" key="1">
                    <label htmlFor="division"> Estimate Division</label> 
                    <select 
                        name={tabId} 
                        id={`divId:${tabId}`}
                        required
                        onFocus = {()=> dispatch({type: 'home/entryStarted'})}
                        onClick = {()=> dispatch({ type: 'formMemory/divisionChoice', payload: {tabId: tabId, divisionChoice:(document.getElementById(`divId:${tabId}`).value)}})}>
                            <option
                            value = 'no division selected!'
                            key = "defaultDivisionDropDown"
                            > Select the Division
                            </option>

                        {/* this function below seperates the array of unique divisions into individual items that
                        display sequentially in the drop down menu */}
                        {options.map(options => ( 
                            <option 
                                value = {options}
                                key = {options}
                                > {options}
                            </option>
                        ))}
                    </select>

                    {/* Once a division choice has been made, the next form becomes available  */}
                    {costCodeDropDownMerged[tabId].costCodeOptions.length !== 0 && 
                        <div> 
                             {costHeaderForm}
                        </div>}
                </div>
            }
        </div>
    );  
}
 
export default DivisionDropDown;
