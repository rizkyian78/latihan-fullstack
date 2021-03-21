import * as yup from 'yup'

const login = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Email tidak valid')
      .required('Email wajib diisi'),
    password: yup
      .string()
      .min(8, 'Minimal 8 karakter')
      .required('Password wajib diisi'),
  })
  .required()

export default {
  login,
}
