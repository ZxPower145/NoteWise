const host = "https://api.staging.voxikids.com"
const login = host + "/security/login"
const signup = host + "/security/register"
const passReset = host + "/account/reset_password"
const patients = host + "/account/business/patients"
const appointments = host + "/calendar/event/current"
const checkAccount = host + "/info/"
const termsAndConditions = "https://voxikids.com/terms-and-conditions/"
export default {
  login,
  signup,
  passReset,
  patients,
  appointments,
  checkAccount,
  termsAndConditions
}
