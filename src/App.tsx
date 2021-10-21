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
    const [counter, setCounter] = useState(minMax.min || "Set Value")
    const [error, setError] = useState("")
    const [maxValInputError, setMaxValInputError] = useState(false)
    const [minValInputError, setMinValInputError] = useState(false)


    ///// Counter Settings Store //////
    // Controlled MinMax inputs
    const changeMinValue = (value: number) => {
        setMinMax({...minMax, min: value})
        setCounter("Set Value")
    }
    const changeMaxValue = (value: number) => {
        setMinMax({...minMax, max: value})
        setCounter("Set Value")
    }

    // on button set set minMax values to localStorage, and we want to disable setButton after we click it
    const setMinMaxLocalStorage = () => {
        localStorage.setItem("minMaxCounterValue", JSON.stringify(minMax))
        setCounter(minMax.min)
        setError("")
    }
    // When load the page set minMax to localStorage if its not there
    useEffect(() => {
        if (localStorage.getItem("minMaxCounterValue") === null) {
            localStorage.setItem("minMaxCounterValue", JSON.stringify(minMax))
        } else {
            const data = localStorage.getItem("minMaxCounterValue")

            if (data) {
                setMinMax(JSON.parse(data))
                setCounter(JSON.parse(data).min)
            }
        }
    }, [])

    // Errors Handler
    useEffect(() => {
        if (minMax.min > minMax.max) {
            setError("Incorrect value!")
            setMinValInputError(true)
        }
        if (minMax.min === minMax.max) {
            setError("Incorrect value!")
            setMaxValInputError(true)
            setMinValInputError(true)
        }
        if (minMax.min < 0) {
            setError("Incorrect value!")
            setMinValInputError(true)
        }
        if (minMax.min !== minMax.max && minMax.min >= 0 && minMax.max > minMax.min) {
            setError("")
            setMinValInputError(false)
            setMaxValInputError(false)
        }
    }, [minMax])


    ///// Counter State /////
    const increaseCounterValue = () => {
        // Getting minMax from localStorage
        const minMax = localStorage.getItem("minMaxCounterValue")
        // Checking that it exists there
        if (minMax) {
            const minMaxValue = JSON.parse(minMax)

            if (typeof counter !== "string" && counter < minMaxValue.max) setCounter(counter + 1)
        }
    }

    const decreaseCounterValue = () => {
        // Getting minMax from localStorage
        const minMax = localStorage.getItem("minMaxCounterValue")
        // Checking that it exists there
        if (minMax) {
            const minMaxValue = JSON.parse(minMax)

            if (typeof counter !== "string" && counter > minMaxValue.min) setCounter(counter - 1)
        }
    }


    return (
        <div className={cl.wrapper}>
            <CounterSettings minMax={minMax} changeMinValue={changeMinValue}
                             changeMaxValue={changeMaxValue}
                             setMinMaxLocalStorage={setMinMaxLocalStorage}
                             error={error}
                             maxValInputError={maxValInputError}
                             minValInputError={minValInputError}
            />

            <Counter counter={counter}
                     increaseCounterValue={increaseCounterValue}
                     decreaseCounterValue={decreaseCounterValue}
                     error={error}
            />
        </div>
    )
}