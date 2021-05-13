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

function Subjects() {
  const [subjectModal, setSubjectModal] = useState(false);

  const onClose = () => setSubjectModal(false);

  const SubjectModal = useMemo(() => (!subjectModal ? null : (
    <Modal onClose={onClose}>
      <Subject onClose={onClose} id={subjectModal.id} />
    </Modal>
  )), [subjectModal]);
  return (
    <AppletLayout>
      {SubjectModal}
      <Toolbar items={toolbarItems} />
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
      </Switch>
    </AppletLayout>
  );
}

export default connect()(Subjects);
