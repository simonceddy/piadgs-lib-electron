import OuterContainer from './OuterContainer';
import MainContentContainer from './MainContentContainer';
import Header from './Header';

function Layout({ children, Links }) {
  return (
    <OuterContainer>
      <Header />
      {Links ? <Links /> : null}
      <MainContentContainer>
        {children}
      </MainContentContainer>
    </OuterContainer>
  );
}

export default Layout;
