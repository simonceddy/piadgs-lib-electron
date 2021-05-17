import { useMemo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppletLayout } from '../../shared/components/Layout';
import Author from './Author';
import SearchAuthors from './SearchAuthors';
import Modal from '../../shared/components/Modal';
import {
  CreateIcon,
  ListIcon,
  SearchIcon
} from '../../shared/components/Icons';
import Toolbar from '../../components/Toolbar';
import AllAuthors from './AllAuthors';
import CreateAuthor from './CreateAuthor';

const toolbarItems = [
  [{
    key: 'createAuthor', Icon: CreateIcon, to: '/authors/create', exact: true
  }],
  [
    {
      key: 'listAuthors', Icon: ListIcon, to: '/authors', exact: true
    },
    {
      key: 'searchAuthors', Icon: SearchIcon, to: '/authors/search', exact: true
    },
  ]
];

function Authors() {
  const [authorModalId, setAuthorModalId] = useState(false);

  const onClose = () => setAuthorModalId(false);

  const AuthorModal = useMemo(() => (!authorModalId ? null : (
    <Modal onClose={onClose}>
      <Author onClose={onClose} id={authorModalId} />
    </Modal>
  )), [authorModalId]);

  return (
    <AppletLayout>
      {AuthorModal}
      <Toolbar items={toolbarItems} />
      <Switch>
        <Route
          path="/authors"
          exact
          render={() => (
            <AllAuthors onRowClick={(author) => setAuthorModalId(author.id)} />
          )}
        />
        <Route
          path="/authors/search"
          exact
          render={() => (
            <SearchAuthors onRowClick={(author) => setAuthorModalId(author.id)} />
          )}
        />
        <Route
          path="/authors/create"
          exact
          render={() => (
            <CreateAuthor />
          )}
        />
      </Switch>
    </AppletLayout>
  );
}

export default connect()(Authors);
