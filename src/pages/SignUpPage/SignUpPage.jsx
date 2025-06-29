import React from "react";
import { SignUpForm } from "../../components/features/auth";

const SignUpPage = ({ onNavigate }) => {
  const handleSuccess = () => {
    console.log("Sign up successful");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <SignUpForm onNavigate={onNavigate} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default SignUpPage;
