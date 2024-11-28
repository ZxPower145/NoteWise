import React from "react";
import { StyleSheet } from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import {SelectList} from "react-native-dropdown-select-list";

interface CountryDropDownChildren {
  onSelect: (value: string) => void,
  data: Array<any>
  styles?: NamedStyles<any>
  placeholder: string
}

export default function CountryDropDown(props: CountryDropDownChildren): React.ReactNode {
  return (
    <SelectList
      data={props.data}
      search={true}
      setSelected={(value: string) => props.onSelect(value)}
    />
    // <SelectList
    //   data={props.data}
    //   placeholder={props.placeholder}
    //   search={true}
    //   setSelected={(val: string) => props.onSelect(val)}
    //   save={'value'}
    // />
  )
}
