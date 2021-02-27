import * as Yup from 'yup'

const category = Yup.object().shape({
  name: Yup.string().required('Mohon untuk isi nama'),
})
const item = Yup.object().shape({
  title: Yup.string().required('Mohon untuk isi Title'),
  price: Yup.number().required('Mohon untuk isi Harga'),
  city: Yup.string().required('Mohon untuk isi Kota'),
  description: Yup.string().required('Mohon untuk isi Deskripsi'),
})

export default {
  category,
  item,
}
