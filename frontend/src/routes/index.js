import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";


const Private = ({ Item }) => {
  var dados = JSON.parse(localStorage.getItem('user_token'))

  if (dados['token']) {
    return 1 > 0 ? <Item /> : <Signin />;
  } 

  return 0 > 0 ? <Item /> : <Signin />;
};


const RoutesApp = () => {

  return (
    <BrowserRouter>

      <Fragment>        
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />

          <Route path="/" element={<Signin />} />

          <Route path="/profile" element={<Private Item={ProfilePage} />} />

          <Route exact path="/signup" element={<Signup />} />

          <Route path="*" element={<Signin />} />
        
        </Routes>

      </Fragment>

    </BrowserRouter>
  );
};

export default RoutesApp;
