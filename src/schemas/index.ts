import * as Yup from "yup";
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const signupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  passwordAgain: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must be same."
  ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const patientSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full Name is required")
    .min(5)
    .max(100)
    .label("Full Name"),
  email: Yup.string().required("Email is required").email().label("Email"),
  phone: Yup.string()
    .matches(phoneRegex, "Phone number is invalid.")
    .required("Phone number is required")
    .label("Phone"),
  address: Yup.string().required("Address is required").label("Address"),
  date_of_birth: Yup.date()
    .label("Date of birth")
    .required("DOB is required")
    .max(new Date().toDateString()),
  is_special_attention: Yup.bool().optional().label("Special Attention"),
  avatar_filename: Yup.string().required("DOB is required").optional(),
  allergies: Yup.array().required("DOB is required").optional(),
});
