import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import Toolbar from '../../components/Toolbar';
// import {
//   CreateIcon,
//   ListIcon,
//   PasteFromWorksIcon,
// } from '../../shared/components/Icons';
import { FlexCol } from '../../shared/components/Flex';
import AllTitles from './AllTitles';
import TitleForm from '../Forms/TitleForm';
import WorksToDb from '../WorksToDb';

// const toolbarItems = [
//   [
//     {
//       key: 'createTitle',
//       Icon: CreateIcon,
//       to: '/titles/create',
//       exact: true
//     },
//   ],
//   [
//     {
//       key: 'listAllTitles',
//       Icon: ListIcon,
//       to: '/titles',
//       exact: true
//     },
//   ],
//   [
//     {
//       key: 'pasteFromWorks',
//       Icon: PasteFromWorksIcon,
//       to: '/titles/fromWorks',
//       exact: true
//     },
//   ]
// ];

function Titles() {
  return (
    <FlexCol className="w-full h-full justify-start items-center">
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
