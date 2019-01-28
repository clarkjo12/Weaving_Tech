import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import Mapper from "./pages/Map";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Mapper} />
          <Route exact path="/map" component={Mapper} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/signin" component={Signin} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
