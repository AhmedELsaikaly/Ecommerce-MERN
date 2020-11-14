import React from "react";
import Header from "./components/Header"
import {Container} from "react-bootstrap"
import Footer from "./components/Footer"
import  HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App=()=> {
  return (
    <Router>
    <Header />
    <main className="py-3" >
      <Container>
        <Route  path = {"/"} component={HomeScreen} exact/>
        <Route path={"/product/:id"} component={ProductScreen} />
      </Container>
    </main>
    <Footer />
    </Router >
  )

}

export default App;
