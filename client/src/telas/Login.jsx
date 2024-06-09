import * as yup from "yup";
import React, { useEffect } from 'react';
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../styles/img/logo.png"
import '../styles/login.css'

function Login() {

  //Para o body css funcionar só nessa página
  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  //navegação entre páginas.
  const navigate = useNavigate();

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      senha: values.senha,
    }).then((response) => {
        if (response.data.auth) {
          localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
          return navigate("/Calendario"); // Navega para a próxima página caso o token seja criado
        } else {
          alert(response.data.msg);
        }
      }).catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login");
      });
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  });

  return (
    <div className="container-login">
      <img src={logo} alt="logo bibi digital"/>
      <h1>Agendamento <br/>Digital</h1>
      <Formik initialValues={{ email: "", senha: "" }} onSubmit={handleLogin} validationSchema={validationsLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field name="senha" className="form-field" type="password" placeholder="Senha"/>
             <ErrorMessage  component="span"name="senha" className="form-error"/>
          </div>
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
