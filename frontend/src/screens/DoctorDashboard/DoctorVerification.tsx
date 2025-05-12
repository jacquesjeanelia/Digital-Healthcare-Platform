import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useAuth } from "../../lib/AuthContext";

export const DoctorVerification = (): JSX.Element => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "approved" | "rejected" | null>(null);
  const [documents, setDocuments] = useState({
    medicalLicense: null as File | null,
    idProof: null as File | null,
    specializationCertificate: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentType: keyof typeof documents) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [documentType]: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to submit verification documents
      // const formData = new FormData();
      // Object.entries(documents).forEach(([key, file]) => {
      //   if (file) formData.append(key, file);
      // });
      // await api.submitVerification(formData);
      
      setVerificationStatus("pending");
    } catch (error) {
      console.error("Error submitting verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verificationStatus === "approved") {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <AlertDescription className="text-green-800 dark:text-green-200">
          Your account has been verified. You can now access all features of the platform.
        </AlertDescription>
      </Alert>
    );
  }

  if (verificationStatus === "rejected") {
    return (
      <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <AlertDescription className="text-red-800 dark:text-red-200">
          Your verification was rejected. Please contact support for more information.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white mb-6">
          Doctor Verification
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="medicalLicense">Medical License</Label>
              <Input
                id="medicalLicense"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "medicalLicense")}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Upload your valid medical license (PDF, JPG, or PNG)
              </p>
            </div>

            <div>
              <Label htmlFor="idProof">Government ID Proof</Label>
              <Input
                id="idProof"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "idProof")}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Upload a government-issued ID (PDF, JPG, or PNG)
              </p>
            </div>

            <div>
              <Label htmlFor="specializationCertificate">Specialization Certificate</Label>
              <Input
                id="specializationCertificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "specializationCertificate")}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Upload your specialization certificate (PDF, JPG, or PNG)
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !documents.medicalLicense || !documents.idProof}
            className="w-full bg-[#4caf96] hover:bg-[#4caf96]/90 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </Button>
        </form>

        {verificationStatus === "pending" && (
          <Alert className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              Your verification is pending. We will review your documents and get back to you soon.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}; 