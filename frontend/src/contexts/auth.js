import { createContext, useState } from "react";


export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();


  const signin = (email, password) => {
    (async () => {
        // Consumindo API
        const result = await fetch('http://localhost:4000/auth', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({email, password}) }).then(response => response.json());
        
        // Recebendo o resultado da API
        // Comparando se os dados estão corretos, caso sim a variável 'user' recebe True      
        if (result['message'] === 'User acess successfully') {
          setUser(true)

          const result2 = await fetch('http://localhost:4000/findUser', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({"id":result['userExists']['_id']}) }).then(response => response.json());
          
          localStorage.setItem("user_dados", JSON.stringify( result2['user'] ));           
        }
    })();
    
    if (user) {      
      let token = Math.random().toString(36).substring(2);

      localStorage.setItem("user_token", JSON.stringify({ email, token}));
      
      // Retorno com nada
      return true;
      
    } else {
      return "E-mail ou senha incorretos";
    }
  };


  const signup = (name, email, password, cidade, pais) => {
    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/user', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({name, email, password, cidade, pais}) }).then(response => response.json());
       
      // Recebendo o resultado da API
      // Comparando se o usuário existe, caso sim a variável 'user' recebe false      
      if (result['message'] === 'User already exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();


    // Verifica se o valor da variável 'user' e falso 
    if (!user) {
      return "Já tem uma conta com esse E-mail";
    }
    
    let newUser = [{ name, email, password, cidade, pais }];
    
    // Salva os dados do perfil academico no localStorage
    localStorage.setItem("users_bd", JSON.stringify(newUser));  

    // Retorno com nada
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
