"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useUsers } from "@/src/hooks/useUsers";
import { CreateUserPayload } from "@/src/types/users";
interface Props {
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ setAddOpen }: Props) {
  const { addUser } = useUsers();

  const [formData, setFormData] = useState<CreateUserPayload>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addUser(formData);

    setAddOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Add Member</h2>

          <button
            type="button"
            onClick={() => setAddOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Personal Information */}

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Full Name
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Leanne Graham"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Username
                  </label>

                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Leanne"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="leanne@example.com"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Phone
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-000-1234"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Website
                  </label>

                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="example.com"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Address */}

              <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1">
                Address
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Street
                  </label>

                  <input
                    name="street"
                    type="text"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    placeholder="123 Main St"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    City
                  </label>

                  <input
                    name="city"
                    type="text"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    placeholder="New York"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Zipcode
                  </label>

                  <input
                    name="zipcode"
                    type="text"
                    value={formData.address.zipcode}
                    onChange={handleAddressChange}
                    placeholder="10001"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Company */}

              <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider pt-1">
                Company
              </p>

              <div className="mt-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Company Name
                </label>

                <input
                  name="name"
                  type="text"
                  value={formData.company.name}
                  onChange={handleCompanyChange}
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setAddOpen(false)}
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
