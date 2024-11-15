// app/test/page.tsx
'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState<string>("Loading...");

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setUserRole("Not logged in");
        return;
      }
      try {
        const publicMetadata = user.publicMetadata;
        const role = publicMetadata.role || "USER";
        setUserRole(role as string);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("Error fetching role");
      }
    };

    if (isLoaded) {
      checkUserRole();
    }
  }, [user, isLoaded]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clerk Metadata Test Page</h1>
      
      <div className="space-y-4">
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-3">User Information:</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="font-medium">{user?.firstName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium">{user?.lastName || "Not provided"}</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user?.primaryEmailAddress?.emailAddress || "No email"}</p>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-600">User ID</p>
              <p className="font-medium">{user?.id || "Not logged in"}</p>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium">{userRole}</p>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-3">Public Metadata:</h2>
          <pre className="bg-gray-100 p-2 mt-2 rounded overflow-x-auto text-sm">
            {JSON.stringify(user?.publicMetadata || {}, null, 2)}
          </pre>
        </div>

        {user?.imageUrl && (
          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-3">Profile Image:</h2>
            <img 
              src={user.imageUrl} 
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}