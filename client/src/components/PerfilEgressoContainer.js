import { useAppContext } from '../context/appContext'

import Loading from './Loading'
import JobEgressoPerfil from './JobEgressoPerfil'
import EgressoPerfil from './EgressoPerfil'
import Wrapper from '../assets/wrappers/JobsContainer' 


const PerfilEgressoContainer = () => {
    //        Objetivos
    //  4 - Adicionar o filtro com a opção de filtra por graduação ou experiência 

    const { isLoading, egressoDadosAllGrads, egressoNome, egressoLocalizacao, egressoDadosAllJobs } = useAppContext()

    if (isLoading) {
        return <Loading center />
    }
  
    return (
        <Wrapper>
        <h5>Egresso {egressoNome} de {egressoLocalizacao}</h5>

        <div className='jobs'>
            {egressoDadosAllGrads.map((grad) => {
            return <EgressoPerfil key={(grad._id)} {...grad} />
            })}

            {egressoDadosAllJobs.map((grad) => {
                return <JobEgressoPerfil key={(grad._id)} {...grad} />
            })}
        </div>

        </Wrapper>
    )
}


export default PerfilEgressoContainer