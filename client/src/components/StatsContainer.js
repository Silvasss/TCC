import { FaBug } from 'react-icons/fa'
import { GiAxeInStump } from "react-icons/gi"

import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import Wrapper from '../assets/wrappers/StatsContainer'


const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'solicitações pendentes',
      count: stats.pending || 0,
      icon: <GiAxeInStump />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'solicitações recusadas',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}


export default StatsContainer