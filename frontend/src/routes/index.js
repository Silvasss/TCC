import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";


const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};


const RoutesApp = () => {

  return (
    <BrowserRouter>

      <Fragment>        
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/teste" element={<ProfilePage />} />
          <Route path="*" element={<Signin />} />
        </Routes>

      </Fragment>

    </BrowserRouter>
  );
};

export default RoutesApp;
