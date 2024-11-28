export interface Patient {
  profile: {
    name: string
    birthday: string
    hearing_age: number
    issues: string
    index: number
    avatar_index: number
    goal: string
    creation_date: string
    assigned_to: string
    assigned_to_name: string | null
    events: string | null
  }
  account: {
    email: string
    name: string
    country: string
    city: string
    type: string
    business_validated: boolean
    creation_date: number
  }
}

export interface RawAppointment {
  id: number
  title: string
  regular_start_date_time: number | null
  regular_end_date_time: number | null
  business_start_date_time: number | null
  business_end_date_time: number | null
  regular_account: {
    name: string
    email: string
  }
  business_account: {
    name: string
    email: string
  }
  own_event: boolean
  profile_index: number | null
  event_type: string
}

export interface Appointment {
  patientName: string
  date: string
  startTime: string
  endTime: string
  type: string
  patientEmail: string
  patientIssues: string | string[]
}
