import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import store from './reduxHQ/store';
// import NavBar from './features/formlogic/NavBar';
import NewEntry from './features/formlogic/EntryForm/NewEntry';
import MainForm from './features/formlogic/MainForm/MainForm'
// import Footer from './features/footer/Footer';
import Navbar from './features/home/Navbar'
import Home from './features/home/Home';
import DowLogo from './features/home/DowLogo'
import ConditionalLogin from './features/home/ConditionalLogin'
import DevConditionalLogin from './features/home/DevConditionalLogin'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


function App() {
  const userCode = useSelector(((state) => state.formMemory.intakeData.userCode))
  let authProtected;
      if ( userCode === "" ) //check condition
      {
        authProtected = <Redirect to='/login'/>;
      }

  return (
    <Router> 
      <div className="App">
        <Navbar />
        <div className="sideBySide">
          <div className="logo">
            <DowLogo />   
          </div>
          <div className="routedContent">
            <Switch>
              <Route path='/login'>
                <ConditionalLogin />
              </Route>
              <Route path='/devlogin'>
                <DevConditionalLogin />
              </Route>
              <Route exact path='/'> 
                {authProtected}
                <Home />
              </Route>
              <Route path='/intake-form'>
                {authProtected}
                <NewEntry />
              </Route>
              <Route path='/main-form'>
                {authProtected}
                <MainForm />
                {/* <Footer />  */}
              </Route>
              <Route path='/TESTING'>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>


  );
}

export default App;
