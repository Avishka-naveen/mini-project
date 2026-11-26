import React from 'react'
import {Routes,Route} from 'react-router-dom'
import WorkerList from './pages/client/WorkerList'
import WorkerDetails from './pages/Client/WorkerDetails'
import WorkerDashboard from './pages/Worker/WorkerDashboard'
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
import ForgotPassword from './pages/Client/ForgotPassword'
import MyProfile from './pages/Worker/MyProfile'
import AboutUs from './pages/Client/AboutUs'
import WorkerComments from './pages/Worker/WorkerComments'

function App() {
  return (
    <div>
      <Routes>
        
        {/* -------------------customer routes -------------------*/}

        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/workerList" element={<WorkerList />} />
        <Route path="/customer/workerDetails/:serviceId" element={<WorkerDetails />} />
        <Route path="/customer/workerReservation" element={<Bookings />}/>
        <Route path="/customer/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/customer/verifyOtp" element={<VerifyOtp/>}/>
        <Route path="/aboutUs" element={<AboutUs/>} />
       

         {/* -------------------worker routes -------------------*/}

        <Route path='/worker/dashbord' element={ <WorkerDashboard />}>
          <Route path='workerReservation' element={<WorkerMyBookings />} />
          <Route path='workerServises' element={<WorkerMyServises />} />
          <Route path='workerAddServises' element={<WorkerAddServises />} />
          <Route path='myProfile' element={<MyProfile/>} />
          <Route path='workerComments' element={<WorkerComments/>} />
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
