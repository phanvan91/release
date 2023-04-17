import * as yup from "yup";

const schema = yup.object().shape({
  project_id: yup.object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .required('The project field is required'),
  name: yup.string()
    .required("The environment name field is required")
    .max(255, 'The environment name may not be greater than 255 characters.'),
  baseurl: yup.string()
    .required("The base url field is required")
    .max(255, 'The base url may not be greater than 255 characters.'),
  description: yup.string().required("The description field is required"),
});

export default schema
