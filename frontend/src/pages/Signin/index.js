import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Signin = () => {
  const { signin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [error, setError] = useState("");

  const [logado, setLogado] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");

      return;
    }

    const res = signin(email, senha);
    
    const dados = JSON.parse(localStorage.getItem('user_token'))

    if (dados['token']) {
      //navigate("/home")
      setLogado(true)
    } else {
      if (res) {
        setError(res);
  
        return;
      } 
    }
    
  };

  return logado ? navigate("/home") : (    
    <C.Container>

      <C.Label>SISTEMA DE LOGIN</C.Label>

      <C.Content>

        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />

        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />

        <C.labelError>{error}</C.labelError>

        <Button Text="Entrar" onClick={handleLogin} />

        <C.LabelSignup>Não tem uma conta?
          <C.Strong>

            <Link to="/signup">Registre-se</Link>

          </C.Strong>

        </C.LabelSignup>

      </C.Content>
      
    </C.Container>
  );
};


export default Signin;
