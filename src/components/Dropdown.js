import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function Dropdown() {
    const [currencyData, setCurrencyData] = useState("")
    const [currencySelector, setCurrencySelector] = useState("")


    useEffect(() => {
        axios.get(`https://api.vatcomply.com/currencies`)
            .then(res => {
                setCurrencyData(res.data);
            })
    }, [])

    function handleSelect(event) {
        setCurrencySelector(event.target.value)

    }
    console.log("currency selected", currencySelector)
    const options = ["USD", "EUR", "CAD"];
    return (
        <div>
            <select class="form-select" onChange={handleSelect} aria-label="Default select example">
                {options && options.length ?
                    options.map((p, index) => (
                        <option key={index} value={p}>{p}</option>
                    )) : null}
            </select>
        </div>
    )

}

export default Dropdown;