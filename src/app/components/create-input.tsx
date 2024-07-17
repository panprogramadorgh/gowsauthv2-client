import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";


interface Props<T> {
  formState: [T, (value: T | ((prev: T) => T)) => void];
  formStateField: keyof T
  label?: string
  isPassword?: boolean
}

function createInput<T extends Record<string, any>>(): FC<Props<T>> {
  return ({ formState, formStateField, label, isPassword }) => {
    const [state, setState] = formState
    const [visible, setVisible] = useState(false);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setState(prev => {
        const newFormState = { ...prev }
        if (typeof newFormState[formStateField] === 'string') {
          newFormState[formStateField] = e.target.value as T[keyof T]
        }
        return newFormState
      })
    }

    const handleEyeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault()
      setVisible(prev => !prev)
    }

    return (
      <div className="flex flex-col gap-2 mb-4">
        {label !== undefined ? <label>{label}</label> : null}
        <div className="flex items-center">
          <input autoFocus className="flex-grow min-h-0 bg-transparent border-[1px] border-solid border-zinc-200 border-opacity-15" type={visible || !isPassword ? "text" : "password"} value={state[formStateField]} onChange={handleChange} />
          {isPassword ? (<>
            <div className="pl-2 flex justify-center items-center">
              <button onClick={handleEyeClick} className="w-6 h-6 p-0">{visible ? <FiEye className="w-full h-full" /> : <FiEyeOff className="w-full h-full" />}</button>
            </div>
          </>) : (null)}
        </div>
      </div>
    )
  }
}

export default createInput