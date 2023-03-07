import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Register, Landing, Error, ProtectedRoute } from './pages'
import { Profile, SharedLayout, AddJob, AddGrad, AllGrads } from './pages/dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>

          {
            // Nova rota aqui! 
            // com os cursos do usuário
            //<Route index element={<Stats />} />
          }

          <Route path='all-grads' element={<AllGrads />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='add-grad' element={<AddGrad />}/>
          <Route path='profile' element={<Profile />} />

        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Landing />} />
        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  )
}


export default App