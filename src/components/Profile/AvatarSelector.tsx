import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import apiService from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarSelectorProps {
  onAvatarChange?: (avatarUrl: string) => void;
}

const AvatarSelector = ({ onAvatarChange }: AvatarSelectorProps) => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    loadAvatars();
  }, []);

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
        onAvatarChange?.(selectedAvatar);
      }
    } catch (error) {
      toast.error('Помилка оновлення аватарки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Оберіть аватарку</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {avatars.map((avatarUrl, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                selectedAvatar === avatarUrl
                  ? 'border-brewords-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAvatarSelect(avatarUrl)}
            >
              <img
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className="w-full h-16 object-cover rounded"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleSaveAvatar}
          disabled={!selectedAvatar || loading}
          className="w-full"
        >
          {loading ? 'Збереження...' : 'Зберегти аватарку'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AvatarSelector;