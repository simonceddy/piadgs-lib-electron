import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { countSubjects } from '../../../message-control/controllers';
// import { AdminWidget } from '../../../components/Admin';
import { FlexRow } from '../../../shared/components/Flex';

function SubjectsWidget() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!amount) {
      countSubjects()
        .then((res) => setAmount(res))
        .catch((err) => console.log(err));
    }
  }, [amount]);

  return (
    <FlexRow className="p-1 w-full justify-between items-center">
      {amount ? `Covering ${amount} total subjects` : '...'}
      <NavLink to="/subjects" exact>View subjects</NavLink>
    </FlexRow>
  );
}

export default SubjectsWidget;
