
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Language } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LanguageSettings: React.FC = () => {
  const [nativeLanguage, setNativeLanguage] = useState('uk');
  const [learningLanguage, setLearningLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const nativeLanguages: LanguageOption[] = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const learningLanguages: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const handleSave = async () => {
    if (nativeLanguage === learningLanguage) {
      toast.error('Рідна мова та мова для вивчення не можуть бути однаковими');
      return;
    }

    setIsLoading(true);
    
    // Захардкоджена логіка збереження мов
    setTimeout(() => {
      toast.success('Налаштування мов збережено');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Language className="w-5 h-5" />
          <span>Налаштування мов</span>
        </CardTitle>
        <CardDescription>
          Оберіть вашу рідну мову та мову для вивчення
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="native-language">Ваша рідна мова (мова перекладу)</Label>
          <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть вашу рідну мову" />
            </SelectTrigger>
            <SelectContent>
              {nativeLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Мова, на якій будуть показані переклади слів на флеш-карточках
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="learning-language">Мова для вивчення</Label>
          <Select value={learningLanguage} onValueChange={setLearningLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть мову для вивчення" />
            </SelectTrigger>
            <SelectContent>
              {learningLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Мова, слова якої ви будете вивчати
          </p>
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Збереження...' : 'Зберегти налаштування'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings;
