import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchIntakeData } from '../formlogicSlice'
import NewVendorComponents from './NewVendorComponents'
import Select from 'react-select'
import Creatable from 'react-select/creatable';
import TinyArrow from './TinyArrow'
import {transformerHook} from '../formlogicSlice'

const NewEntry = () => {
    
    //get data from state to make local variables
    const intakeStatus = useSelector((state) => state.formLogic.intakeData.status)
    const error = useSelector((state) => state.formLogic.intakeData.error)
    const intakeMemory = useSelector((state) => state.formMemory.mainData)
    const intakeData = useSelector((state) => state.formLogic.intakeData.getReceived)
    const [entryType, setEntryType] = useState('')
    const [projectEnumerator, setProjectEnumerator] = useState('')
    const [subRVendor, setSubRVendor] = useState('') 
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [userCode, setUserCode] = useState('')
    const [submitPath, setSubmitPath] = useState('/intake-form')
    const [errorMessage, setErrorMessage] = useState('')
    const [formComplete, setFormComplete] = useState(false)
    const history = useHistory()

    //link to useDispatch for actions
    const dispatch = useDispatch()

    //tells python transofmers to update restAPI
    //useEffect(()=>{
    //  dispatch(transformerHook({"first try":{"does this work?":"yes!"}}))
    //  console.log('dispatched to transformers')
    //}, [dispatch])
  
    //fetches data from API
    useEffect(() => {
        //if (intakeStatus === 'idle') {
        //  dispatch(fetchIntakeData())
        //}
      }, [intakeStatus, dispatch])
    
    let enumOptions, vendorOptions = {value: 'loading', label:'loading'}

      //conditional logic gate that waits for fetch
      if (intakeStatus === 'succeeded') {
        console.log('formlogic status success')
        //isolates division data
        const projEnum = Object.values(intakeData[0][Object.keys(intakeData[0])[3]])
        const vendors= Object.values(intakeData[0][Object.keys(intakeData[0])[4]])

        function removeNull(array) {
        return array.filter(x => x !== null)
        };
        
        const vendorList=removeNull(vendors)
        // maps form entry accross each tab
        enumOptions=
        projEnum.map((projEnum) => (
          {value: projEnum, label: projEnum}
        ))
        
        vendorOptions=
        vendorList.map((vendorList) => (
          {value: vendorList, label: vendorList}
        ))

      //end of conditional gate, responds to error
      } else if (intakeStatus === 'error') {
        enumOptions = {value: {error}, label:{error}}
      }
      
      // styling for react-select component
      const customStyles = {
        control: styles => ({ ...styles, borderRadius: '15px 15px 15px 15px', backgroundColor: '#2C2C2C', color: 'white' }),
        option: styles => ({ ...styles, backgroundColor: '#2C2C2C', color: 'white' }),
        // placeholder: (defaultStyles) => {
        //   return {
        //       ...defaultStyles,
        //       color: 'white',
        //   }
        // },
        input: base => ({
          ...base,
            color: 'white',
            backgroundColor: '#2C2C2C'
        }),
        singleValue: provided => ({
          ...provided,
          color: 'white'
        }),
        menuList: (base) => ({
          ...base,
          height: "240px",
          backgroundColor: "#2C2C2C",
      
         "::-webkit-scrollbar": {
           width: "23px",
         },
         "::-webkit-scrollbar-track": {
           background: "#2C2C2C",
         },
         "::-webkit-scrollbar-thumb": {
           background: "#888"
         },
         "::-webkit-scrollbar-thumb:hover": {
           background: "#555"
         }
        }),
      }
    const submitHandling = () => {
      const submitArray = [entryType, projectEnumerator, subRVendor, dateOfEntry]
      if (submitArray.includes('')){
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        dispatch({ type: 'formMemory/intakeDataSubmit', payload: {entryType:entryType, projectEnumerator:projectEnumerator, subRVendor:subRVendor, dateOfEntry: dateOfEntry, userCode:userCode}})
        setSubmitPath('/main-form')
        history.push("/main-form")
      }

    }
    return (
      <div>
        <div className="entryForm">
          <h2 className="firstEntry">Entry Type</h2> <br></br>
          <div className="horizontalMC" required>
            <div className='mcUnit'>
              <input type="radio" id="estimateEntry" name="entryType" onClick={(e) => {setEntryType(e.target.value)}} value="estimateEntry"></input><br></br>
              <label htmlFor="estimateEntry">Estimate Entry</label>
            </div>
            <div className="mcUnit">
              <input type="radio" id="buyoutEntry" name="entryType" onClick={(e) => {setEntryType(e.target.value)}} value="buyoutEntry"></input><br></br>
              <label htmlFor="buyoutEntry">Buyout Entry</label>
            </div>
          </div> <br></br>

          <h2>Project Enumerator</h2>
          <p>refer to <a href="">Project List 2.0</a> for enumerators</p>
            <div className= "projEnumDropdowns">
              <Select 
                placeholder="0000 - Project Name" 
                options={enumOptions}
                styles={customStyles}
                menuColor='red'
                onChange={(e)=> setProjectEnumerator(e.value)}
                />
            </div>

          <h2>Subcontractor / Vendor</h2>
          <p>provide the name of the vendor or subcontract, type new entry if not found</p>
            <div className= "projEnumDropdowns">
              <Creatable
                placeholder="sub. / Vendor Name" 
                options={vendorOptions}
                styles={customStyles}
                onChange={(e) => setSubRVendor(e.value)} />
            </div>

          {subRVendor !== '' &&
          <div>
            <NewVendorComponents vendor={subRVendor} />
          </div>}

          <div className="datePicker">
            <h2>Date of Entry</h2>
            <p>Select "today" unless &gt;3 months prior</p>
            <input type="date" onBlur={(e) => {setDateOfEntry(e.target.value)}}></input>
          </div>
          <br></br><br></br><br></br>
        
        </div>


        {errorMessage && 
          <div>
            <div className="errorMessage">
              <p>please complete this intake form before submitting</p>
            </div>
            <div className="nextPageButton"> 
              <div className="buttonText">
                <Link onClick={submitHandling} to={submitPath}>Submit Again</Link>
              </div>
            </div>
          </div>}
        {errorMessage === false && 
          <div>
            <div className="errorMessage">
              <p>Project located, proceed to enter cost components</p>
            </div>
            <div className="nextPageButton"> 
                <div className="buttonText">
                  <Link onClick={submitHandling} to={submitPath}>Next</Link>
                </div>
                <div>
                  <TinyArrow />
                </div>
            </div>
          </div>}

          {errorMessage === '' && 
          <div className="nextPageButton"> 
              <div className="buttonText">
                <Link onClick={submitHandling} to={submitPath}>Submit</Link>
              </div>
          </div>}

      </div>

    );
}
 
export default NewEntry;
