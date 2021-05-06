import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import InputField from '../shared/components/Forms/InputField';
import LgFormButton from '../shared/components/Forms/LgFormButton';
import {
  setPasswordValue,
  setUsernameValue,
  attemptLogin
} from '../store/actions';

function Login({
  username,
  password,
  setPassword,
  setUsername,
  loggingIn = false,
  logIn,
  loggedIn = false,
  history,
  errors = []
}) {
  useEffect(() => {
    if (loggedIn) {
      return history.push('/admin');
    }
    return null;
  }, [loggedIn]);

  if (loggingIn) {
    return <div>Attempting login</div>;
  }

  return (
    <>
      {errors.length > 0 ? (
        <div>
          {errors.map((error, key) => (
            <div key={key}>{error}</div>
          ))}
        </div>
      ) : null}
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          logIn({
            username,
            password
          });
        }}
        className="flex flex-col justify-center items-center p-4 rounded-md border-2"
      >
        <InputField
          value={username}
          label="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          value={password}
          type="password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row justify-around items-center p-2">
          <LgFormButton
            type="submit"
            className="border-blue-800 bg-green-200 hover:bg-yellow-200 active:bg-blue-200 text-blue-800 active:text-green-800 active:border-green-800"
          >
            Login
          </LgFormButton>
        </div>
      </LoginForm>
    </>
  );
}

const mapStateToProps = (state) => ({
  username: state.login.username,
  password: state.login.password,
  loggingIn: state.login.loggingIn,
  loggedIn: state.auth.loggedIn,
  errors: state.login.errors
});

const mapDispatchToProps = (dispatch) => ({
  setPassword: (password) => dispatch(setPasswordValue(password)),
  setUsername: (username) => dispatch(setUsernameValue(username)),
  logIn: ({ username, password }) => dispatch(attemptLogin({
    username, password
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
