import { useState } from 'react';
import { getSubjects } from './message-control/controllers';

// import sendAsync from './message-control/renderer';

function TestApp() {
  const [response, setResponse] = useState();

  function send() {
    getSubjects().then((result) => setResponse(result));
  }

  return (
    <div className="App w-full h-full bg-black text-green-300">
      <header className="App-header">
        <h1>
          Standalone application with Electron, React, and
          SQLite stack.
        </h1>
      </header>
      <article>
        <p>
          Say <i>ping</i> to the main process.
        </p>

        <button type="button" onClick={() => send()}>
          Send
        </button>
        <br />
        <p>Main process responses:</p>
        <br />
        <pre>
          {(response && JSON.stringify(response, null, 2))
            || 'No query results yet!'}
        </pre>
      </article>
    </div>
  );
}

export default TestApp;
