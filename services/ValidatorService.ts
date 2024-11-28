import Toast from 'react-native-toast-message'

export const validateEmail: (email: string) => boolean =
  (email: string): boolean => {
  if (!email) {
    useToast('EMAIL', "Introdu o adresa de e-mail")
    console.log("email")
    return false
  } else if (!email.includes("@")) {
    useToast('EMAIL', "Introdu o adresa de e-mail valida")
    return false
  }
  return true
}

export const validatePassword: (password: string) => boolean =
  (password: string): boolean => {
  if (!password) {
    useToast('PAROLA', "Introdu o parola")
    return false
  }
  return true
}

export const validatePasswords: (password: string, confirmPassword: string) => boolean =
  (password: string, confirmPassword: string): boolean => {
  if (!password) {
    useToast("PAROLA", "Introdu o parola")
    return false
  }
  if (!confirmPassword) {
    useToast("PAROLA", "Repeta parola")
    return false
  }
  if (password !== confirmPassword) {
    useToast("PAROLA", "Parolele nu se potrivesc")
    return false
  }
  return true
}

export const validatePhoneNumber: (number: string) => boolean =
  (number:string): boolean => {
  if (!number.includes("+")) {
    useToast("TELEFON", "Adaugă un prefix")
    return false
  } else if (!number){
    useToast("TELEFON", "Introdu un număr de telefon")
    return false
  }
  return true
}

export const validateFirstName: (firstName: string) => boolean =
  (firstName: string): boolean => {
  if (!firstName) {
    useToast("NUME", "Introdu un prenume")
    return false
  }
  return true
}

export const validateLastName: (lastName: string) => boolean =
  (lastName: string): boolean => {
  if (!lastName) {
    useToast("NUME", "Introdu un nume")
    return false
  }
  return true
}

export const validateCountry: (country: string) => boolean =
  (country: string): boolean => {
  if (!country) {
    useToast("ADRESA", "Introdu o tara")
    return false
  }
  return true
}

export const validateCity: (city: string) => boolean =
  (city: string): boolean => {
  if (!city) {
    useToast("ADRESA", "Introdu un oraș")
    return false
  }
  return true
}

const useToast: (category: string, message: string) => void = (category: string, message: string): void => {
  Toast.show({
    text1: message,
    text2: category,
    type: "error"
  })
}
