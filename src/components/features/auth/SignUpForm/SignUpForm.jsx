import React, { useState } from "react";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { Button, Input, Card } from "../../../common";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../../../utils/validation";

const SignUpForm = ({ onNavigate, onSuccess }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!validateRequired(formData.username)) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!validateRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await signup(formData);

      if (result.success) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        onSuccess?.();
        onNavigate?.("home");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Sign up failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join our coffee community</p>
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
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              startIcon={<User className="w-4 h-4" />}
              fullWidth
              required
            />

            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
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
              helperText="Must be at least 6 characters"
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate?.("login")}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpForm;
