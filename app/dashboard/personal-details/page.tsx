"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  getPersonalDetails,
  savePersonalDetails,
  PersonalDetails,
} from "@/app/actions/personal";

export default function PersonalDetailsPage() {
  const [details, setDetails] = useState<PersonalDetails>({
    employeeNo: "",
    surname: "",
    fullName: "",
    nicNo: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    civilStatus: "",
    address: "",
    mobileNo: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    const res = await getPersonalDetails();

    if (res.success) {
      if (res.data) {
        setDetails(res.data);
      } else if (res.employeeNo) {
        setDetails((prev) => ({ ...prev, employeeNo: res.employeeNo }));
      }
    } else {
      console.error(res.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await savePersonalDetails(details);
    if (res.success) {
      setIsEditing(false);
      await fetchDetails();
    } else {
      alert("Error saving details: " + res.error);
    }
    setSaving(false);
  };

  const fields: { key: keyof PersonalDetails; label: string; type?: string }[] =
    [
      { key: "employeeNo", label: "Employee No" },
      { key: "surname", label: "Surname" },
      { key: "fullName", label: "Full Name" },
      { key: "nicNo", label: "NIC No" },
      { key: "dateOfBirth", label: "Date of Birth", type: "date" },
      { key: "gender", label: "Gender" },
      { key: "maritalStatus", label: "Marital Status" },
      { key: "civilStatus", label: "Civil Status" },
      { key: "address", label: "Address" },
      { key: "mobileNo", label: "Mobile No" },
      { key: "email", label: "Email", type: "email" },
    ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Personal Details
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Your personal details in Sri Lanka Telecom (Services)
            </p>
          </div>

          {!loading && (
            <div>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
                >
                  Edit Details
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      fetchDetails();
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-700 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400 font-medium">
            Loading personal details...
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {fields.map(({ key, label, type = "text" }) => (
              <div key={key} className="grid grid-cols-3 py-3.5 items-center">
                <span className="font-semibold text-gray-900 text-sm">
                  {label}
                </span>
                <div className="col-span-2 text-sm text-gray-700 font-medium">
                  {isEditing ? (
                    <input
                      type={type}
                      name={key}
                      value={details[key] || ""}
                      onChange={handleChange}
                      disabled={key === "employeeNo"}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  ) : (
                    <span>{details[key] || "--"}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
