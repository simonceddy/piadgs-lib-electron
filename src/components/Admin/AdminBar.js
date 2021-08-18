import styled from 'styled-components';
import theme from 'styled-theming';
import {
  GoDashboard as DashIcon,
  ImBooks as TitlesIcon,
  // IoCreate as CreateIcon,
  // BiBook as AddTitleIcon,
  // BsPerson as AddAuthorIcon,
  // MdSubject as AddSubjectIcon,
  // FaPaste as PasteFromWorksIcon,
  BsPen as AuthorsIcon,
  MdInfo as SubjectsIcon
} from 'react-icons/all';
// import { useState } from 'react';
import { FlexRow } from '../../shared/components/Flex';
import { NavbarLink } from '../Layout';
import { colourMaps } from '../../shared/themes';
// import CreateMenu from './CreateMenu';

const secondary = theme('mode', colourMaps.secondary);

const StyledAdminBar = styled(FlexRow)`
  background-color: ${secondary};
`;

const LinkLabel = ({ children }) => (
  <span className="ml-2">
    {children}
  </span>
);

function AdminBar({ children }) {
  // const [toggleCreateMenu, setToggleCreateMenu] = useState(false);

  return (
    <StyledAdminBar className="flex-1 justify-around items-center rounded-md m-2">
      <NavbarLink className="" to="/admin" exact>
        <DashIcon size={26} />
        <LinkLabel>Dashboard</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/authors" exact>
        <AuthorsIcon size={26} />
        <LinkLabel>Authors</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/titles" exact>
        <TitlesIcon size={26} /><LinkLabel>Titles</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/subjects" exact>
        <SubjectsIcon size={26} />
        <LinkLabel>Subjects</LinkLabel>
      </NavbarLink>
      {children}
    </StyledAdminBar>
  );
}

export default AdminBar;
