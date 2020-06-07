import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, createField } from '../common/Preloader/FormsControls/FormsControls';
import { required } from '../../redux/utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from "../../components/common/Preloader/FormsControls/FormsControls.module.css"

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", Input, [required])}
      {createField("Password", "password", Input, [required], { type: "password" })}
      {createField(null, "rememberMe", Input, [required], { type: "checkbox" }, "remember me")}

      {captchaUrl && <img alt="captcha" src={captchaUrl} />}
      {captchaUrl && createField("Symbols from image", "captcha", Input, [required])}

      {error && <div className={styles.formSummaryError}>
        {error}
      </div>
      }
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
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"} />
  }
  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
  </div>
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);

