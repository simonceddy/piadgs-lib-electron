import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { AdminWidget } from '../../../components/Admin';
import { FlexRow } from '../../../shared/components/Flex';

function TitlesWidget() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!amount) {
      axios.get('/titles/count')
        .then((res) => setAmount(res.data.amount))
        .catch((err) => console.log(err));
    }
  }, [amount]);

  return (
    <FlexRow className="p-1 w-full justify-between items-center">
      {amount ? `${amount} total titles in database` : '...'}
      <NavLink to="/admin/titles" exact>View Titles</NavLink>
    </FlexRow>
  );
}

export default TitlesWidget;
