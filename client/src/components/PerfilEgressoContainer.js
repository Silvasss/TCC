import { useState } from 'react'

import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"
import { FaPhoenixFramework, FaLocationArrow, FaBriefcase } from 'react-icons/fa'
import { BsCalendarDate, BsCalendar2DateFill } from 'react-icons/bs'
import { TbCurrentLocation } from 'react-icons/tb'

import { useAppContext } from '../context/appContext'

import Loading from './Loading'
import Wrapper from '../assets/wrappers/JobsContainer' 
import WrapperJob from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const PerfilEgressoContainer = () => {
    const { isLoading, egressoDadosAllGrads, egressoNome, egressoDadosAllJobs, egressoListaLocalizacao } = useAppContext()

    const [localizacao, setLocalizacao] = useState()

    const [zoomMapa, setZoomMapa] = useState()

    if (isLoading) {
        return <Loading center />
    }
   
    if (localizacao === undefined) {
        if (egressoListaLocalizacao[2] && egressoListaLocalizacao[3]) {
            setLocalizacao(`${egressoListaLocalizacao[0]},${egressoListaLocalizacao[2]},${egressoListaLocalizacao[3]}`)
            
            setZoomMapa(`${15}`)            
        } else {
            setLocalizacao(`${egressoListaLocalizacao[1]}`)        

            setZoomMapa(`${4}`)
        }
    }
    
    function verMapaInstituicao(e) {        
        setLocalizacao(`${e.gradLocationLatitude},${e.gradLocationLongitude}`)

        setZoomMapa(`${17}`)
    }

    function verMapaEmpresa(e) {
        setLocalizacao(`${e.jobLocationCidade},${e.jobLocationEstado}`)

        setZoomMapa(`${15}`)
    }
        
    return (
        <>            
            <Wrapper>         
                <div className='jobs'>        
                    <header>                        
                        <Card sx={{ maxWidth: 992 }}>
                            <CardContent>
                                <Typography variant="h4"> {egressoNome} </Typography>
                            </CardContent>
                        </Card>  
                    </header>
                    
                    <iframe className='mapaGoogle-iframe' title='mapGoogle' src={`https://maps.google.com/maps?q=${localizacao}&hl=es&z=${zoomMapa}&amp&output=embed`}></iframe>

                    {
                        egressoDadosAllGrads.map((grad) => {
                            return (
                                <WrapperJob key={(grad._id)}>
                                    <header>
                                        <div className='main-icon'>{grad.instituicao.charAt(0)}</div>

                                        <div className='info'>
                                            <h5>{grad.curso}</h5>

                                            <p>{grad.instituicao}</p>
                                        </div>
                                    </header>
                                    
                                    <div className='content'>
                                        <div className='content-center'>
                                            <JobInfo icon={grad.status === 'pendente' ? <GiDistressSignal /> : <ImFlag />} text={grad.status} />

                                            <JobInfo icon={<FaPhoenixFramework />} text={grad.curso} />

                                            <JobInfo icon={<BsCalendarDate />} text={grad.dataMesInicioGraduacao.split("T")[0].length !== 10 ? 'data não informada' : grad.dataMesInicioGraduacao.split("T")[0]} />

                                            <JobInfo icon={<BsCalendar2DateFill />} text={grad.dataMesFimGraduacao.split("T")[0].length !== 10 ? 'data não informada' : grad.dataMesFimGraduacao.split("T")[0]} />
                                        </div>
                                    </div>

                                    <Button variant="contained"onClick={() => verMapaInstituicao(grad)}> Ver no mapa </Button>
                                </WrapperJob>                            
                            )
                        })
                    }              

                    {
                        egressoDadosAllJobs.map((grad) => {
                            return (
                                <WrapperJob key={(grad._id)}>
                                    <header>
                                        <div className='main-icon'>{grad.company.charAt(0)}</div>

                                        <div className='info'>
                                            <h5>{grad.position}</h5>

                                            <p>{grad.company}</p>
                                        </div>
                                    </header>

                                    <div className='content'>
                                        <div className='content-center'>
                                            <JobInfo icon={<FaLocationArrow />} text={grad.jobLocation} />

                                            <JobInfo icon={<FaBriefcase />} text={grad.jobType} />

                                            <JobInfo icon={<TbCurrentLocation />} text={grad.status} />
                                        </div>                                    
                                    </div>

                                    <Button variant="contained"onClick={() => verMapaEmpresa(grad)}> Ver no mapa </Button>

                                </WrapperJob>
                            )
                        })
                    }
                </div>
                
            </Wrapper>
        </>
    )
}


export default PerfilEgressoContainer