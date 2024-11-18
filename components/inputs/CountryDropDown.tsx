import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

interface CountryDropDownChildren {
  onSelect: (value: string) => void,
  containerWidth?: string
}

const CountryDropDown = (props: CountryDropDownChildren) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  
  const styles = StyleSheet.create({
    containerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: props.containerWidth,
      // paddingVertical: 5,
      // paddingHorizontal: 10,
      borderRadius: 15
    }
  })
  
  return (
    <TouchableOpacity style={styles.containerStyle}>
      <MaterialIcons name="phone" size={24} color="black" />
      <MaterialIcons name={`keyboard-arrow-${expanded ? 'up' : 'down'}`} size={24} color="black" />
    </TouchableOpacity>
  )
}


export default CountryDropDown
