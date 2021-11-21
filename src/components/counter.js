import React, { useEffect, useState } from "react";
import baseUrl from "../helper/baseUrl";
import CounterValue from "./counterValue";


function Counter() {
    const [currentValue, setCurrentValue] = useState(1);
    const [startValue, setStartValue] = useState(1);
    const [maxValue, setMaxValue] = useState(1000);
    const [isLoading, setIsLoading] = useState(false);

    function fetchCounter()
    {
        fetch(`${baseUrl}/counter`)
        .then(response => response.json())
        .then(data =>{
            console.log("resonse received is",data);
            if(data.counter!=null)
                setCurrentValue(data.counter);
        })
        .catch(err => console.log('Error occured is', err));
    }

    useEffect(()=>{
        fetchCounter();
    },[])

    async function handleChange(newValue) {
        console.log("put api called");
        if (newValue > maxValue)
            return;
        setIsLoading(true);
        fetch(`${baseUrl}/counter`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counter: newValue
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log("resonse received is",data.msg);
            setCurrentValue(Number(newValue));
            setIsLoading(false);
        })
        .catch(err => console.log('Error occured is', err));
    }

    function handleStartInputChange(e)
    {
        if(Number(e.target.value)<=Number(maxValue))
            setStartValue(e.target.value);
    }

    function handleStartInputBlur(e)
    {
        if(Number(e.target.value)<=Number(maxValue) && Number(currentValue)!=Number(e.target.value))
            handleChange(e.target.value);
    }

    function handleCurrentInputChange(e)
    {
        console.log("current value changed",e.target.value);
        if(Number(e.target.value)<=Number(maxValue))
            setCurrentValue(e.target.value);
    }

    function handleCurrentInputBlur(e)
    {
        if(Number(e.target.value)<=Number(maxValue))
            handleChange(e.target.value);
    }

    return (
        <>
            <div class="inputContainer">
                <div>
                    <div class="label">
                        <label>Start Value</label>
                    </div>
                    <div class="input">
                        <input type="number" class="inputValue" value={startValue} onChange={handleStartInputChange} onBlur={handleStartInputBlur} />
                    </div>
                </div>
                <div>
                    <div class="label">
                        <label>Max Value</label>
                    </div>
                    <div class="input">
                        <input type="number" class="inputValue" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} placeholder="Enter" />
                    </div>
                </div>
                
            </div>
            <div class="counterContainer">
                <div class="loadingContainer">
                    {isLoading ?
                        <>
                            <div class="loader"></div>
                            <div style={{ marginLeft: '15px' }}>Saving Counter Value</div>
                        </>
                        :
                        <div style={{ width: '26px', height: '26px' }}></div>
                    }
                </div>
                <div class='row'>
                    <div class='column1' onClick={() => handleChange(Number(currentValue) - 1)}>-</div>
                    <div class='column2'>
                        <input class="counterInput" value={currentValue} onChange={handleCurrentInputChange} onBlur={handleCurrentInputBlur}></input>
                    </div>
                    <div class='column3' onClick={() => handleChange(Number(currentValue) + 1)}>+</div>
                </div>
                <div class="valueContainer">
                    <CounterValue counter={currentValue} />
                </div>
            </div>
        </>

    )
}

export default Counter;