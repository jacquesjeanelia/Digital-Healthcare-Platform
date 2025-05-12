import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../lib/AuthContext";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isLoading: authLoading } = useAuth();
  const [role, setRole] = useState<"patient" | "doctor" | "clinic" | null>(null);
  
  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Patient specific fields
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  
  // Provider specific fields
  const [clinicName, setClinicName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "patient" || roleParam === "doctor" || roleParam === "clinic") {
      setRole(roleParam);
    } else {
      navigate("/auth/role-selection");
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!role) {
      setError("Please select a role");
      setIsLoading(false);
      return;
    }

    // Validate required fields based on role
    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (role === "doctor" && (!specialty || !location)) {
      setError("Please fill in all required fields for doctor registration");
      setIsLoading(false);
      return;
    }

    if (role === "clinic" && (!clinicName || !specialty || !location)) {
      setError("Please fill in all required fields for clinic registration");
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        role,
        phoneNumber: phoneNumber || "",
        ...(role === "patient" && {
          dateOfBirth: dateOfBirth || undefined,
          gender: gender || undefined,
          address: address || undefined,
          insuranceProvider: insuranceProvider || undefined,
        }),
        ...(role === "doctor" && {
          specialty,
          location,
          licenseNumber: licenseNumber || undefined,
          contactInfo: contactInfo || undefined,
        }),
        ...(role === "clinic" && {
          clinicName,
          specialty,
          location,
          website: website || undefined,
          licenseNumber: licenseNumber || undefined,
          contactInfo: contactInfo || undefined,
        }),
      };

      await register(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo-colored.svg" 
            alt="Sehaty" 
            className="w-16 h-16 mb-2" 
          />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
            {role === "patient" ? "Patient Registration" : 
             role === "doctor" ? "Doctor Registration" : 
             "Clinic Registration"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Create your {role} account to get started
          </p>
        </div>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common fields */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number (Egyptian format: +201234567890)
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                  pattern="\+201[0-9]{9}"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password *
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password *
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Role-specific fields */}
              {role === "patient" && (
                <>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date of Birth
                    </label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Insurance Provider
                    </label>
                    <Input
                      id="insuranceProvider"
                      type="text"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              {(role === "doctor" || role === "clinic") && (
                <>
                  {role === "clinic" && (
                    <div>
                      <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Clinic Name *
                      </label>
                      <Input
                        id="clinicName"
                        type="text"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Specialty *
                    </label>
                    <select
                      id="specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Specialty</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="General Practice">General Practice</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Urology">Urology</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location *
                    </label>
                    <Input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>

                  {role === "clinic" && (
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Website
                      </label>
                      <Input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      License Number
                    </label>
                    <Input
                      id="licenseNumber"
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Contact Information
                    </label>
                    <Input
                      id="contactInfo"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full h-10 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86]"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/auth/login")} 
                  className="text-[#4caf96] hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/auth/role-selection")}
          >
            Back to Role Selection
          </Button>
        </div>
      </div>
    </div>
  );
}; 