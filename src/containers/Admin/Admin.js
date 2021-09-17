import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import Dashboard from './Dashboard';

const baseUri = '/admin';

function Admin() {
  return (
    <AdminLayout>
      <Switch>
        <Route
          path={baseUri}
          exact
          component={Dashboard}
        />
      </Switch>

    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Admin);
