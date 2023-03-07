import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'


const links = [
  // ID(1) será retirada e modificada para apresentar todas as informações instituicionais do usuário
  { id: 1, text: 'Minhas graduações', path: '/', icon: <IoBarChartSharp /> },
  { id: 3, text: 'Todos os egressos', path: 'all-grads', icon: <MdQueryStats /> },
  { id: 4, text: 'adicionar trabalho', path: 'add-job', icon: <FaWpforms /> },
  { id: 5, text: 'adicionar graduação', path: 'add-grad', icon: <FaWpforms /> },
  { id: 6, text: 'perfil', path: 'profile', icon: <ImProfile /> },
]


export default links