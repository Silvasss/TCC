import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'


const links = [
  { id: 1, text: 'estatísticas', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'Todos os perfis', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'adicionar trabalho', path: 'add-job', icon: <FaWpforms /> },
  { id: 3, text: 'adicionar graduação', path: 'add-grad', icon: <FaWpforms /> },
  { id: 4, text: 'perfil', path: 'profile', icon: <ImProfile /> },
]


export default links