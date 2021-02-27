import * as yup from 'yup'

const create = yup.object().shape({
  email: yup
    .string()
    .email()
    .typeError('Harus Di isi')
    .required('Email Wajib Di isi'),
})

export default {
  create,
}
