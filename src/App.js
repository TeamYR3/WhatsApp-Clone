import { Switch } from 'react-router-dom';
import React from "react";
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useStateValue } from "./StateProvider";

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
  <div className="app">
      {!user ? (
       <Login />
      ) : (
         <div className="app__body">
          <Router>
            <Sidebar />
            
            <Switch>
              <Route exact path="/">
                <Chat />
              </Route>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
     )}
 </div>
 );
}

export default App;
