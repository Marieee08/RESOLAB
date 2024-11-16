import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const EditClientModal = ({ 
  isOpen, 
  onClose, 
  clientInfo, 
  onUpdate 
}: { 
  isOpen: boolean;
  onClose: () => void;
  clientInfo: any;
  onUpdate: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    ContactNum: clientInfo?.ContactNum || '',
    Address: clientInfo?.Address || '',
    City: clientInfo?.City || '',
    Province: clientInfo?.Province || '',
    Zipcode: clientInfo?.Zipcode || ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/updateClientInfo/${clientInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update information');
      }

      const updatedData = await response.json();
      onUpdate(updatedData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <Input
              type="text"
              name="ContactNum"
              value={formData.ContactNum}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Input
              type="text"
              name="City"
              value={formData.City}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Province</label>
            <Input
              type="text"
              name="Province"
              value={formData.Province}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <Input
              type="text"
              name="Zipcode"
              value={formData.Zipcode}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientModal;