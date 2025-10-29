import React from "react";
import LoginForm from "../Authentication/LoginForm";
import AuthPage from "../ui/AuthPage";

function Login() {
  return (
    <AuthPage greetMessage={"Sign in"}>
      <LoginForm />
    </AuthPage>
  );
}

export default Login;
