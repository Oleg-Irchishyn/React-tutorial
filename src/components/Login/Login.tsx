import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField} from '../common/Preloader/FormsControls/FormsControls';
import { required } from '../../redux/utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from "../../components/common/Preloader/FormsControls/FormsControls.module.css"
import { appStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps > = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", Input, [required])}
      {createField<LoginFormValuesTypeKeys>("Password", "password", Input, [required], { type: "password" })}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [required], { type: "checkbox" }, "remember me")}

      {captchaUrl && <img alt="captcha" src={captchaUrl} />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", Input, [required])}

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

const LoginReduxForm = reduxForm<LoginFormValuesType , LoginFormOwnProps>({
  form: "login"
})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean,
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType , string>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType > = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: appStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);

