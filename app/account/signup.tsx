import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormTextInput from "@/components/inputs/FormTextInput";
import React, {useEffect, useState} from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CountryDropDown from "@/components/inputs/CountryDropDown";
import {getCountryDataList, getEmojiFlag} from "countries-list";

const Signup = () => {
  const [email, setEmail] = useState<string>("")
  
  const [password1, setPassword1] = useState<string>("")
  const [showPassword1, setShowPassword1] = useState<boolean>(false)
  
  const [password2, setPassword2] = useState<string>("")
  const [showPassword2, setShowPassword2] = useState<boolean>(false)
  
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  
  const [country, setCountry] = useState<string>("")
  const [city, setCity] = useState<string>("")
  
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  
  const [countryList, setCountryList] = useState([])
  const countries = getCountryDataList()
  
  useEffect(() => {
    const formattedCountries = countries.map(country => ({
      countryLabel: `${getEmojiFlag(country.iso2)} ${country.iso2 || country.iso3}`,
      countryName: country.name,
      countryPrefix: country.phone
    }));
  
    // Single state update with all data
    setCountryList(formattedCountries);
  }, [])
  
  
  return (
    <SafeAreaView className="w-full h-full">
      <View style={{height: '20%', alignItems: 'center', justifyContent: 'center'}}>
        <Text className="font-semibold text-3xl text-center">
          Creează un cont nou
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
        className="bg-hotpink">
        <View style={{gap: 20}}>
          <Text
            className='text-2xl font-semibold text-center border-b py-2'
            style={{color: 'white', borderColor: 'white'}}>
            - Creeați un cont nou -
          </Text>
          <FormTextInput
            value={email}
            onChangeText={setEmail}
            placeholder={"Introduceți adresa de e-mail"}
            textInputWidth={'90%'}
            beforeIcon={<Fontisto name="email" size={24} color="gray"/>}
          />
  
          <FormTextInput
            value={phoneNumberPrefix}
            onChangeText={setPhoneNumber}
            placeholder={"Număr de telefon"}
            textInputWidth={'80%'}
            beforeIcon={
              <CountryDropDown
                onSelect={setPhoneNumberPrefix}
                containerWidth={'20%'}
              />
            }
          />
          
          <View className="flex-row" style={{justifyContent: 'space-between'}}>
            <FormTextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder={"Nume"}
              beforeIcon={<MaterialIcons name="person-outline" size={24} color="gray" />}
              viewWidth={'48%'}
            />
            <FormTextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder={"Prenume"}
              viewWidth={'48%'}
              beforeIcon={<MaterialIcons name="person-outline" size={24} color="gray" />}
            />
          
          </View>
          
          <FormTextInput
            beforeIcon={<MaterialIcons name="lock-outline" size={24} color="gray"/>}
            value={password1}
            onChangeText={setPassword1}
            placeholder={'Introduceți parola'}
            secureText={!showPassword1}
            textInputWidth={'80%'}
            afterIcon={<TouchableOpacity
              className="ml-auto"
              onPress={() => setShowPassword1(!showPassword1)}
              style={{width: '10%'}}
            >
              <FontAwesome6 name={`eye${showPassword1 ? '-slash' : ''}`} size={24} color="gray" />
            </TouchableOpacity>}
          />
          
          <FormTextInput
            beforeIcon={<MaterialIcons name="lock-outline" size={24} color="gray"/>}
            value={password2}
            onChangeText={setPassword2}
            placeholder={'Confirmați parola'}
            secureText={!showPassword2}
            textInputWidth={'80%'}
            afterIcon={<TouchableOpacity
              className="ml-auto"
              onPress={() => setShowPassword2(!showPassword2)}
              style={{width: '10%'}}
            >
              <FontAwesome6 name={`eye${showPassword2 ? '-slash' : ''}`} size={24} color="gray" />
            </TouchableOpacity>}
          />
  
          <View className="flex-row" style={{justifyContent: 'space-between'}}>
            <FormTextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder={"Țară"}
              beforeIcon={<MaterialIcons name="flag" size={24} color="gray"/>}
              viewWidth={'48%'}
            />
            <FormTextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder={"Oraș"}
              viewWidth={'48%'}
              beforeIcon={<MaterialIcons name="place" size={24} color="gray"/>}
            />
  
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity
        className="py-2"
        style={styles.logInBtn}
        onPress={() => {}}>
        <Text className="text-center font-bold text-2xl" style={{color:'white'}}>
          Înregistrează-te
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    width: '100%',
    alignContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 15
  },
  logInBtn: {
    backgroundColor: '#33b86d',
    shadowColor:"#33b86d",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8
  }
})

export default Signup
