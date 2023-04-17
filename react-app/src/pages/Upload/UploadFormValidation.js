import * as yup from "yup";

const schema = yup.object().shape({
  project: yup.object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .required('The project field is required'),
  platform: yup.object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .required("The platform field is required"),
  environment: yup.object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .required("The environment field is required"),
  version: yup.string().required("The version field is required"),
  title: yup.string().required("The title field is required"),
  windows: yup.mixed()
    .when('platform', {
      is: (val) => val?.value == 'windows',
      then: (schema) => schema.required("The windows file is required")
    }),
  apk: yup.mixed()
    .when('platform', {
      is: (val) => val?.value == 'android',
      then: (schema) => schema.required("The apk file is required")
    }),
  ipa: yup.mixed()
    .when('platform', {
      is: (val) => val?.value == 'ios',
      then: (schema) => schema.required("The ipa file is required")
    }),
  bundleIdentifier: yup.string().when('platform', {
    is: (val) => val?.value == 'ios',
    then: (schema) => schema.required("The bundle identifier field is required")
  }),
  bundleVersion: yup.string().when('platform', {
    is: (val) => val?.value == 'ios',
    then: (schema) => schema.required("The bundle version field is required")
  }),
  bundleTitle: yup.string().when('platform', {
    is: (val) => val?.value == 'ios',
    then: (schema) => schema.required("The bundle title field is required")
  }),
});

export default schema
