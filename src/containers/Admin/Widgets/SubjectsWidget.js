import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { AdminWidget } from '../../../components/Admin';
import { FlexRow } from '../../../shared/components/Flex';

function SubjectsWidget() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!amount) {
      axios.get('/subjects/count')
        .then((res) => setAmount(res.data.amount))
        .catch((err) => console.log(err));
    }
  }, [amount]);

  return (
    <FlexRow className="p-1 w-full justify-between items-center">
      {amount ? `Covering ${amount} total subjects` : '...'}
      <NavLink to="/admin/subjects" exact>View subjects</NavLink>
    </FlexRow>
  );
}

export default SubjectsWidget;
