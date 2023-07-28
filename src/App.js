import React from 'react';
import './App.css';
import {original,action,horror} from './urls'
import NavBar from './components/NavBar/NavBar';
import Banner from './components/NavBar/Banner/Banner';
import RowPoster from './components/NavBar/RowPoster/RowPoster';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPoster url={original} title='Netflix Originals'/>
      <RowPoster url={action} title='Action'isSmall/>
      <RowPoster url={horror} title='Horror'isSmall/>
    </div>
  );
}

export default App;
