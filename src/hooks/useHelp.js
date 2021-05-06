import { useState } from 'react';
import Help from '../components/Help';

export function useHelp(topic = '') {
  const [visible, setVisible] = useState(false);

  const showHelp = () => setVisible(true);

  const closeHelp = () => setVisible(false);

  const HelpComponent = () => <Help topic={topic} />;

  return {
    visible,
    showHelp,
    closeHelp,
    HelpComponent
  };
}
