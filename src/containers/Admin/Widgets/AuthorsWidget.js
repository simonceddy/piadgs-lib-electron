import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FlexRow } from '../../../shared/components/Flex';

function AuthorsWidget() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!amount) {
      axios.get('/authors/count')
        .then((res) => setAmount(res.data.amount))
        .catch((err) => console.log(err));
    }
  }, [amount]);

  return (
    <FlexRow className="p-1 w-full justify-between items-center">
      {amount ? `From ${amount} total authors` : '...'}
      <NavLink to="/admin/authors" exact>View Authors</NavLink>
    </FlexRow>
  );
}

export default connect()(AuthorsWidget);
