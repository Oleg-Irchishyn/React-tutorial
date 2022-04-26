import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';
import styles from '../../components/common/Preloader/FormsControls/FormsControls.module.css';
import { login } from '../../redux/authReducer';
import { appStateType } from '../../redux/redux-store';
import { required } from '../../redux/utils/validators/validators';
import { createField, Input } from '../common/Preloader/FormsControls/FormsControls';

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', Input, [required])}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', Input, [required], {
        type: 'password',
      })}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        'rememberMe',
        Input,
        [required],
        { type: 'checkbox' },
        'remember me',
      )}

      {captchaUrl && <img alt="captcha" src={captchaUrl} />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', Input, [required])}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm);

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const captchaUrl = useSelector((state: appStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: appStateType) => state.auth.isAuth);

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};
