import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string()
    .required("The project name field is required")
    .max(255, 'The project name may not be greater than 255 characters.'),
  giturl: yup.string()
    .required("The git url field is required")
    .max(255, 'The git url may not be greater than 255 characters.'),
  description: yup.string().required("The description field is required"),
});

export default schema
