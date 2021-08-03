import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { asyncPost } from '../formmemory/formmemorySlice'

const Navbar = () => {
    const [entryStarted, setEntryStarted]=useState(false)
    const history = useHistory();
    const dispatch=useDispatch()
    const entryCheck = useSelector(((state) => state.home.entryStarted))
    const project = useSelector(((state) => state.formMemory.intakeData.projectEnumerator))
    const userCode = useSelector(((state) => state.formMemory.intakeData.userCode))
    const intake = useSelector(((state) => state.formMemory.intakeData))
    const formdata = useSelector(((state) => state.formMemory.mainData))
    console.log('intake', intake, 'formdata', formdata)
    
    const onClick= () => {
        dispatch(asyncPost({intake, formdata}))
        console.log('submit success!')
      }


    if (entryStarted !== entryCheck) {
        setEntryStarted(entryCheck)
    }

    const confirmProtocal = () => {
        if (window.confirm('You are about to clear your inputs without saving, Would you like to proceed?')){
            // dispatch a clear data
            history.push('/');
            dispatch({type: 'home/entryCleared'})
            setEntryStarted(false)
            window.location.reload();
        } else {
            
        }
    }

    return ( 
    <nav className='navbar'>
        <h2> {project} </h2>
        <div className="links">
            <Link className="home" to="/"> Home </Link>
            {!entryStarted && 
            <Link className="new" to="/intake-form" onClick={()=> setEntryStarted(true)}> New Entry</Link>
            }
            {entryStarted &&
            <a className="clear" onClick={()=> confirmProtocal()}> Clear Entry</a>
            } 
            {(userCode !== '') && <span> {userCode} </span>}
            {/* <a href="#">Admin Page </a> 
            <a href="#"> Database </a> 
            <a href="#"> Maintainence</a>
            {(userCode !== '') && <span> {userCode} </span>}
            <button onClick={onClick}>submit</button> */}
        </div>
    </nav>

    );
}
 
export default Navbar;
