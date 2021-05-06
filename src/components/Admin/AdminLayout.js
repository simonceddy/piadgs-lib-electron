import { FlexCol } from '../../shared/components/Flex';

function AdminLayout({ children }) {
  return (
    <FlexCol className="w-full flex-1 p-2 justify-center items-center">
      {children}
    </FlexCol>
  );
}

export default AdminLayout;
