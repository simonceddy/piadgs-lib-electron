import { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Toolbar from '../../components/Toolbar';
import {
  CreateIcon,
  ListIcon,
  PasteFromWorksIcon,
  SearchIcon
} from '../../shared/components/Icons';
import { FlexCol } from '../../shared/components/Flex';
import Modal from '../../shared/components/Modal';
import Title from './Title';
import AllTitles from './AllTitles';
import CreateTitle from './CreateTitle';
import SearchTitles from './SearchTitles';

const toolbarItems = [
  [
    {
      key: 'createTitle',
      Icon: CreateIcon,
      to: '/titles/create',
      exact: true
    },
  ],
  [
    {
      key: 'listAllTitles',
      Icon: ListIcon,
      to: '/titles',
      exact: true
    },
    {
      key: 'searchTitles',
      Icon: SearchIcon,
      to: '/titles/search',
      exact: true
    },
  ],
  [
    {
      key: 'pasteFromWorks',
      Icon: PasteFromWorksIcon,
      to: '/titles/search',
      exact: true
    },
  ]
];

function Titles() {
  const [titleModal, setTitleModal] = useState(false);

  const onClose = () => setTitleModal(false);

  const TitleModal = () => (!titleModal ? null : (
    <Modal onClose={onClose}>
      <Title onClose={onClose} title={titleModal} />
    </Modal>
  ));

  return (
    <FlexCol className="w-full h-full justify-start items-center">
      <TitleModal />
      <Toolbar items={toolbarItems} />
      <Switch>
        <Route
          path="/titles"
          exact
          render={() => (
            <AllTitles onRowClick={(title) => setTitleModal(title)} />
          )}
        />
        <Route
          path="/titles/create"
          exact
          render={() => (
            <CreateTitle onRowClick={(title) => setTitleModal(title)} />
          )}
        />
        <Route
          path="/titles/search"
          exact
          render={() => (
            <SearchTitles onRowClick={(title) => setTitleModal(title)} />
          )}
        />
      </Switch>
    </FlexCol>
  );
}

export default connect()(Titles);
