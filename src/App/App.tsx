import { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import KeyboardMappingSwitch from '../pages/Switch'
import { KeyBoardType } from "../types/KeyboardMapping";

export const App: FC = () => {

  const [keyboardMapping, setKeyboardMapping] = useState(KeyBoardType.Normal)

  const onChange = (checked: boolean): void => {
    if (checked) {
      setKeyboardMapping(KeyBoardType.Vim)
    } else {
      setKeyboardMapping(KeyBoardType.Normal)
    }
  }
  
  useEffect(() => {
    console.log('changed:' + keyboardMapping)
  }, [keyboardMapping])

  return (
    <KeyboardMappingSwitch
      checkedVal={KeyBoardType.Vim}
      uncheckedVal={KeyBoardType.Normal}
      onChange={onChange}
    />
  )
}

export default App
