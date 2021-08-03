import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CostComponentForm from './CostComponentLogic/CostComponentForm'

const CostItemDropDown = ({tabId, options}) => {
    const dispatch = useDispatch()

    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const formMemory = useSelector((state) => state.formMemory.mainData)
    
    // costComponentForm Component!!

    //gets array of division choices for each tab (but just holds choice, not tab number)
    let costItemChoice = formMemory.map(({ costItemChoice }) => costItemChoice)
    //makes object out of column of cost codes
    const costItemObj = noCodeJson[0][Object.keys(noCodeJson[0])[4]]

    // returns array of keys that match input value in column object
    const getKey = (obj, val) => Object.keys(obj).filter(key=>obj[key]=== val);

    // makes a matrix of rows (keys) that have relevent cost components to render
    const costComponentChoiceMatrix = costItemChoice.map((costItemChoice) => (getKey(costItemObj, costItemChoice)))

    // //merge TabIds w/ costComponentChoiceMatrix options to apply .map and render to each tab
    const costComponentMerged =
        costComponentChoiceMatrix.map((costComponentChoiceMatrix, tabId) =>{
        return { tabId: tabId, costComponents: costComponentChoiceMatrix}
        })

    const costComponentForm=
    <div>
        <div id={`cost Component dropdown: ${costComponentMerged[tabId].tabId}`} className="cost Components">
            <CostComponentForm key={costComponentMerged[tabId].tabId} masterObj={costComponentMerged[tabId]} tabId={costComponentMerged[tabId].tabId} options={costComponentMerged[tabId].costComponents} />
        </div>
    </div>

    const handleCostItemDispatches = () => {
        dispatch({ type: 'formMemory/costItemChoice', payload: {tabId: tabId, costItemChoice:(document.getElementById(`costItemId:${tabId}`).value)}})
        dispatch({ type: 'formMemory/costComponentReset', payload: {tabId: tabId, blank: {}}})
    }

    return(
        <div className="Cost Item dropdown Main" key="3">
            <label htmlFor="costItem"> Select the Cost Item:</label> 
                <select 
                    name={tabId} 
                    id={`costItemId:${tabId}`}
                    required
                    onClick= {handleCostItemDispatches}
                        ><option
                        value = {`Entry #${tabId+1}`}
                        key = "defaultCostItemDropDown"
                        > Select the Cost Item
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
                {costComponentMerged[tabId].costComponents.length !== 0 && 
                    <div className = "componentForm"> 
                        {costComponentForm}
                    </div>}
        </div>
    )
}

export default CostItemDropDown;
