import { SecondaryFlexBox } from '../../shared/components/Styled';

function AdminWidget({ children, className }) {
  return (
    <SecondaryFlexBox
      className={`flex-col rounded-md border-2 p-2 m-2 justify-between items-center ${className}`}
    >
      {children}
    </SecondaryFlexBox>
  );
}

export default AdminWidget;
