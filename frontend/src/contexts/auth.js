import { createContext, useState } from "react";


export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [logado, setLogado] = useState();


  const signin = (email, password) => {
    (async () => {
      const result = await fetch('http://localhost:4000/auth', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({email, password}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'User acess successfully') {
        setLogado(true)
      }
    })();

    if (logado) {      
      const token = Math.random().toString(36).substring(2);

      localStorage.setItem("user_token", JSON.stringify({ email, token }));

      setUser({ email, password });

      return;
      
    } else {
      return "E-mail ou senha incorretos";
    }
  };


  const signup = (name, email, password, cidade, pais) => {
    (async () => {
      const result = await fetch('http://localhost:4000/user', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({name, email, password, cidade, pais}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'User already exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();


    const usersStorage = localStorage.getItem("users_bd");


    if (!user) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (user) {
      newUser = [...usersStorage, { name, email, password, cidade, pais }];
    } else {
      newUser = [{ name, email, password, cidade, pais }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };


  const signout = () => {
    setUser(null);

    localStorage.removeItem("user_token");
  };


  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
