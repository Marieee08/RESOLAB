'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface ClientInfo {
  id: number;
  ContactNum: string;
  Address: string | null;
  City: string | null;
  Province: string | null;
  Zipcode: number | null;
}

interface BusinessInfo {
  id: number;
  CompanyName: string | null;
  BusinessOwner: string | null;
  BusinessPermitNum: string | null;
  TINNum: string | null;
  CompanyIDNum: string | null;
  CompanyEmail: string | null;
  ContactPerson: string | null;
  Designation: string | null;
  CompanyAddress: string | null;
  CompanyCity: string | null;
  CompanyProvince: string | null;
  CompanyZipcode: number | null;
  CompanyPhoneNum: string | null;
  CompanyMobileNum: string | null;
  Manufactured: string | null;
  ProductionFrequency: string | null;
  Bulk: string | null;
}

interface AccInfo {
  id: number;
  clerkId: string;
  Name: string;
  email: string;
  Role: string;
  ClientInfo: ClientInfo | null;
  BusinessInfo: BusinessInfo | null;
}

export default function TestPage() {
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState<string>("Loading...");
  const [accInfo, setAccInfo] = useState<AccInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch AccInfo with related data
        const response = await fetch(`/api/account/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch account data');
        }
        const data = await response.json();
        setAccInfo(data);

        // Set user role from Clerk metadata
        const publicMetadata = user.publicMetadata;
        const role = publicMetadata.role;
        setUserRole(role as string);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchAllData();
    }
  }, [user, isLoaded]);

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h2 className="font-semibold mb-3 text-lg border-b pb-2">{title}</h2>
      {content}
    </div>
  );

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Database Test Page</h1>

      {/* Clerk User Information */}
      {renderSection("Clerk User Information", (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Clerk ID</p>
            <p className="font-medium">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="font-medium">{userRole}</p>
          </div>
        </div>
      ))}

      {/* AccInfo */}
      {renderSection("Account Information", (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Database ID</p>
            <p className="font-medium">{accInfo?.id || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Name in Database</p>
            <p className="font-medium">{accInfo?.Name || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email in Database</p>
            <p className="font-medium">{accInfo?.email || "Not found"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Database Role</p>
            <p className="font-medium">{accInfo?.Role || "Not found"}</p>
          </div>
        </div>
      ))}

      {/* Client Information */}
      {renderSection("Client Information", (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Contact Number</p>
            <p className="font-medium">{accInfo?.ClientInfo?.ContactNum || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium">{accInfo?.ClientInfo?.Address || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="font-medium">{accInfo?.ClientInfo?.City || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Province</p>
            <p className="font-medium">{accInfo?.ClientInfo?.Province || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Zipcode</p>
            <p className="font-medium">{accInfo?.ClientInfo?.Zipcode || "Not provided"}</p>
          </div>
        </div>
      ))}

      {/* Business Information */}
      {renderSection("Business Information", (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Company Name</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.CompanyName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Business Owner</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.BusinessOwner || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Business Permit Number</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.BusinessPermitNum || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">TIN Number</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.TINNum || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Company Email</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.CompanyEmail || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Contact Person</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.ContactPerson || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Designation</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.Designation || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Company Address</p>
            <p className="font-medium">{accInfo?.BusinessInfo?.CompanyAddress || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Manufacturing Details</p>
            <p className="font-medium">
              Products: {accInfo?.BusinessInfo?.Manufactured || "Not provided"}<br />
              Frequency: {accInfo?.BusinessInfo?.ProductionFrequency || "Not provided"}<br />
              Bulk: {accInfo?.BusinessInfo?.Bulk || "Not provided"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}