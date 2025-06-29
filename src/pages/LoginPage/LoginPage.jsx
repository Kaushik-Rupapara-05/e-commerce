import React from "react";
import { LoginForm } from "../../components/features/auth";

const LoginPage = ({ onNavigate }) => {
  const handleSuccess = () => {
    console.log("Login successful");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <LoginForm onNavigate={onNavigate} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
