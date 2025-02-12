import React, { useEffect, useState } from "react";
import DropDown from "../Components/DropDown";

function MainConverter() {
  const [curenciesNameData, setCurenciesNameData] = useState([]);
  const [errorCurNameData, setErrorCurNameData] = useState(null);
  const [date, setDate] = useState();
  const [fromCurrencyCode, setFromCurrencyCode] = useState("USD");
  const [toCurrencyCode, setToCurrencyCode] = useState("INR");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");

  const handleSwap = () => {
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const fromOnChangeHandler = (e) => {
    setFromAmount(e.target.value);
  };

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        const currencyCodes = Object.keys(data);
        setCurenciesNameData(currencyCodes);
      })
      .catch(() => setErrorCurNameData("Failed to fetch currency names"));
  }, []);

  useEffect(() => {
    if (fromCurrencyCode !== toCurrencyCode) {
      fetch(
        `https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrencyCode}&to=${toCurrencyCode}`
      )
        .then((res) => res.json())
        .then((data) => {
          const conversionRate = data.rates[toCurrencyCode];
          setToAmount(conversionRate);
          const [year, month, day] = data.date.split("-");
          setDate(`${day}-${month}-${year}`);
        })
        .catch(() => setErrorCurNameData("Failed to fetch exchange rate"));
    } else {
      setToAmount(fromAmount)
      alert("Both currencies cannot be the same! Please select a different currency.");
    }
  }, [fromCurrencyCode, toCurrencyCode, fromAmount]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="bg-gray-200 p-6 rounded-md shadow-md max-w-lg w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 bg-indigo-500 rounded-md shadow-md text-white p-2">
          Currency Converter
        </h2>
        <p className="text-sm font-semibold mb-4 text-gray-500">Date: {date}</p>

        <div className="flex gap-4 w-full justify-between">
          <div>From:</div>
        </div>
        <div className="flex gap-4 w-full mt-2">
          <input
            type="number"
            className="border rounded-md p-2 w-1/2"
            value={fromAmount}
            onChange={fromOnChangeHandler}
          />
          <DropDown
            options={curenciesNameData}
            // defaultValue="USD"
            onChange={setFromCurrencyCode}
            value={fromCurrencyCode}
          />
        </div>

        <button
          onClick={handleSwap}
          className="mx-2 mt-7 p-2 px-4 text-white rounded-full bg-indigo-500 hover:bg-indigo-800 shadow-md"
        >
          Swap
        </button>

        <div className="flex gap-4 w-full justify-between">To:</div>
        <div className="flex gap-4 w-full mt-2">
          <input type="text" className="border rounded-md p-2 w-1/2" value={toAmount} readOnly />
          <DropDown
            options={curenciesNameData}
            // defaultValue="INR"
            onChange={setToCurrencyCode}
            value={toCurrencyCode}
          />
        </div>
      </div>
    </div>
  );
}

export default MainConverter;
