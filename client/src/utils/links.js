import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'


const links = [
  { id: 5, text: 'perfil', path: 'profile', icon: <ImProfile /> },
  { id: 1, text: 'Minhas experiências acadêmicas', path: '/', icon: <IoBarChartSharp /> },
  { id: 4, text: 'Minhas experiências profissionais', path: 'all-jobs', icon: <FaWpforms /> },
  { id: 3, text: 'Todos os egressos', path: 'all-grads', icon: <MdQueryStats /> },
]


export default links