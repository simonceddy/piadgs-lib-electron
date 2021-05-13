import { FlexCol } from '../../shared/components/Flex';

function AdminLayout({ children }) {
  return (
    <FlexCol className="w-full flex-1 justify-start items-center">
      {children}
    </FlexCol>
  );
}

export default AdminLayout;
