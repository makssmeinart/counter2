import React, {useEffect, useState} from 'react';
import {CounterSettings} from "./components/counterSettings/CounterSettings";
import {Counter} from "./components/counter/Counter";
import cl from "./app.module.css"

export type minMaxType = {
    min: number,
    max: number
}

export const App = () => {
    // UseState
    const [minMax, setMinMax] = useState<minMaxType>({max: 10, min: 0})
    const [counter, setCounter] = useState(minMax.min)


    ///// Counter Settings Store //////
    // Controlled MinMax inputs
    const changeMinValue = (value: number) => {
        setMinMax({...minMax, min: value})
    }
    const changeMaxValue = (value: number) => {
        setMinMax({...minMax, max: value})
    }
    // on button set set minMax values to localStorage
    const setMinMaxLocalStorage = () => {
        localStorage.setItem("minMaxCounterValue", JSON.stringify(minMax))
        setCounter(minMax.min)
    }
    // When load the page set minMax to localStorage if its not there
    useEffect(() => {
        if (localStorage.getItem("minMaxCounterValue") === null) {
            localStorage.setItem("minMaxCounterValue", JSON.stringify(minMax))
        }
        else {
            const data = localStorage.getItem("minMaxCounterValue")

            if(data) {
                setMinMax(JSON.parse(data))
                setCounter(JSON.parse(data).min)
            }

        }
    }, [])

    ///// Counter State /////
    const increaseCounterValue = () => {
        // Getting minMax from localStorage
        const minMax= localStorage.getItem("minMaxCounterValue")
        // Checking that it exists there
        if(minMax) {
            const minMaxValue = JSON.parse(minMax)

            if(counter < minMaxValue.max) setCounter(counter + 1)
        }
    }

    const decreaseCounterValue = () => {
        // Getting minMax from localStorage
        const minMax = localStorage.getItem("minMaxCounterValue")
        // Checking that it exists there
        if(minMax) {
            const minMaxValue = JSON.parse(minMax)

            if(counter > minMaxValue.min) setCounter(counter - 1)
        }
    }


    return (
        <div className={cl.wrapper}>
            <CounterSettings minMax={minMax} changeMinValue={changeMinValue} changeMaxValue={changeMaxValue}
                             setMinMaxLocalStorage={setMinMaxLocalStorage}/>
            <Counter counter={counter} increaseCounterValue={increaseCounterValue}
                     decreaseCounterValue={decreaseCounterValue}/>
        </div>
    )
}