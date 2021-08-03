import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CostItemDropDown from './CostItemDropDown'

const CostCodeDropDown = ({tabId, options}) => {
    const dispatch = useDispatch()

    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const formMemory = useSelector((state) => state.formMemory.mainData)
    
    // costItemComponent!!

    //gets array of division choices for each tab (but just holds choice, not tab number)
    let costCodeChoice = formMemory.map(({ costCodeChoice }) => costCodeChoice)
    //makes object out of column of cost codes
    const costItemObj = noCodeJson[0][Object.keys(noCodeJson[0])[4]]
    //returns array of keys (row#) from an object and specific (repeating) value within object
    const getKey = (obj, val) => Object.keys(obj).filter(key=>obj[key]=== val);
    //makes array of all row # that have a cost item name (instead of null)
    function removeEmpty(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
    }    
    const costItemArr = unique(Object.keys(removeEmpty(costItemObj)))
    // returns object of division options
    const costCodeObj = noCodeJson[0][Object.keys(noCodeJson[0])[2]]

    

    // makes a matrix of rows (keys) that fall along each tab's division choice
    const costCodeChoiceMatrix = costCodeChoice.map((costCodeChoice) => (getKey(costCodeObj, costCodeChoice)))
    //makes a matrix of relevent row numbers that fit each each tab's choice of division
    let codeItemIntersectionMatrix =  costCodeChoiceMatrix.map((costCodeChoiceMatrix) => costItemArr.filter(x => costCodeChoiceMatrix.includes(x)))
    
    //makes a matrix of relevent cost codes (based off row numbers) that fit each tab's choice of division
    const costItemOptions = codeItemIntersectionMatrix.map((codeItemIntersectionMatrix) => codeItemIntersectionMatrix.map(codeItemIntersectionMatrix => costItemObj[codeItemIntersectionMatrix]))
    //will find unique values (filter out repeates)
    function unique(arr) {
        let results = []

        for (let str of arr) {
            if (!results.includes(str)){
                results.push(str);
            }
        }
        return results
    }
    const costItemDropDown = costItemOptions.map((costItemOptions) => unique(costItemOptions))

    //merge TabIds w/ costItemDropDown options to apply .map and render to each tab
    const costItemDropDownMerged =
        costItemDropDown.map((costItemDropDown, tabId) =>{
        return { tabId: tabId, costCodeOptions: costItemDropDown}
        })

    const costItemForm=
    <div>
        <div id={`costItem dropdown: ${costItemDropDownMerged[tabId].tabId}`} className="costItemDropDown">
            <CostItemDropDown key={costItemDropDownMerged[tabId].tabId} tabId={costItemDropDownMerged[tabId].tabId} options={costItemDropDownMerged[tabId].costCodeOptions} />
        </div>
    </div>


    return(
        <div className="Cost Item dropdown Main" key="2">
            <label htmlFor="costCode"> Select the Cost Code:</label> 
                <select 
                    name={tabId} 
                    id={`costCodeId:${tabId}`}
                    required
                    onClick= {()=> dispatch({ type: 'formMemory/costCodeChoice', payload: {tabId: tabId, costCodeChoice:(document.getElementById(`costCodeId:${tabId}`).value)}})}>
                        <option
                        value = 'no cost code selected!'
                        key = "defaultCostCodeDropDown"
                        > Select the Cost Code
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
                    {costItemDropDownMerged[tabId].costCodeOptions.length !== 0 && 
                        <div> 
                            {costItemForm}
                        </div>}
        </div>
    )
}
 
export default CostCodeDropDown;
