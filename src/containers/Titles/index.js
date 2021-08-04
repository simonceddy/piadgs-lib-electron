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
import AllTitles from './AllTitles';
import SearchTitles from './SearchTitles';
import TitleForm from '../Forms/TitleForm';
import WorksToDb from '../WorksToDb';

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
      to: '/titles/fromWorks',
      exact: true
    },
  ]
];

function Titles() {
  return (
    <FlexCol className="w-full h-full justify-start items-center">
      <Toolbar items={toolbarItems} />
      <Switch>
        <Route
          path="/titles"
          exact
          render={() => (
            <AllTitles />
          )}
        />
        <Route
          path="/titles/create"
          exact
          render={() => (
            <TitleForm />
          )}
        />
        <Route
          path="/titles/search"
          exact
          render={() => (
            <SearchTitles />
          )}
        />
        <Route
          path="/titles/fromWorks"
          exact
          render={() => (
            <WorksToDb />
          )}
        />
      </Switch>
    </FlexCol>
  );
}

export default connect()(Titles);
