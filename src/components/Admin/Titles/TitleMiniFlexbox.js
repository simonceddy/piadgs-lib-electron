import styled from 'styled-components';
import { FlexCol } from '../../../shared/components/Flex';
import { getColourMap } from '../../../shared/themes';

const {
  secondary,
  tertiary
} = getColourMap();

const StyledFlexbox = styled(FlexCol)`
  background-color: ${secondary};
  flex: 1 1 16rem;

  @media (min-width: 1024px) {
    & {
      flex: 1 1 19rem;
    }
  }

  @media (min-width: 1280px) {
    & {
      flex: 1 1 22rem;
    }
  }

  &:hover {
    background-color: ${tertiary};
  }
`;

function TitleMiniFlexbox({ children }) {
  return (
    <StyledFlexbox className="m-2 xl:m-2 py-2 px-1 text-sm justify-start items-start rounded-md">
      {children}
    </StyledFlexbox>
  );
}

export default TitleMiniFlexbox;
