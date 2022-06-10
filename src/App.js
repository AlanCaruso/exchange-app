import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [currency, setCurrency] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [exchangeValue, setExchangeValue] = useState(null);

  useEffect(() => {
    axios.get("https://api.vatcomply.com/rates?base=USD")
      .then(res => {
        setCurrency(res.data.rates.EUR);
      })
      .catch(err => {
        console.log(err);
      })

  }, []);

  useEffect(() => {
    let defaultValue = "1.00";
    setInputValue(defaultValue);
    convert();
  }, [currency])



  console.log(exchangeValue)

  function getData(val) {
    setInputValue(val.target.value);
    convert()
  }

  function convert() {
    var rate = currency;
    setExchangeValue(inputValue * rate)
  }
  return (
    <div className="App">
      <div className='w-100 d-flex justify-content-center mt-5'>
        <div className="card w-75">
          <div className="card-body">
            <div className="row">
              <div className='col'>
                <label for="formGroupExampleInput" className="form-label">Amount</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="1,00" value={inputValue} onChange={getData} />
              </div>
              <div className='col'>
                <h3>{inputValue} USD =</h3>
                <div className="row">
                  <div className='col'>
                    <h2>{exchangeValue} EUR</h2>
                  </div>
                </div>
                <div className="row">
                  <div className='col'>
                    <h3 className=''>1 CA$ = </h3>
                  </div>
                </div>
                <div className="row">
                  <div className='col'>
                    <h3 className=''>1 EUR = </h3>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div>
      </div>
    </div>
  );
}

export default App;
