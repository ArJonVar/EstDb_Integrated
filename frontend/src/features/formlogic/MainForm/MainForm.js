import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchMainData } from '../formlogicSlice'
import DivisionDropDown from './DivisionDropDown'

const MainForm = () => {
    
    //get data from state to make local variables
    const noCodeJson = useSelector((state)=> state.formLogic.mainData.getReceived)
    const formLogicStatus = useSelector((state) => state.formLogic.mainData.status)
    const error = useSelector((state) => state.formLogic.mainData.error)
    const formMemory = useSelector((state) => state.formMemory.mainData)
    const costItemChoice = formMemory.map(({ costItemChoice }) => costItemChoice)

    
    //link to useDispatch for actions
    const dispatch = useDispatch()
    
    //local state to run Tabs (slice not required)
    const [tabHistory, setTabHistory] = useState(1)

    //creates single tab based on coutner, then increases counter
    const handleNewTab = () => {
            for(let i=tabHistory;i<tabHistory+1;i++){
                dispatch({ type: 'formMemory/newTab', payload: {tabId:i, divisionChoice:'', costCodeChoice:'', costItemChoice:'', costComponentItems:[]}})
                setTabHistory((i+1))
                console.log('tabHistory', tabHistory)
            }
        }

    //finds unique items in array, maybe needs to be reducer?
    function unique(arr) {
        let results = []

        for (let str of arr) {
            if (!results.includes(str)){
                results.push(str);
            }
        }
        return results
    }

    //fetches data from API
    useEffect(() => {
      if (formLogicStatus === 'idle') {
        dispatch(fetchMainData())
      }
    }, [formLogicStatus, dispatch])

    //conditional logic gate that waits for data to fetch, 
    // then creates the infrustructure for tabs and form by mapping across arrays
    let contentTabs, contentForms;

    //conditional logic gate that waits for fetch
    if (formLogicStatus === 'loading') {
      contentTabs = <div className="loader">Loading...</div>
      contentForms = <div className="loader">Please wait patiently :)</div>
    } else if (formLogicStatus === 'succeeded') {
        console.log('formlogic status success')
        //isolates division data
        const divisionData = Object.values(noCodeJson[0][Object.keys(noCodeJson[0])[1]])
        //finds unique divisions within division array
        const uniqueDiv=  unique(divisionData)

        
        // making an array of tabId's from formMemory
        const idArr = formMemory.map(formMemory => ([formMemory.tabId]));
        
        //merges tabId's with form data and copies it for each tabId, 
        //this variable will get mapped accross each tab and display form data for that tab object
        let mergedArr = [].concat.apply([], idArr)
        
        let divFormArr = []

        divFormArr = mergedArr.map(function (a) {
            return { tabId: a, divOptions: uniqueDiv}
        })

        //Javascript that switches css of tabs from display:none (closed) to display:block (open)
        //as it does this, it attaches an 'active' string to className for further CSS
        function openTab(e){
            let tab = e.currentTarget.getAttribute('id');
            const tabcontent = document.getElementsByClassName("tabcontent");
            const tablinks = document.getElementsByClassName("tablinks");
            for(let i=0;i< tabcontent.length;i++){
                tabcontent[i].style.display = 'none';
                tabcontent[i].className="tabcontent";
                tablinks[i].className="tablinks";
    
            }
            tabcontent[tab].style.display = 'block';
            tabcontent[tab].className += " active";
            e.currentTarget.className += " active";
            
        }
        //   document.getElementById({0}).click();
          
        // document.getElementsByClassName("tablinks").click();
 
        //maps tab array
        contentTabs =
        divFormArr.map((divFormArr) => (
            <div>
                <button key={`tab #${divFormArr.tabId}`} className="tablinks" id={divFormArr.tabId} style={{borderStyle: "solid", borderColor:"white"}} onClick= {(e) => openTab(e)}>
                    {(costItemChoice[divFormArr.tabId] !== "") && costItemChoice[divFormArr.tabId]}
                    {(costItemChoice[divFormArr.tabId] === "") && `Entry #${divFormArr.tabId+1}`}
                </button>
            </div>
        ))
        
        //maps form entry accross each tab
        contentForms=
        divFormArr.map((divFormArr) => (
            <div className= "innerForm">
                <div key= {`content for ${divFormArr.tabId}`} id={divFormArr.tabId} className="tabcontent">
                    <DivisionDropDown key={divFormArr.tabId} tabId={divFormArr.tabId} options={divFormArr.divOptions} />
                </div>
            </div>
        ))

    //end of conditional gate, responds to error
    } else if (formLogicStatus === 'error') {
      contentTabs = <div>{error}</div>
      contentForms = <div>"try again!"</div>
    }

    return(
        // renders tabs buttons first, then forms second
        <div> 
            <section className="form field">
                        <div className="tab">
                            <div className="tabSpace"></div>
                            {contentTabs}

                            {/* limits number of tabs */}
                            {(tabHistory < 6) && <button className="tablinks" 
                                id="add new tab"
                                onClick= {handleNewTab} 
                                style={{borderStyle: "solid", borderColor:"white"}} 
                                >  + </button>}

                            {/* submit button */}
                            {/* <button className="submitButton" 
                                id="submitButton"
                                onClick={console.log('YOU CLICKED SUBMIT?')}
                                > Submit </button> */}
                        </div>
                        <div className="formConent">
                            <div className= "space2"></div>
                                {contentForms}
                        </div>
            </section>
        </div>
    );
}
 
export default MainForm;
