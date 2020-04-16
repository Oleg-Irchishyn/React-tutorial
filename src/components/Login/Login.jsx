import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../common/Preloader/FormsControls/FormsControls';
import { required } from '../../redux/utils/validators/validators';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.hanleSubmit}>
      <div>
        <Field placeholder={"Login"} name={"login"}
          component={Input} validate={[required]} />
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"}
          component={Input} validate={[required]} />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"}
          component={Input} validate={[required]} /> Remember Me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  }
  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>
}

export default Login;

