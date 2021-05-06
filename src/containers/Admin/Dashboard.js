import { connect } from 'react-redux';
import AdminWidget from '../../components/Admin/AdminWidget';
import { FlexRow } from '../../shared/components/Flex';
import AuthorsWidget from './Widgets/AuthorsWidget';
import SubjectsWidget from './Widgets/SubjectsWidget';
import TitlesWidget from './Widgets/TitlesWidget';

function Dashboard({ user = {} }) {
  return (
    <div className="w-full flex-1 flex flex-col justify-start items-center">
      <AdminWidget className="md:w-2/3 w-full p-1">
        <FlexRow className="w-full p-1">
          Welcome {user.username}!
        </FlexRow>
      </AdminWidget>
      <AdminWidget className="md:w-2/3 w-full p-1">
        <TitlesWidget />
        <AuthorsWidget />
        <SubjectsWidget />
      </AdminWidget>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
