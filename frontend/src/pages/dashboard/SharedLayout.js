import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import Wrapper from '../../assets/wrappers/SharedLayout'
import { NaBar, SmallSideBar, BigSidebar } from '../../components'


const SharedLayout = () => {
  return (
    <Wrapper>
        <main className='dashboard'>
            <SmallSideBar/>

            <BigSidebar/>

            <div>
                <NaBar/>

                <div className='dashboard-page'>
                    <Outlet/>
                </div>
            </div>
        </main>        

        <Outlet/>
    </Wrapper>
  )
}


export default SharedLayout