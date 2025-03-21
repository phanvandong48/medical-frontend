// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import DoctorRoute from './components/DoctorRoute';
import AdminRoute from './components/AdminRoute';
import AdminMedicalRecords from './pages/AdminMedicalRecords';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorMedicalRecords from './pages/DoctorMedicalRecords';
import PatientMedicalRecords from './pages/PatientMedicalRecords';
import MedicalRecordDetails from './pages/MedicalRecordDetails';
import AddMedicalRecordDetail from './pages/AddMedicalRecordDetail';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import DoctorProfile from './pages/DoctorProfile';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About'; // Thêm import trang About

import './App.css';

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <div className="app-container">
            <Helmet>
              <title>MedCare - Hệ thống Y tế Chất lượng Cao</title>
              <meta name="description" content="Hệ thống đặt lịch khám bệnh trực tuyến MedCare - Chăm sóc sức khỏe chất lượng cao" />
            </Helmet>
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:doctorId" element={<DoctorProfile />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} /> {/* Thêm route cho trang About */}

                {/* Protected routes */}
                <Route
                  path="/book-appointment"
                  element={
                    <PrivateRoute>
                      <BookAppointment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-appointments"
                  element={
                    <PrivateRoute>
                      <MyAppointments />
                    </PrivateRoute>
                  }
                />

                {/* Medical Records routes */}
                <Route
                  path="/medical-records"
                  element={
                    <PrivateRoute>
                      <PatientMedicalRecords />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/medical-records/:recordId"
                  element={
                    <PrivateRoute>
                      <MedicalRecordDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/medical-records/:recordId/add-detail"
                  element={
                    <DoctorRoute>
                      <AddMedicalRecordDetail />
                    </DoctorRoute>
                  }
                />

                {/* Doctor routes */}
                <Route
                  path="/doctor/dashboard"
                  element={
                    <DoctorRoute>
                      <DoctorDashboard />
                    </DoctorRoute>
                  }
                />
                <Route
                  path="/doctor/schedule"
                  element={
                    <DoctorRoute>
                      <DoctorSchedule />
                    </DoctorRoute>
                  }
                />
                <Route
                  path="/doctor/medical-records"
                  element={
                    <DoctorRoute>
                      <DoctorMedicalRecords />
                    </DoctorRoute>
                  }
                />

                {/* Admin routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/medical-records"
                  element={
                    <AdminRoute>
                      <AdminMedicalRecords />
                    </AdminRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;