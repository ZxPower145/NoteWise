import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;

export default StyleSheet.create<NamedStyles<any>>({
  shadow: {
    shadowColor: "#000000FF",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 15,
    elevation: 15,
  }
})
