import { createContext, useState } from "react";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); 

  
  const createPefilAcademico = (idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida) => {
    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/createPerfilAcademico', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida}) }).then(response => response.json());
      
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
    
    let newPerfilUser = [{ idPerfil, instituicaoEnsino, curso, anoInicio, semestreEntrada, anoSaida, semestreSaida }];

    // Salva os dados do perfil academico no localStorage
    localStorage.setItem("user_perfilacademico", JSON.stringify(newPerfilUser));

    // Retorno com nada
    return;
  };

  
  // TEstar o funcionamento 
  const findPerfilAcademico = (idPerfil) => {
    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/findPerfilAcademico', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil}) }).then(response => response.json());
      
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

    // Salva os dados do perfil academico no localStorage
    localStorage.setItem("user_perfilacademico", JSON.stringify([result]));

    // Retorno com nada
    return;
  };

};
