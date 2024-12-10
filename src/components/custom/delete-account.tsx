// components/buttons/DeleteAccountButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

export default function DeleteAccountButton() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
      });

      if (response.ok) {
        await signOut(); 
        router.push('/'); 
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDeleteAccount}
      disabled={isDeleting}
      className={`
        px-4 py-2 rounded font-semibold
        ${isDeleting 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
        }
        text-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      `}
    >
      {isDeleting ? 'Deleting...' : 'Delete Account'}
    </button>
  );
}