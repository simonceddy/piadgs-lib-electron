import {
  GiMoon as MoonIcon,
  GiSun as SunIcon
} from 'react-icons/gi';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeH1 } from '../../shared/components/Styled';
import { IconWrapper } from '../../shared/components/Util';
import { getColourMap } from '../../shared/themes';
import { setThemeMode } from '../../store/actions';

const {
  primary,
  background,
} = getColourMap();

const StyledThemeButton = styled.button`
  color: ${primary};
  background-color: ${background};

  &:hover {
    background-color: ${primary};
    color: ${background};
  }

  &:active {
    box-shadow: ${primary} 0px 0px 6px;
  }
`;

function Header({ setTheme, themeMode }) {
  return (
    <header className="w-full flex flex-row justify-between items-center p-1">
      <ThemeH1 className="font-bold text-4xl flex-1">PIADGS Library</ThemeH1>
      <div>
        <StyledThemeButton
          type="button"
          className="rounded-r-full p-1 flex flex-row justify-between items-center"
          onClick={() => setTheme(
            themeMode === 'defaultLight' ? 'defaultDark' : 'defaultLight'
          )}
        >
          <span className="font-bold mr-2">
            {themeMode === 'defaultLight' ? 'Light' : 'Dark'} Mode
          </span>
          <IconWrapper Icon={themeMode === 'defaultLight' ? SunIcon : MoonIcon} />
        </StyledThemeButton>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  themeMode: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
  setTheme: (mode) => dispatch(setThemeMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
