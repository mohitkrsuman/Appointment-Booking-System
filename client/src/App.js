import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinners from "./components/Spinners";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctors/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctors/DoctorAppointments";

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? <Spinners /> : 
        (<Routes>
          <Route path="/" element={
            <ProtectedRoutes>
               <HomePage />
            </ProtectedRoutes>
          } />
          <Route path="/apply-doctor" element={
            <ProtectedRoutes>
               <ApplyDoctor />
            </ProtectedRoutes>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoutes>
               <Users />
            </ProtectedRoutes>
          } />
          <Route path="/admin/doctors" element={
            <ProtectedRoutes>
               <Doctors />
            </ProtectedRoutes>
          } />
          <Route path="/doctor/profile/:id" element={
            <ProtectedRoutes>
               <Profile />
            </ProtectedRoutes>
          } />
          <Route path="/notification" element={
            <ProtectedRoutes>
               <NotificationPage />
            </ProtectedRoutes>
          } />
          <Route path="/doctor/book-appointment/:doctorId" element={
            <ProtectedRoutes>
               <BookingPage />
            </ProtectedRoutes>
          } />
          <Route path="/appointments" element={
            <ProtectedRoutes>
               <Appointments />
            </ProtectedRoutes>
          } />
          <Route path="/doctor-appointments" element={
            <ProtectedRoutes>
               <DoctorAppointments />
            </ProtectedRoutes>
          } />
          <Route path="/login" element={
            <PublicRoute>
               <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
               <Register />
            </PublicRoute>
          } />
        </Routes>)}
      </BrowserRouter>
    </>
  );
}

export default App;
