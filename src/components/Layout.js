import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {

    const [currency, setCurrency] = useState([]);
    const [exchangeValue, setExchangeValue] = useState();
    const [fromValueInfo, setFromValueInfo] = useState();
    const [toValueInfo, setToValueInfo] = useState();
    const [fromValue, setFromValue] = useState();
    const [currencySelected, setCurrencySelected] = useState();
    const [from, setFrom] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [inputValue, setInputValue] = useState();
    const [currencyData, setCurrencyData] = useState([])



    useEffect(() => {
        axios.get(`https://api.vatcomply.com/rates?base=${from}`)
            .then(res => {
                setCurrency(res.data.rates[toCurrency]);
                setFromValue(res.data.rates[from]);

            })
    }, [from]);

    useEffect(() => {
        axios.get(`https://api.vatcomply.com/currencies`)
            .then(res => {
                setCurrencyData(Object.getOwnPropertyNames(res.data).sort());
            })
        setCurrencyChange()
    }, [])

    useEffect(() => {
        let defaultValue = "1.00";
        setInputValue(defaultValue);
        convert();

    }, [currency])

    console.log(currencyData)

    function convert() {
        var rate = currency;
        setExchangeValue(inputValue * rate)
        setFromValueInfo(rate);
        setToValueInfo(fromValue / rate);
    }

    const getData = (val) => {
        setInputValue(val.target.value);
        console.log(inputValue)
        setExchangeValue(inputValue * currency)

    }
    const setCurrencyChange = () => {

    }
    const handleSelector = (event) => {
        setCurrencySelected(event.target.value)
    }


    return (
        <div className='w-100 d-flex justify-content-center mt-5'>
            <div className="card w-75">
                <div className="card-body">
                    <div className="row">
                        <div className='col'>
                            <div className='row'>
                                <div className='col mb-3'>
                                    <label for="formGroupExampleInput" className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="1,00" onChange={getData} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div>
                                        <select class="form-select" aria-label="Default select example">
                                            {currencyData && currencyData.length ?
                                                currencyData.map((p, index) => (
                                                    <option key={index} value={p}>{p}</option>
                                                )) : null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h3 className='text-secondary'>{inputValue} =</h3>
                            <div className="row">
                                <div className='col'>
                                    <h3>{exchangeValue} EUR</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col'>
                                    <h5>1 USD = {fromValueInfo}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col'>
                                    <h5 className=''>1 EUR = {toValueInfo}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;