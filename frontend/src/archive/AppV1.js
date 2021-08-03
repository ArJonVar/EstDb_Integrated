import React from 'react';
import './App.css';
import store from './reduxHQ/store';
import NewEntry from './features/formlogic/EntryForm/NewEntry';
import MainForm from './features/formlogic/MainForm/MainForm'
// import Footer from './features/footer/Footer';
import Navbar from './features/home/Navbar'
import Home from './features/home/Home';
import DowLogo from './features/home/DowLogo'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


function App() {
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
              <Route exact path='/'> 
                <Home />
              </Route>
              <Route path='/intake-form'>
                <NewEntry />
              </Route>
              <Route path='/main-form'>
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
