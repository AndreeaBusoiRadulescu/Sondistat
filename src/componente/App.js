import '../App.css';
import React from 'react';
import Login from './logare/Login';
import ListaSondaje from './sondajele_mele/ListaSondaje';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebase from 'firebase';
import DatabaseInstance from "../Database";
import ConstructorDeSondaj from "./constructie_sondaj/ConstructorDeSondaj";
import DetaliiSondaj from "./sondajele_mele/DetaliiSondaj";
import IntrebareRaspunsDeschis from "./intrebari_sondaj/IntrebareRaspunsDeschis";
import FormularCompletare from "./completare_sondaj/FormularCompletare";

class App extends React.Component{
  constructor(props){
    super(props);
    const firebaseConfig = {
      apiKey: "AIzaSyAq2R4V9sSwwd7SUN4FPP7s5j8Mp-o_BjU",
      authDomain: "sondaje-de-opini.firebaseapp.com",
      projectId: "sondaje-de-opini",
      storageBucket: "sondaje-de-opini.appspot.com",
      messagingSenderId: "131575197286",
      appId: "1:131575197286:web:71eae5bff83f62a4dec7a7",
      measurementId: "G-FCPPVLYE94"
    };
    if (!firebase.apps.length) {
      let firebaseApp = firebase.initializeApp(firebaseConfig);
      DatabaseInstance().setInstance(firebaseApp);
    }
    firebase.analytics();
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>

            <Route path="/login">
              <Login/>
            </Route>

            <Route path="/sondaje">
              <ListaSondaje/>
            </Route>

            <Route path="/adaugare">
            <ConstructorDeSondaj/>
            </Route>

            <Route path="/detalii">
              <DetaliiSondaj/>
            </Route>

            <Route path="/deschis">
              <IntrebareRaspunsDeschis />
            </Route>

            <Route path="/completare">
              <FormularCompletare />
            </Route>

            <Route path="/">
              <Redirect to="/login"/>
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
