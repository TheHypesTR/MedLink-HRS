const english = {
    // PARTITION OF POLYCLINIC ERRORS
    polyclinicNotFound: "Polyclinic Not Found!!",
    polyclinicNotAdding: "Polyclinic Not Adding!!",
    polyclinicNotUpdating: "Polyclinic Not Updating!!",
    polyclinicNotDeleting: "Polyclinic Not Deleting!!",
    polyclinicNotListing: "Polyclinics Not Listing!!",
    polyclinicAlreadyExists: "Polyclinic Already Exists!!",
    polyclinicNameReq: "Polyclinic Name is Required!!",
    
    // PARTITION OF POLYCLINIC INFO
    polyclinicAdded: "Polyclinic Added Successfully!!",
    polyclinicUpdated: "Polyclinic Edited Successfully!!",
    polyclinicDeleted: "Polyclinic Deleted Successfully!!",
   
    // PARTITION OF DOCTOR ERRORS
    doctorNotFound: "Doctor Not Found!!",
    doctorNotAdding: "Doctor Not Adding!!",
    doctorNotUpdating: "Doctor Not Updating!!",
    doctorNotDeleting: "Doctor Not Deleting!!",
    doctorNotListing: "Doctors Not Listing!!",
    doctorAlreadyExists: "Doctor Already Exists!!",
    
    // PARTITION OF DOCTOR INFO
    doctorAdded: "Doctor Added Successfully!!",
    doctorUpdated: "Doctor Edited Successfully!!",
    doctorDeleted: "Doctor Deleted Successfully!!",
    
    // PARTITION OF APPOINTMENT ERRORS
    appointmentNotFound: "Appointment Not Found!!",
    appointmentNotAdding: "Appointment Not Adding!!",
    appointmentNotUpdating: "Appointment Not Updating!!",
    appointmentNotDeleting: "Appointment Not Deleting!!",
    appointmentNotListing: "Appointments Not Listing!!",
    appointmentNotAvailable: "You do not have any active appointments!!",
    appointmentNotDeletingForUser: "No Appointment Information to be Deleted Found!!",
    appointmentAlreadyExists: "Appointment Already Exists!!",
    appointmentAlreadyTaken: "Another User Has an Appointment on the Same Date!!",
    appointmentDuplicate: "No other appointment can be made with the same doctor on the same date!!",
    appointmentTimeReq: "Appointment Time (Array) is Required!!",

    // PARTITION OF APPOINTMENT INFO
    appointmentMade: "Appointment Made Successfully!!",
    appointmentAdded: "Appointment Added Successfully!!",
    appointmentUpdated: "Appointment Edited Successfully!!",
    appointmentDeleted: "Appointment Deleted Successfully!!",
    appointmentDeletedForUser: "Appointment Cancellation Successful!!",

    // PARTITION OF DOCTOR'S REPORT ERRORS
    reportNotFound: "Doctor's Report Not Found!!",
    reportNotAdding: "Doctor's Report Not Adding!!",
    reportNotDeleting: "Doctor's Report Not Deleting!!",
    reportNotListing: "Doctor's Reports Not Listing!!",
    reportOverlap: "Report's Overlapping!!",
    
    // PARTITION OF DOCTOR'S REPORT INFO
    reportAdded: "Doctor's Report Added Successfully!!",
    reportDeleted: "Doctor's Report Deleted Successfully!!",

    // PARTITION OF INVALID ERRORS
    invalidTC: "Invalid 'T.C. NO'!!",
    invalidDate: "Invalid Date!!",
    invalidLang: "Invalid Language!!",
    invalidTimeSlot: "Invalid Time Slot!!",
    invalidPermission: "Only Admins Can Enter!!",
    invalidPolyclinicID: "Invalid Polyclinic-ID!!",
    invalidReportDuration: "Invalid Report Duration!!",
    invalidDoctorIDReportID: "Invalid Doctor-ID or Report-ID!!",
    invalidPolyclinicIDDoctorID: "Invalid Polyclinic-ID or Doctor-ID!!",
    invalidDoctorIDAppointmentDate: "Invalid Doctor-ID or Appointment Date!!",

    // PARTITION OF USER ERRORS
    userAlreadyAdmin: "This User Already Admin!!",
    userAlreadyExists: "User Already Exists!!",
    UserAlreadyLoggedIn: "You Cannot Login Without Logging Out!!",
    userNotFound: "User Not Found!!",
    userNotPromoted: "User Not Promoted!!",
    userNotRegistered: "User Not Registered!!",
    userNotLoggedIn: "Please Login!!",
    passNotReset: "Password Not Reset!!",
    badCredentials: "Incorrect Password!!",

    // PARTITION OF USER INFO
    userPromoted: "User Promoted Successfully!!",
    userRegistered: "Registration Successfully!!",
    userLoggedIn: "Login Successfully!!",
    userLoggedOut: "Logout Successfully!!",

    // PARTITION OF OTHERS
    filter: "Check Hospital Filters!!",
    dataNotFound: "Updating Cannot be Made Without Entering any Data!!",
    tokenNotFound: "Token Not Found!!",
    dateReq: "Date is Required!!",
    welcome: "Welcome Back, ${name}!!",

    // PARTITION OF MAIL
    hello: "Hello ${user},",
    clickResetPass: "\nClick to Reset your Password!!",
    resetPass: "Password Reset Request",
    emailSent: "Password Reset E-Mail Sent to '${email}' !!",
    passResetSucces: "\nYour Password has been Successfully Updated!!",
    resetPassSubject: "Password Reset Successfully!!",

    // PARTITION OF VALIDATION SCHEMAS ERRORS
    TCnoLength: "'T.C. NO' Must be 11 Numbers!",
    TCnoMatch: "'T.C. NO' Must Contain Only Numbers!",
    nameLength: "'Name' Must be at Least 6 - 36 Characters!",
    emailEmpty: "'E-Mail' Must Not be Empty!",
    emailMatch: "Please Check Your 'E-Mail' Address!",
    passwordLength: "'Password' Must be at Least 8 - 24 Characters!",
    passwordMatch: "'Password' Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
}

export default english;