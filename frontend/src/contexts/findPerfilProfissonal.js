import { useState } from "react";


function FindPerfilProfissonal(idPerfil) {
    const [user, setUser] = useState(); 

    (async () => {
      // Consumindo API
      const result = await fetch('http://localhost:4000/findPerfilProfissonal', {method: 'POST',headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({idPerfil}) }).then(response => response.json());
      
      // Recebendo o resultado da API
      // Comparando se o ID do usuário existe, caso sim a variável 'user' recebe True
      if (result['message'] === 'Id not exists"') {
        setUser(false)
      } else {
        // Salva os dados do perfil academico no localStorage
        localStorage.setItem("user_perfilprofissonal", JSON.stringify([result]));
      }
    })();

    // Verifica se o valor da variável 'user' e falso 
    if (!user) {
      return "ID do usuário não encontrado!";
    }

    // Retorno com nada
    return;
};


export default FindPerfilProfissonal
