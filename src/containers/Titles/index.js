import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { FlexCol } from '../../shared/components/Flex';
import AllTitles from './AllTitles';
import TitleForm from '../Forms/TitleForm';
import WorksToDb from '../WorksToDb';
import Title from './Title';

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
        <Route
          path="/titles/edit/:id"
          exact
          render={({ match }) => (
            <Title
              titleId={match.params.id || null}
            />
          )}
        />
      </Switch>
    </FlexCol>
  );
}

export default connect()(Titles);
