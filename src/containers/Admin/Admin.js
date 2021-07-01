import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import Dashboard from './Dashboard';
import CreateTitle from './CreateTitle';
import ViewAuthors from './ViewAuthors';
import ViewSubjects from './ViewSubjects';
import ViewTitle from '../../components/Admin/ViewTitle';
import ViewAuthor from '../../components/Admin/ViewAuthor';
import ViewSubject from '../../components/Admin/ViewSubject';
import EditTitle from './EditTitle';
import CreateAuthor from './CreateAuthor';
import CreateSubject from './CreateSubject';

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
        <Route path={`${baseUri}/title/create`} exact component={CreateTitle} />
        <Route path={`${baseUri}/author/create`} exact component={CreateAuthor} />
        <Route path={`${baseUri}/subject/create`} exact component={CreateSubject} />
        <Route
          path={`${baseUri}/subject/:id`}
          exact
          component={ViewSubject}
        />
        <Route
          path={`${baseUri}/title/edit/:id`}
          exact
          component={EditTitle}
        />
        <Route
          path={`${baseUri}/author/:id`}
          exact
          component={ViewAuthor}
        />
        <Route path={`${baseUri}/subjects`} exact component={ViewSubjects} />
        <Route path={`${baseUri}/authors`} exact component={ViewAuthors} />
        <Route
          path={`${baseUri}/title/:id`}
          exact
          component={ViewTitle}
        />
      </Switch>

    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Admin);
