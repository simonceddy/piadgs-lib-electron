import { SecondaryFlexBox } from '../../../shared/components/Styled';

function CreateMenu({ children }) {
  return (
    <SecondaryFlexBox className="absolute top-3 left-0 border block w-32">
      <ul className="flex flex-col justify-start items-start">
        {children}
      </ul>
    </SecondaryFlexBox>
  );
}

export default CreateMenu;
