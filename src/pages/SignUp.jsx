import React from "react";
import SignupForm from "../Authentication/SignUpForm";
import AuthPage from "../ui/AuthPage";

function SignUp() {
  return (
    <AuthPage greetMessage={"Sign up"}>
      <SignupForm />
    </AuthPage>
  );
}

export default SignUp;
