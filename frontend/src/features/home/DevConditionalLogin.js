import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transformerHook } from '../formlogic/formlogicSlice'
import {postAuthCode} from '../formmemory/formmemorySlice'
import {getUserData} from '../formmemory/formmemorySlice'


const DevConditionalLogin = () => {
  
  const formMemoryStatus = useSelector((state) => state.formMemory.userData.status)
  const error = useSelector((state) => state.formMemory.userData.error)
  const currentCode=useSelector((state)=>state.formMemory.userData.authCode)
  const currentPk=useSelector((state)=>state.formMemory.userData.pk)
  const dispatch=useDispatch()
  let code=null
  const [initOauth, setInitOauth]=useState(false);
  const [dispatchToggle, setDispatchToggle]=useState(false);

  useEffect(()=>{
    const analyzeParams= () => {
      code = new URLSearchParams(window.location.search).get('code')
      dispatch({type:'formMemory/updateAuthCode', payload:code})
      console.log('code:', code)
    }
    analyzeParams()
    //fetchUserData()
  }, [])
  
  if ((currentPk !== null) && (dispatchToggle === false)) {
    dispatch(getUserData(currentPk))
    setDispatchToggle(true)
  }

  const useFetch =() => {
    if (currentCode !== null) {
      console.log('running thunk fetch')
      console.log(currentCode)
      dispatch(postAuthCode({pk:0, authCode: currentCode, userData:'{"test":"test}'}))
      setDispatchToggle(false)
    } else {
      console.log('auth code required, first login') 
    }
  }

    return (
        <div> 
            <h1>Estimating Database Web Application</h1>
            <p>Welcome! To proceed, click on the link below to to login to your Smartsheet Account</p>
            <button onClick={(e)=> dispatch({ type: 'formMemory/intakeDataSubmitUser', payload: ('Test User')})}>Auto-Login DEV_OPTION </button>
            <br></br>
            <a href="https://estimating-database.dowbuilt.io/Oauth"><button>Login PRODUCTION_OPTION</button></a>
            <br></br>
            <button onClick={() => useFetch()}> click for fetch</button>
        </div> 
    );
}
 
export default DevConditionalLogin;
