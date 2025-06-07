import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import apiService from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarModal = ({ isOpen, onClose }: AvatarModalProps) => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      loadAvatars();
    }
  }, [isOpen]);

  const loadAvatars = async () => {
    try {
      const response = await apiService.getAvatars();
      if (response.data) {
        setAvatars(response.data as string[]);
      }
    } catch (error) {
      toast.error('Помилка завантаження аватарок');
    }
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) {
      toast.error('Оберіть аватарку');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.updateAvatar(selectedAvatar);
      if (response.data) {
        toast.success('Аватарка успішно оновлена');
        updateUser({ avatar: selectedAvatar });
        onClose();
        setSelectedAvatar('');
      }
    } catch (error) {
      toast.error('Помилка оновлення аватарки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Оберіть аватарку</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {avatars.map((avatarUrl, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg border-2 p-1 transition-all ${
                  selectedAvatar === avatarUrl
                    ? 'border-brewords-blue bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAvatarSelect(avatarUrl)}
              >
                <img
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-12 object-cover rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSaveAvatar}
              disabled={!selectedAvatar || loading}
              className="flex-1"
            >
              {loading ? 'Збереження...' : 'Зберегти'}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Скасувати
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarModal;