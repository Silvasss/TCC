import { createContext, useState } from "react";


export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); 

  
  const createPerfilProfissional = (idPerfil, empresa, cargo, anoInicio, cidade, pais) => {
    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/createPerfilProfissional', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil, empresa, cargo, anoInicio, cidade, pais}) }).then(response => response.json());
            
      // Recebendo o resultado da API
      // Comparando se o ID do usuário existe, caso sim a variável 'user' recebe True      
      if (result['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();

    // Verifica se o valor da variável 'user' e falso 
    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newPerfilProfissional = [{ idPerfil, empresa, cargo, anoInicio, cidade, pais }];
    
    // Salva os dados do perfil academico no localStorage
    localStorage.setItem("user_perfilprofissional", JSON.stringify(newPerfilProfissional));

    // Retorno com nada
    return;
  };


  // TEstar o funcionamento 
  const findPerfilProfissonal = (idPerfil) => {
    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/findPerfilProfissonal', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil}) }).then(response => response.json());
      
      // Recebendo o resultado da API
      // Comparando se o ID do usuário existe, caso sim a variável 'user' recebe True
      if (result['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();

    // Verifica se o valor da variável 'user' e falso 
    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newfindPerfilProfissonal = [result];
    
    // Salva os dados do perfil academico no localStorage
    localStorage.setItem("user_perfilprofissional", JSON.stringify(newfindPerfilProfissonal));

    // Retorno com nada
    return;
  };


  return (
    <AuthContext.Provider value={{ user, createPerfilProfissional, findPerfilProfissonal}}>
      {children}
    </AuthContext.Provider>
  );
};
