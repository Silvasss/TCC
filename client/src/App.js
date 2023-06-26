import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Register, Landing, Error, ProtectedRoute } from './pages'
import { Profile, SharedLayout, AddJob, AddGrad, AllGrads, AllMyGrads, ProfileEgresso, AllMyProfissionais, Pendencias } from './pages/dashboard'


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
            
          <Route index element={<AllMyGrads />} />         
          <Route path='all-grads' element={<AllGrads />} />
          <Route path='all-jobs' element={<AllMyProfissionais />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='add-grad' element={<AddGrad />}/>
          <Route path='profile' element={<Profile />} />
          <Route path='egresso' element={<ProfileEgresso />} />
          <Route path='pendencias' element={<Pendencias />} />

        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Landing />} />
        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  )
}


export default App