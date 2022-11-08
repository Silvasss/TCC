import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Register, Landing, Error, ProtectedRoute } from './pages'
import { AllJobs, Profile, SharedLayout, Stats, AddJob, AddGrad } from './pages/dashboard'


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

          <Route index element={<Stats />} />

          <Route path='all-jobs' element={<AllJobs />} />
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