import {FC, useEffect, useState} from "react";
import cl from "./counter.module.css"

type CounterType = {
    counter: number | string
    increaseCounterValue: () => void
    decreaseCounterValue: () => void
    error: string
}

export const Counter: FC<CounterType> = ({counter, increaseCounterValue, decreaseCounterValue, error}) => {
    const [increaseButtonDisabled, setIncreaseButtonDisabled] = useState(false)
    const [decreaseButtonDisabled, setDecreaseButtonDisabled] = useState(false)


    // We don't want to run an infinite loop so we are going to check only when counter is updated
    useEffect(() => {
        const minMax = localStorage.getItem("minMaxCounterValue")

        if (minMax) {
            // Increase Button
            if (counter !== JSON.parse(minMax).max) {
            } else {
                setIncreaseButtonDisabled(true)
            }
            if (counter < JSON.parse(minMax).max) {
                setIncreaseButtonDisabled(false)
            }
            // Decrease Button
            if(counter === JSON.parse(minMax).min) {
                setDecreaseButtonDisabled(true)
            }
            if(counter > JSON.parse(minMax).min) {
                setDecreaseButtonDisabled(false)
            }
        }

    }, [counter])

    const increaseCounterValueHandler = () => {
        increaseCounterValue()
    }

    const decreaseCounterValueHandler = () => {
        decreaseCounterValue()
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.counterInner}>
                <div className={increaseButtonDisabled ? `${cl.lastNumber}` : ""}>{error ? error : counter}</div>
            </div>
            <div className={cl.buttonContainer}>
                <button disabled={increaseButtonDisabled || error || counter === "Set Value" ? true : false}
                        className={cl.button}
                        onClick={increaseCounterValueHandler}>Inc
                </button>
                <button disabled={decreaseButtonDisabled || error ? true : false}
                        className={cl.button}
                        onClick={decreaseCounterValueHandler}>Dec
                </button>
            </div>
        </div>
    )
}