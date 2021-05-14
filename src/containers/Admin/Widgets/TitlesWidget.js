import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { countTitles } from '../../../message-control/controllers';
import { FlexRow } from '../../../shared/components/Flex';

function TitlesWidget() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!amount) {
      countTitles()
        .then((res) => setAmount(res))
        .catch((err) => console.log(err));
    }
  }, [amount]);

  return (
    <FlexRow className="p-1 w-full justify-between items-center">
      {amount ? `${amount} total titles in database` : '...'}
      <NavLink to="/titles" exact>View Titles</NavLink>
    </FlexRow>
  );
}

export default TitlesWidget;
