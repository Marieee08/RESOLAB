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
        // Get the user's metadata which should contain their role
        const publicMetadata = user.publicMetadata;
        const role = publicMetadata.role || "USER"; // Default to USER if no role is set
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
          <h2 className="font-semibold">Account Information:</h2>
          <p>User ID: {user?.id || "Not logged in"}</p>
          <p>Email: {user?.primaryEmailAddress?.emailAddress || "No email"}</p>
          <p>Role: {userRole}</p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-semibold">All Metadata:</h2>
          <pre className="bg-gray-100 p-2 mt-2 rounded">
            {JSON.stringify(user?.publicMetadata || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}