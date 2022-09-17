import { createContext, useState } from "react";


export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); 

  
  const createPefilAcademico = (idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida) => {
    (async () => {
      const result = await fetch('http://localhost:4000/createPerfilAcademico', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();


    const usersStorage = localStorage.getItem("users_bd");


    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newPerfilUser;

    if (user) {
      newPerfilUser = [...usersStorage, { idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida }];
    } else {
      newPerfilUser = [{ idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newPerfilUser));

    return;
  };


  const createPerfilProfissional = (idPerfil, empresa, cargo, anoInicio, cidade, pais) => {
    (async () => {
      const result = await fetch('http://localhost:4000/createPerfilProfissional', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil, empresa, cargo, anoInicio, cidade, pais}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();


    const usersStorage = localStorage.getItem("users_bd");


    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newPerfilProfissional;

    if (user) {
      newPerfilProfissional = [...usersStorage, { idPerfil, empresa, cargo, anoInicio, cidade, pais }];
    } else {
      newPerfilProfissional = [{ idPerfil, empresa, cargo, anoInicio, cidade, pais }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newPerfilProfissional));

    return;
  };

  // TEstar o funcionamento 
  const findPerfilAcademico = (idPerfil) => {
    (async () => {
      const result = await fetch('http://localhost:4000/findPerfilAcademico', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();

    
    const usersStorage = localStorage.getItem("users_bd");


    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newfindPerfilAcademico;

    if (user) {
      newfindPerfilAcademico = [...usersStorage, result];
    } else {
      newfindPerfilAcademico = [result];
    }

    localStorage.setItem("users_bd", JSON.stringify(newfindPerfilAcademico));

    return;
  };

  // TEstar o funcionamento 
  const findPerfilProfissonal = (idPerfil) => {
    (async () => {
      const result = await fetch('http://localhost:4000/findPerfilProfissonal', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil}) }).then(response => response.json());
      
      let resultApiRequest = result;

      if (resultApiRequest['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        setUser(true)
      }
    })();

    
    const usersStorage = localStorage.getItem("users_bd");


    if (!user) {
      return "ID do usuário não encontrado!";
    }

    let newfindPerfilProfissonal;

    if (user) {
      newfindPerfilProfissonal = [...usersStorage, result];
    } else {
      newfindPerfilProfissonal = [result];
    }

    localStorage.setItem("users_bd", JSON.stringify(newfindPerfilProfissonal));

    return;
  };


  return (
    <AuthContext.Provider value={{ user, createPefilAcademico, findPerfilAcademico}}>
      {children}
    </AuthContext.Provider>
  );
};
