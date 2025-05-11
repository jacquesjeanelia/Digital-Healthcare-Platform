import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useAuth } from "../../lib/AuthContext";

export const DoctorSettings = (): JSX.Element => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialization: user?.specialization || "",
    bio: user?.bio || "",
    consultationFee: user?.consultationFee || "",
    availability: user?.availability || {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: { start: "09:00", end: "13:00" },
      sunday: { start: "", end: "" },
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: Implement API call to update doctor settings
      console.log("Saving settings:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white mb-6">
            Profile Settings
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="consultationFee">Consultation Fee</Label>
                <Input
                  id="consultationFee"
                  name="consultationFee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 min-h-[100px]"
                placeholder="Tell patients about your experience and expertise..."
              />
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-[#1f4156] dark:text-white mb-4">
                Availability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.availability).map(([day, schedule]) => (
                  <div key={day} className="flex items-center gap-4">
                    <Label className="w-24 capitalize">{day}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={schedule.start}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            availability: {
                              ...prev.availability,
                              [day]: { ...schedule, start: e.target.value }
                            }
                          }));
                        }}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={schedule.end}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            availability: {
                              ...prev.availability,
                              [day]: { ...schedule, end: e.target.value }
                            }
                          }));
                        }}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#4caf96] hover:bg-[#4caf96]/90 text-white"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 