import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [data, setData] = useState(null)
  function getData(val) {
    setData(val.target.value);
    console.log(val.target.value);
  }
  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className='col'>
              <label for="formGroupExampleInput" className="form-label">Amount</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="1,00" onChange={getData} />
            </div>
            <div className='col'>
              <h2>{data} EURO =</h2>
              <div className="row">
                <div className='col'>
                  <h1>1.3550 Canadian Dollar</h1>
                </div>
              </div>
            </div>
          </div>

        </div >
      </div>
    </div>
  );
}

export default App;
