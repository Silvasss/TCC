import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Signup = () => {
  const [email, setEmail] = useState("");

  const [emailConf, setEmailConf] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [cidade, setCidade] = useState("");

  const [pais, setPais] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { signup } = useAuth();


  const handleSignup = () => {
    if (!email | !emailConf | !password | !name | !cidade | !pais) {
      setError("Preencha todos os campos");

      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");

      return;
    }

    const res = signup(name, email, password, cidade, pais);

    if (res) {
      setError(res);

      return;
    }

    alert("Usuário cadatrado com sucesso!");

    navigate("/");
  };

  return (
    <C.Container>

      <C.Label>SISTEMA DE CADASTRO</C.Label>

      <C.Content>

        <Input
          type="name"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />

        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />

        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />

        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />

        <Input
          type="cidade"
          placeholder="Digite sua Cidade"
          value={cidade}
          onChange={(e) => [setCidade(e.target.value), setError("")]}
        />

        <Input
          type="pais"
          placeholder="Digite seu País"
          value={pais}
          onChange={(e) => [setPais(e.target.value), setError("")]}
        />

        <C.labelError>{error}</C.labelError>

        <Button Text="Inscrever-se" onClick={handleSignup} />

        <C.LabelSignin>Já tem uma conta?
          <C.Strong>
            <Link to="/">Entre</Link>
          </C.Strong>

        </C.LabelSignin>

      </C.Content>
      
    </C.Container>
  );
};

export default Signup;
