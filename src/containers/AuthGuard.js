import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthGuard({ render = () => null, loggedIn }) {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return render();
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(withRouter(AuthGuard));
