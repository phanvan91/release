import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string()
    .required("The username field is required")
    .max(255, 'The username may not be greater than 255 characters.'),
  role_id: yup.array()
    .min(1, "The roles field is required"),
});

export default schema
