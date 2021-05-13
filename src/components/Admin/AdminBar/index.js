import styled from 'styled-components';
import theme from 'styled-theming';
import {
  GoDashboard as DashIcon,
  ImBooks as TitlesIcon,
  IoCreate as CreateIcon,
  BiBook as AddTitleIcon,
  BsPerson as AddAuthorIcon,
  MdSubject as AddSubjectIcon,
  FaPaste as PasteFromWorksIcon,
  BsPen as AuthorsIcon,
  MdInfo as SubjectsIcon
} from 'react-icons/all';
import { useState } from 'react';
import { FlexRow } from '../../../shared/components/Flex';
import { NavbarLink } from '../../Layout';
import { colourMaps } from '../../../shared/themes';
import CreateMenu from './CreateMenu';

const secondary = theme('mode', colourMaps.secondary);

const StyledAdminBar = styled(FlexRow)`
  background-color: ${secondary};
`;

const LinkLabel = ({ children }) => (
  <span className="ml-2">
    {children}
  </span>
);

const NavbarButton = ({
  children,
  onClick,
  className = '',
  onMouseLeave,
  onMouseEnter
}) => (
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`flex flex-row justify-between items-center p-2 no-underline hover:underline m-2 ${className}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

function AdminBar({ children }) {
  const [toggleCreateMenu, setToggleCreateMenu] = useState(false);

  return (
    <StyledAdminBar className="flex-1 justify-around items-center rounded-md m-2">
      <NavbarLink className="" to="/admin" exact>
        <DashIcon size={26} />
        <LinkLabel>Admin</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/authors" exact>
        <AuthorsIcon size={26} />
        <LinkLabel>Authors</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/subjects" exact>
        <SubjectsIcon size={26} />
        <LinkLabel>Subjects</LinkLabel>
      </NavbarLink>
      <NavbarLink className="" to="/titles" exact>
        <TitlesIcon size={26} /><LinkLabel>Titles</LinkLabel>
      </NavbarLink>
      <NavbarButton
        className=""
        onMouseEnter={() => setToggleCreateMenu(true)}
        onMouseLeave={() => setToggleCreateMenu(false)}
      >
        <div className="relative w-0 h-0">
          {toggleCreateMenu ? (
            <>
              <CreateMenu>
                <NavbarLink className="" exact to="/admin/title/create">
                  <AddTitleIcon size={26} />
                  <LinkLabel>
                    Add Title
                  </LinkLabel>
                </NavbarLink>
                <NavbarLink className="" exact to="/admin/author/create">
                  <AddAuthorIcon size={26} />
                  <LinkLabel>
                    Add Authors
                  </LinkLabel>
                </NavbarLink>
                <NavbarLink className="" exact to="/admin/subject/create">
                  <AddSubjectIcon size={26} />
                  <LinkLabel>
                    Add Subjects
                  </LinkLabel>
                </NavbarLink>
                <NavbarLink className="" exact to="/admin/pasteFromWorks">
                  <PasteFromWorksIcon size={26} />
                  <LinkLabel>
                    Paste From Works
                  </LinkLabel>
                </NavbarLink>
              </CreateMenu>
            </>
          ) : null}
        </div>
        <CreateIcon size={26} />
        <LinkLabel>
          Create
          <span>{toggleCreateMenu ? '▲' : '▼'}</span>
        </LinkLabel>
      </NavbarButton>
      {children}
    </StyledAdminBar>
  );
}

export default AdminBar;
