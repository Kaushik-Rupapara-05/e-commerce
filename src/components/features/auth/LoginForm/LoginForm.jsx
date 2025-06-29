import React, { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { Button, Input, Card } from "../../../common";

const LoginForm = ({ onNavigate, onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username or email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        setFormData({ username: "", password: "" });
        onSuccess?.();
        onNavigate?.("home");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              name="username"
              type="text"
              label="Username or Email"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              startIcon={<Mail className="w-4 h-4" />}
              fullWidth
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              startIcon={<Lock className="w-4 h-4" />}
              fullWidth
              required
            />
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              loading={loading}
              fullWidth
              size="lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => onNavigate?.("signup")}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
