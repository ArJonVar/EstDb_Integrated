import RenderWorld from "./features/testfiles/RenderWorld";
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
      <h1>Hello World!</h1>
      <RenderWorld />
    </React.StrictMode>,
    document.getElementById('app')
);
