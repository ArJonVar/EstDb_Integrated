import React from 'react';
import NewEntry from '../formlogic/EntryForm/NewEntry'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transformerHook } from '../formlogic/formlogicSlice'
import { fetchToken } from '../formmemory/formmemorySlice'

const ConditionalLogin = () => {
  const error = useSelector((state) => state.formMemory.userData.error)
  const currentCode=useSelector((state)=>state.formMemory.userData.authCode)
  const dispatch=useDispatch()
  const userCode=useSelector((state)=>state.formMemory.intakeData.userCode)
  let code=null
  const [initOauth, setInitOauth]=useState(false);

  useEffect(()=>{
    const analyzeParams= () => {
      code = new URLSearchParams(window.location.search).get('code')
      dispatch({type:'formMemory/updateAuthCode', payload:code})
      console.log('code:', code)
      if (code !== null) {
        console.log('dispatching fake user')
        dispatch({ type: 'formMemory/intakeDataSubmitUser', payload: ('Test User')})
      }
    }
    analyzeParams()
    //fetchUserData()
  }, [])
  
    return (
        <div> 
          {(currentCode === null) &&
            <div>
              <h1>Estimating Database Web Application</h1>
              <p>Welcome! To proceed, click on the link below to to login to your Smartsheet Account</p>
              <a href="https://estimating-database.dowbuilt.io/Oauth"><button>Login</button></a>
            </div>
          }
          {(currentCode !== null) &&
              <div>
                <p> welcome {userCode}, below is the start of the entry form.</p>
                <NewEntry />
              </div>
          }
        </div> 
    );
}
 
export default ConditionalLogin;
