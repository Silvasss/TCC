import { Link } from 'react-router-dom'

import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'


const Landing = () => {
  return (
    <Wrapper>
      <nav><Logo /></nav>

      <div className='container page'>
        <div className='info'>
          <h1>Rastreando <span>novos</span> caminhos</h1>

          <p>
          Cole aqui seu texto...ou verifique esta texto, afim de revelar alguns dos dos problemas que o LanguageTool consegue detectar. Isto tal vez permita corrigir os seus erro. Nós prometo ajudá-lo. para testar a grafia e as regrs do antigo) Acordo Ortográfico,, verifique o mesmo texto mesmo texto em Português de Angola ou Português do Moçambique e faça a analise dos resultados.. Nossa equipe anuncia a versão 4.5, que será lançada sexta-feira, 26 de março de 2019.
          </p>

          <Link to='/register' className='btn btn-hero'>Fazer login/Criar conta</Link>
        </div>

        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}


export default Landing