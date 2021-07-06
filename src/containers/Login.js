import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import InputField from '../shared/components/Forms/InputField';
import LgFormButton from '../shared/components/Forms/LgFormButton';
import {
  attemptLogin
} from '../store/actions';

function Login({
  loggingIn = false,
  logIn,
  loggedIn = false,
  history,
  errors = []
}) {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

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
          logIn(values);
        }}
        className="flex flex-col justify-center items-center p-4 rounded-md border-2"
      >
        <InputField
          value={values.username}
          label="Username"
          name="username"
          onChange={(e) => setValues({ ...values, username: e.target.value })}
        />
        <InputField
          value={values.password}
          type="password"
          label="Password"
          name="password"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
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
  loggingIn: state.login.loggingIn,
  loggedIn: state.auth.loggedIn,
  errors: state.login.errors
});

const mapDispatchToProps = (dispatch) => ({
  logIn: ({ username, password }) => dispatch(attemptLogin({
    username, password
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
