import { useState } from 'react';
import { InfoButton, ToolbarButton } from '../../shared/components/Buttons';
import { getHelpFor } from '../../shared/help';

function Help({ topic = '' }) {
  const [visible, setVisible] = useState(false);
  const data = getHelpFor(topic);
  return (
    <>
      <ToolbarButton
        onClick={() => setVisible(!visible)}
        Button={InfoButton}
      >
        ?
      </ToolbarButton>
      <div className="absolute">
        {visible ? data : null}
      </div>
    </>
  );
}

export default Help;
