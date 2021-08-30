import { Switch } from 'antd'
import { FC } from 'react'
import { KeyBoardType } from '../../types/KeyboardMapping'

export interface KeyboardMappingSwitchProps {
  checkedVal: KeyBoardType
  uncheckedVal: KeyBoardType
  onChange: (checked: boolean) => void
}

const KeyboardMappingSwitch: FC<KeyboardMappingSwitchProps> = ({
  checkedVal,
  uncheckedVal,
  onChange
}) => (
  <Switch
    checkedChildren={checkedVal}
    unCheckedChildren={uncheckedVal}
    onChange = {onChange}
  />
)

export default KeyboardMappingSwitch
