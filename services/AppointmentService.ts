import UseFetch from "@/hooks/utils/useFetch";
import endPoints from "@/constants/values/endPoints";
import { Patient, RawAppointment, Appointment } from "@/constants/types/AppointmentTypes";

const useFetch: UseFetch = new UseFetch()

const getPatients: (token: string) =>
  Promise<Array<Patient>> = async (token: string) :
  Promise<Array<Patient>> =>
{
  const data = await useFetch
    .setUrl(endPoints.patients)
    .setMethod("GET")
    .addHeader("Authorization", token)
    .setBody("")
    .execute()
  return data.json() as Array<Patient>
}

const getRawAppointments: (token: string) =>
  Promise<Array<RawAppointment>> = async (token: string):
  Promise<Array<RawAppointment>> =>
{
  const today = Date.now()
  const timeInAWeek = today + (7 * 24 * 60 * 60 * 1000)
  const data = await useFetch
    .setUrl(endPoints.appointments)
    .setMethod("POST")
    .addHeader("Authorization", token)
    .setBody({
      "timezone": "Europe/Bucharest",
      "period_start_date": today,
      "period_end_date": timeInAWeek
    })
    .execute()
  return data.json() as Array<RawAppointment>
}

export const getAppointments: (token: string) =>
  Promise<Array<Appointment>> = async (token: string) :
  Promise<Array<Appointment>> =>
{
  validateToken(token)
  const patients: Array<Patient> = await getPatients(token)
  const rawAppointments: Array<RawAppointment> = await getRawAppointments(token)
  const appointments: Array<Appointment> = []
  
  if (!Array.isArray(rawAppointments) || !Array.isArray(patients)) {
    return []
  }
  
  rawAppointments.forEach((rawAppointment: RawAppointment): void => {
    const patient: Patient | undefined = patients.find((
      p: Patient) => p.account.name === rawAppointment.regular_account.name
    )
    if (patient) {
      appointments.push({
        patientName: patient.account.name,
        date: new Date(Number(rawAppointment.business_start_date_time)).toISOString().split('T')[0],
        startTime: new Date(Number(rawAppointment.business_start_date_time)).toISOString().split('T')[1].split('.')[0],
        endTime: new Date(Number(rawAppointment.business_end_date_time)).toISOString().split('T')[1].split('.')[0],
        type: rawAppointment.event_type,
        patientEmail: patient.account.email,
        patientIssues: parseIssues(patient.profile.issues.split(";"))
      })
    }
  })
  return appointments
}

const parseIssues: (issues: string[]) => string[] = (issues: string[]): string[] => {
  const returnArr: string[] = []
  issues.forEach((issue: string): void => {
    switch (issue) {
      case "autism":
        returnArr.push("Autism")
        break
      case "language_delay_disorder":
        returnArr.push("Întârziere în dezvoltare limbaj")
        break
      case "social_communication":
        returnArr.push("Tulburare oromiofunctionala")
        break
      case "speech_sounds":
        returnArr.push("Dislexo-disgrafie")
        break
      case "stammering":
        returnArr.push("Balbism")
        break
      case "aac":
        returnArr.push("Adulți cu AVC")
        break
      case "semh":
        returnArr.push("Întârziere de Pronunție")
        break
      case "cleft_lip_palate":
        returnArr.push("Apraxie")
        break
      case "downs_syndrome":
        returnArr.push("Sindromul Down")
        break
      case "selective_mutism":
        returnArr.push("Mutism Selectiv")
        break
      case "learning_mother_tongue":
        returnArr.push("Învățare limba maternă")
        break
    }
  })
  return returnArr
}

const validateToken: (token: string) => void = (token: string): void => {
  if (!token) return
  if (!token.startsWith("Bearer")) throw new Error("Invalid token")
}
