"use client";

import React, { useEffect, useState } from "react";
import { FiCamera, FiUser } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import APiClient from "@/api/ApiClient";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image?: string;
  address: Address;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEdit, setIsEdit] = useState(false);

  const userId = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await APiClient.get(`/profile/getprofile/${userId}`);
        if (res.data) {
          setProfile(res.data);
          setIsEdit(true);
        }
      } catch (err) {
        console.log("No existing profile found.");
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (["street", "city", "state", "country", "pincode"].includes(field)) {
      setProfile((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 50 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("File size must be less than 50KB. Please choose a smaller image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfile((prev) => ({
        ...prev,
        image: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!userId) {
      toast.error("User ID not found in session.");
      return;
    }

    try {
      if (isEdit) {
        await APiClient.put(`/profile/updateprofile/${userId}`, profile);
        toast.success("Profile updated successfully!");
      } else {
        await APiClient.post(`/profile/createprofile`, { ...profile, userId });
        toast.success("Profile created successfully!");
        setIsEdit(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-600 p-6 text-white">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="mt-2 opacity-90">Manage your personal information and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 bg-gray-50 p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    {profile.image ? (
                      <Image
                        src={profile.image}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-colors">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FiCamera className="w-4 h-4" />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {profile.firstName || "User"} {profile.lastName}
                  </h3>
                  {isEdit && (
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => toast("You can now edit and update your profile")}
                    >
                      ✏️
                    </button>
                  )}
                </div>
                <p className="text-gray-600">{profile.email || "user@example.com"}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Profile Settings
                </button>
              </nav>
            </div>

            <div className="lg:w-3/4 p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Settings</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Fields */}
                    {["firstName", "lastName", "email", "phone"].map((field) => (
                      <div className="space-y-2" key={field}>
                        <label className="text-sm font-medium text-gray-700 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={(profile as any)[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder={`Enter ${field}`}
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      </div>
                    ))}

                    {/* Address Fields */}
                    {["street", "city", "state", "country", "pincode"].map((field) => (
                      <div className="space-y-2" key={field}>
                        <label className="text-sm font-medium text-gray-700 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={profile.address[field as keyof Address]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder={`Enter ${field}`}
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
