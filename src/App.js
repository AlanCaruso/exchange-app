import React, { useState, useEffect } from 'react';
import axios, { Axios } from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [currency, setCurrency] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [exchangeValue, setExchangeValue] = useState();
  const [toValue, setToValue] = useState();
  const [fromValue, setFromValue] = useState();
  const [from, setFrom] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");


  useEffect(() => {
    axios.get(`https://api.vatcomply.com/rates?base=${from}`)
      .then(res => {
        setCurrency(res.data.rates[toCurrency]);

      })
  }, [from]);

  console.log(currency)

  useEffect(() => {
    let defaultValue = "1.00";
    setInputValue(defaultValue);
    convert();
  }, [currency])

  function getData(val) {
    setInputValue(val.target.value);
    setExchangeValue(inputValue * currency)
  }

  function convert() {
    var rate = currency;
    setExchangeValue(inputValue * rate)
    setToValue(rate)


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
                <h3 className='text-secondary'>{inputValue} USD =</h3>
                <div className="row">
                  <div className='col'>
                    <h3>{exchangeValue} EUR</h3>
                  </div>
                </div>
                <div className="row">
                  <div className='col'>
                    <h5>1 USD = {toValue}</h5>
                  </div>
                </div>
                <div className="row">
                  <div className='col'>
                    <h5 className=''>1 EUR = {fromValue}</h5>
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
