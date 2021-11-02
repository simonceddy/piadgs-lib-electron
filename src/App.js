import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  Layout,
  NavbarLink,
  NavbarSpace
} from './components/Layout';
import Search from './containers/Search';
import Login from './containers/Login';
import Admin from './containers/Admin/Admin';
import { AdminBar, LogoutButton } from './components/Admin';
// import Results from './containers/Search/Results';
import { logOutUser, setLibraryShowForm } from './store/actions';
import AuthGuard from './containers/AuthGuard';
import { FlexCol, FlexRow } from './shared/components/Flex';
import Titles from './containers/Titles';
import ManageSubjects from './containers/Subjects/ManageSubjects';
import ManageAuthors from './containers/Authors/ManageAuthors';
import NavbarButton from './components/Layout/NavbarButton';
import Subject from './containers/Subjects/Subject';
import Author from './containers/Authors/Author';

function App({
  loggedIn = false,
  logOut,
  themeMode,
  location,
  onClickSearchBtn,
}) {
  // console.log(location);
  return (
    <ThemeProvider theme={{ mode: themeMode }}>
      <Layout
        Links={() => (
          <FlexRow className="w-full justify-between items-center">
            <FlexRow className="justify-between w-1/2 m-2">
              <NavbarSpace>
                {location.pathname === '/searchForm' ? (
                  <NavbarButton onClick={onClickSearchBtn}>
                    Search
                  </NavbarButton>
                ) : (
                  <NavbarLink to="/searchForm" exact>Search</NavbarLink>
                )}
              </NavbarSpace>
            </FlexRow>
            {loggedIn
              ? (
                <AdminBar>
                  <LogoutButton logOut={logOut} />
                </AdminBar>
              )
              : <NavbarLink to="/login" exact>Login</NavbarLink>}
          </FlexRow>
        )}
      >
        <FlexCol className="w-full flex-1 justify-center items-center">
          <Route path="/" exact component={Search} />
          <Route path="/searchForm" exact component={Search} />
          <Route path="/login" exact component={Login} />
          {/* <Route
            path="/search"
            render={() => (<Results />)}
          /> */}
          <Route
            path="/admin"
            render={() => (
              <AuthGuard
                render={() => (
                  <Admin />
                )}
              />
            )}
          />
          <Route
            path="/subjects"
            render={() => (
              <AuthGuard
                render={() => (
                  <>
                    <ManageSubjects />
                    {/* <Subjects /> */}
                  </>
                )}
              />
            )}
          />
          <Route
            path="/subject/:id"
            render={() => (
              <AuthGuard
                render={() => (<Subject />)}
              />
            )}
          />
          <Route
            path="/author/:id"
            render={() => (
              <AuthGuard
                render={() => (<Author />)}
              />
            )}
          />
          <Route
            path="/titles"
            render={() => (
              <AuthGuard
                render={() => (
                  <Titles />
                )}
              />
            )}
          />
          <Route
            path="/authors"
            render={() => (
              <AuthGuard
                render={() => (
                  // <Authors />
                  <ManageAuthors />
                )}
              />
            )}
          />
        </FlexCol>
        {/*  */}
      </Layout>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  themeMode: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutUser()),
  onClickSearchBtn: () => dispatch(setLibraryShowForm(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
