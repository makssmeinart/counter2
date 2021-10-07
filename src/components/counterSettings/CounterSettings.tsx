import {ChangeEvent, FC, SetStateAction, useState} from "react";
import {minMaxType} from "../../App";
import cl from "./counterSettings.module.css"

type CounterSettings = {
    minMax: minMaxType
    changeMinValue: (value: number) => void
    changeMaxValue: (value: number) => void
    setMinMaxLocalStorage: () => void
    error: string
}

export const CounterSettings: FC<CounterSettings> = ({
                                                         minMax,
                                                         changeMinValue,
                                                         changeMaxValue,
                                                         setMinMaxLocalStorage,
                                                         error
                                                     }) => {
    const [disableButton, setDisableButton] = useState(true)


    // Controlled Inputs
    const changeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = parseInt(e.currentTarget.value)
        changeMinValue(currentInputValue)

        // On InputValueChange enable submit button
        setDisableButton(false)
    }

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = parseInt(e.currentTarget.value)
        changeMaxValue(currentInputValue)

        // On InputValueChange enable submit button
        setDisableButton(false)
    }
    // Set minMax to localStorage
    const setMinMaxLocalStorageHandler = () => {
        setMinMaxLocalStorage()
        setDisableButton(true)
    }


    return (
        <div className={cl.wrapper}>
            <div className={cl.inputHolder}>
                <span>Max val:</span>
                <input className={error ? `${cl.error}`: ""} type="number" value={minMax.max}
                       onChange={(e) => changeMaxValueHandler(e)}/>
            </div>
            <div className={cl.inputHolder}>
                <span>Min val:</span>
                <input className={error ? `${cl.error}`: ""} type="number" value={minMax.min}
                       onChange={(e) => changeMinValueHandler(e)}/>
            </div>
            <div className={cl.buttonContainer}>
                <button disabled={disableButton || error ? true : false} className={cl.button}
                        onClick={setMinMaxLocalStorageHandler}>Set
                </button>
            </div>
        </div>
    )
}