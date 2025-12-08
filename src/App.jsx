import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PropertyFilterPage from "./pages/PropertyFilterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyDetailPageComponent from "./pages/PropertyDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/properties" element={
          <ProtectedRoute>
            <PropertyFilterPage />
          </ProtectedRoute>
        } />
        <Route path="/properties" element={
          <ProtectedRoute>
            <PropertyFilterPage />
          </ProtectedRoute>
        } />
        <Route path="/properties/detail" element={
          <ProtectedRoute>
            <PropertyDetailPageComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
