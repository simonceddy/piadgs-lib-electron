import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Toolbar from '../../components/Toolbar';
import {
  CreateIcon,
  ListIcon,
  SearchIcon
} from '../../shared/components/Icons';
import { AppletLayout } from '../../shared/components/Layout';
import AllSubjects from './AllSubjects';
import Modal from '../../shared/components/Modal';
import Subject from './Subject';
import SearchSubjects from './SearchSubjects';
import CreateSubject from './CreateSubject';
import { clearMessage } from '../../store/actions';
import Messages from '../../components/Messages';

const toolbarItems = [
  [
    {
      key: 'createSubject',
      Icon: CreateIcon,
      to: '/subjects/create',
      exact: true
    },
  ],
  [
    {
      key: 'listSubjects',
      Icon: ListIcon,
      to: '/subjects',
      exact: true
    },
    {
      key: 'searchSubjects',
      Icon: SearchIcon,
      to: '/subjects/search',
      exact: true
    },
  ]
];

function Subjects({ messages, clearMessages }) {
  const [subjectModal, setSubjectModal] = useState(false);
  console.log(messages);
  const onClose = () => setSubjectModal(false);

  const SubjectModal = useMemo(() => (!subjectModal ? null : (
    <Modal onClose={onClose}>
      <Subject onClose={onClose} id={subjectModal.id} />
    </Modal>
  )), [subjectModal]);
  return (
    <AppletLayout>
      {SubjectModal}
      <Toolbar items={toolbarItems}>
        <Messages message={messages} clearMessage={clearMessages} />
      </Toolbar>
      <Switch>
        <Route
          path="/subjects"
          exact
          render={() => (
            <AllSubjects onRowClick={(subject) => setSubjectModal(subject)} />
          )}
        />
        <Route
          path="/subjects/search"
          exact
          render={() => (
            <SearchSubjects onRowClick={(subject) => setSubjectModal(subject)} />
          )}
        />
        <Route
          path="/subjects/create"
          exact
          render={() => (
            <CreateSubject />
          )}
        />
      </Switch>
    </AppletLayout>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages.subjects
});

const mapDispatchToProps = (dispatch) => ({
  clearMessages: () => dispatch(clearMessage('subjects'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
