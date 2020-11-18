import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Locate from './Locate';
import { useState } from 'react';

function App() {
  const [miles, setMiles] = useState(1);

  const handleChange = (e) => {
    setMiles(e.target.value);
  };
  return (
    <div className="App container">
      <h1>
        Find me a tennis court within{' '}
        <span>
          <select value={miles} onChange={handleChange} name="miles" id="miles">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </span>{' '}
        miles
      </h1>
      <Locate miles={miles} />
    </div>
  );
}

export default App;
