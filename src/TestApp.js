import { useState } from 'react';

import sendAsync from './message-control/renderer';

function TestApp() {
  const [message, setMessage] = useState('SELECT * FROM titles LIMIT 1');
  const [response, setResponse] = useState();

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }

  return (
    <div className="App w-full h-full dark:bg-black dark:text-green-300">
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
        <input
          className="dark:bg-black dark:text-green-300"
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="button" onClick={() => send(message)}>
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
