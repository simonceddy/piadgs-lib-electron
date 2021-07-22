import { Route } from 'react-router-dom';
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
import Results from './containers/Search/Results';
// import useQuery from '../hooks/useQuery';
import { logOutUser } from './store/actions';
import AuthGuard from './containers/AuthGuard';
import { FlexCol, FlexRow } from './shared/components/Flex';
// import Subjects from './containers/Subjects';
import Authors from './containers/Authors';
import Titles from './containers/Titles';
import ManageSubjects from './containers/Subjects/ManageSubjects';
// import TestApp from './TestApp';

function App({ loggedIn = false, logOut, themeMode }) {
  // console.log(useQuery());
  return (
    <ThemeProvider theme={{ mode: themeMode }}>
      {/* <div className="absolute bg-black z-50">
        <TestApp />
      </div> */}
      <Layout
        Links={() => (
          <FlexRow className="w-full justify-between items-center">
            <FlexRow className="justify-between w-1/2 m-2">
              <NavbarSpace>
                <NavbarLink to="/searchForm" exact>Search</NavbarLink>
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
          <Route
            path="/search"
            render={() => (<Results />)}
          />
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
                  <Authors />
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
  logOut: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
