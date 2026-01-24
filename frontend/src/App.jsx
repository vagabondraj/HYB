import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateRequestPage from "./pages/CreateRequestPage.jsx";
import MyRequestsPage from "./pages/MyRequestPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RequestDetailPage from "./pages/RequestDetailPage.jsx";



function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <h1 className="text-4xl font-bold text-green-500">
    //     Tailwind is working Ravi Raj 🚀
    //   </h1>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/create_request" element={<CreateRequestPage/>}/>
        <Route path="/my_request_page" element={<MyRequestsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/req-detail" element={<RequestDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
