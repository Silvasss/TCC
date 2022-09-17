import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [logado, setLogado] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);


  const signin = (email, password) => {
    (async () => {
      const result = await fetch('http://localhost:4000/auth', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({email, password}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'User acess successfully') {
        setLogado(true)
      }
    })();

    if (logado) {
      if (logado) {
        const token = Math.random().toString(36).substring(2);

        localStorage.setItem("user_token", JSON.stringify({ email, token }));

        setUser({ email, password });

        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };


  const signup = (email, password) => {
    (async () => {
      const result = await fetch('http://localhost:4000/user', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({email, password}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'User acess successfully') {
        setUser(true)
      }
    })();

    const usersStorage = localStorage.getItem("users_bd");
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
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
