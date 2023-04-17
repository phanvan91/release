import * as yup from "yup";

const schema = yup.object().shape({
  password: yup.string()
    .required("The password field is required"),
  new_password: yup.string()
    .required("The new password field is required")
    .min(6, 'The new password must be at least 6 characters.'),
  new_password_confirmation: yup.string()
    .oneOf([yup.ref('new_password'), null], 'Passwords confirmation must match'),
});

export default schema
