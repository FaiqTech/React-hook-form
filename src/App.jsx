import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HookForm from "./components/hookForm/HookForm";
import FormComponent from "./components/formComponent/FormComponent";
import ChangePasswordForm from "./components/changePasswordForm /ChangePasswordForm";
import LoginForm from "./components/loginForm/LoginForm";
import SelectForm from "./components/selectForm/SelectForm";

function App() {
  return (
    <>
      {/* <HookForm /> */}
      {/* <FormComponent /> */}
      {/* <ChangePasswordForm /> */}
      {/* <LoginForm /> */}
      <SelectForm />
    </>
  );
}

export default App;
