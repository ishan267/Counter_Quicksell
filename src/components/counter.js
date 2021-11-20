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
            if(data!=null)
                setCurrentValue(data);
        })
        .catch(err => console.log('Error occured is', err));
    }

    useEffect(()=>{
        //fetchCounter();
    },[])

    async function handleChange(newValue) {
        if (newValue > maxValue)
            return;
        setIsLoading(true);
        setTimeout(() => {
            setCurrentValue(Number(newValue));
            setIsLoading(false);
        }, 2000)
    
        // try {
        //     // const response =  await fetch(
        //     //     `${baseUrl}/counter`,
        //     //     {
        //     //       method: 'PUT',
        //     //       headers: {
        //     //         'Content-Type': 'application/json'
        //     //       },
        //     //       body: JSON.stringify({
        //     //         counter:newValue
        //     //       })
        //     //     }
        //     //   );
        //     //   if (!response.ok) {
        //     //     throw new Error('Something went wrong!');
        //     //   }
        //     //   const resData = await response.json();
        //     //   console.log("response received for chatrooms",resData);

        // }
        // catch (e) {
        //     alert(e);
        // }
    }

    return (
        <>
            <div class="inputContainer">
                <div>
                    <div class="label">
                        <label>Start Value</label>
                    </div>
                    <div class="input">
                        <input type="number" style={{ border: 'none' }} value={startValue} onChange={(e) => setStartValue(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div class="label">
                        <label>Max Value</label>
                    </div>
                    <div class="input">
                        <input type="number" style={{ border: 'none' }} value={maxValue} onChange={(e) => setMaxValue(e.target.value)} placeholder="Enter" />
                    </div>
                </div>
                <div class="buttonContainer">
                    <button class="button" onClick={() => handleChange(startValue)}>Save</button>
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
                        <div style={{ width: '30px', height: '30px' }}></div>
                    }
                </div>
                <div class='row'>
                    <div class='column1' onClick={() => handleChange(Number(currentValue) - 1)}>-</div>
                    <div class='column2'>
                        <input value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)} class="counterInput"></input>
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