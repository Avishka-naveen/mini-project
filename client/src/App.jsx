import React from 'react'
import {Routes,Route} from 'react-router-dom'
import WorkerList from './pages/client/WorkerList'
import WorkerDetails from './pages/client/WorkerDetails'
import WorkerDashboard from './pages/worker/WorkerDashboard'
import Register from './pages/client/Register'
import WorkerMyBookings from './pages/worker/WorkerMyBookings'
import WorkerMyServises from './pages/worker/WorkerMyServises'
import WorkerAddServises from './pages/worker/WorkerAddServises'
import AdminDashboard from './pages/Admin/AdminDashbord'
import AdminManageBookings from './pages/Admin/AdminManageBookings'
import AdminManageServises from './pages/Admin/AdminManageServises'
import AdminManageUsers from './pages/Admin/AdminManageUsers'
import AdminManageWorker from './pages/Admin/AdminManageWorker'
import LandingPage from './pages/LandingPage'
import Bookings from './pages/Client/Bookings'
import VerifyOtp from './pages/Client/VerifyOtp'

function App() {
  return (
    <div>
      <Routes>
        
        {/* -------------------customer routes -------------------*/}

        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/workerList" element={<WorkerList />} />
        <Route path="/customer/workerDetails/:id" element={<WorkerDetails />} />
        <Route path="/customer/workerReservation" element={<Bookings />}/>
        <Route path="/customer/verifyOtp" element={<VerifyOtp />}/>
       

         {/* -------------------worker routes -------------------*/}

        <Route path='/worker/dashbord' element={ <WorkerDashboard />}>
          <Route path='workerReservation' element={<WorkerMyBookings />} />
          <Route path='workerServises' element={<WorkerMyServises />} />
          <Route path='workerAddServises' element={<WorkerAddServises />} />
        </Route>

           {/* -------------------admin routes -------------------*/}

       
          <Route path='/admin/dashbord' element={<AdminDashboard />} >
            <Route path='manageBookings' element= {<AdminManageBookings />}/>
            <Route path='manageServises' element= {<AdminManageServises/>}/>
            <Route path='manageUsers' element= {<AdminManageUsers/>}/>
            <Route path='manageWorkers' element= {<AdminManageWorker/>}/>
          </Route>
       

      </Routes>

    </div>
  )
}

export default App
