import Products from './Products';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  //create a DOM element to render the component into
  const div = document.createElement('div');

  // render component, if something is wrong, it will fail here
  ReactDOM.render(<Products />, div);

  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});