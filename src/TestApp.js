/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
// import { getSubjects } from './message-control/controllers';

// import sendAsync from './message-control/renderer';
import TitlesSubForm from './containers/Titles/TitlesSubForm';
import { getTitles } from './message-control/controllers';

function TestApp() {
  const [titles, setTitles] = useState([]);

  // function send() {
  //   getSubjects().then((result) => setResponse(result));
  // }

  useEffect(() => {
    if (titles.length < 1) {
      getTitles(13, 15, 'title', 'ASC')
        .then((res) => setTitles(res));
    }
  }, []);

  return (
    <div className="App w-full h-full bg-black text-green-300">
      <TitlesSubForm titles={titles} />
    </div>
  );
}

export default TestApp;
