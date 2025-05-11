import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../lib/AuthContext";
import { User } from "../../lib/AuthContext";

interface DoctorVerificationRequest {
  id: string;
  doctor: User;
  documents: {
    medicalLicense: string;
    idProof: string;
    specializationCertificate: string;
  };
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export const DoctorVerificationList = (): JSX.Element => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Mock data for verification requests
  const [verificationRequests] = useState<DoctorVerificationRequest[]>([
    {
      id: "1",
      doctor: {
        id: "doc1",
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        role: "doctor",
        specialization: "Cardiology",
      },
      documents: {
        medicalLicense: "https://example.com/license1.pdf",
        idProof: "https://example.com/id1.pdf",
        specializationCertificate: "https://example.com/cert1.pdf",
      },
      submittedAt: "2024-03-28T10:00:00Z",
      status: "pending",
    },
    {
      id: "2",
      doctor: {
        id: "doc2",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "doctor",
        specialization: "Pediatrics",
      },
      documents: {
        medicalLicense: "https://example.com/license2.pdf",
        idProof: "https://example.com/id2.pdf",
        specializationCertificate: "https://example.com/cert2.pdf",
      },
      submittedAt: "2024-03-27T15:30:00Z",
      status: "pending",
    },
  ]);

  const handleVerification = async (requestId: string, action: "approve" | "reject") => {
    setIsProcessing(requestId);

    try {
      // TODO: Implement API call to update verification status
      console.log(`Processing verification request ${requestId}: ${action}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
    } catch (error) {
      console.error("Error processing verification:", error);
    } finally {
      setIsProcessing(null);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1f4156] dark:text-white">
          Doctor Verification Requests
        </h1>
      </div>

      <div className="grid gap-6">
        {verificationRequests.map((request) => (
          <Card key={request.id} className="bg-white dark:bg-gray-800 border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#1f4156] dark:text-white">
                    {request.doctor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {request.doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Submitted on {new Date(request.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                    onClick={() => window.open(request.documents.medicalLicense, "_blank")}
                  >
                    View Documents
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                      disabled={isProcessing === request.id}
                      onClick={() => handleVerification(request.id, "approve")}
                    >
                      {isProcessing === request.id ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      disabled={isProcessing === request.id}
                      onClick={() => handleVerification(request.id, "reject")}
                    >
                      {isProcessing === request.id ? "Processing..." : "Reject"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {verificationRequests.length === 0 && (
          <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No pending verification requests
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}; 