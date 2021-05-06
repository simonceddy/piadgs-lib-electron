import axios from 'axios';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FlexCol } from '../components/Flex';

function FetchModelData({
  match,
  history,
  uri,
  render = () => null
}) {
  const { id } = match.params;
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(async () => {
    if (!fetched) {
      axios.get(`${uri}${id}`)
        .then(async (res) => {
          // console.log('fetched');
          if (res.data.success) {
            setData(res.data.data);
          }
        })
        .then(() => setFetched(true))
        .catch((err) => console.log(err));
    }
  }, []);

  if (!fetched) {
    return <div>Fetching data...</div>;
  }

  return (
    <FlexCol className="flex-1 w-full justify-start items-center">
      <button type="button" onClick={() => history.goBack()}>Back</button>
      <>
        {render(data)}
      </>
    </FlexCol>
  );
}

export default withRouter(FetchModelData);
