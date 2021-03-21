import * as Yup from 'yup'

const create = Yup.object().shape({
  name: Yup.string().required('Mohon untuk isi nama'),
  qty: Yup.number()
    .moreThan(0, 'Tidak boleh 0 atau negatif')
    .required('Mohon untuk isi Quantity'),
})

export default {
  create,
}
