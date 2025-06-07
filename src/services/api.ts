import { toast } from "sonner";

const API_BASE_URL = "https://localhost:5000/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
    console.log('Token set:', token); // Додаєте цей рядок
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : `HTTP error! status: ${response.status}`);
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  }

  // Auth methods
  async register(userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    // Мапимо поля під DTO бекенду
    return this.request('/Auth/register', {
      method: 'POST',
      body: JSON.stringify({
        Username: userData.name,
        Email: userData.email,
        Password: userData.password,
        PasswordRepeat: userData.confirmPassword,
      }),
    });
  }

  async login(credentials: { email: string; password: string }) {
    // Swagger: POST /api/Auth/login
    return this.request('/Auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    this.removeToken();
    return { data: { message: 'Logged out successfully' } };
  }

  // Account methods (profile)
  async getProfile() {
    // Swagger: GET /api/Account/info
    const response = await this.request('/Account/info');
    console.log('Profile response:', response); // Додає логування
    return response;
  }

  async updateProfile(profileData: any) {
    // Swagger: PUT /api/Account/info
    return this.request('/Account/info', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async updateAvatar(avatarUrl: string) {
    // Swagger: PATCH /api/Account/avatar
    return this.request(`/Account/avatar?avatarUrl=${encodeURIComponent(avatarUrl)}`, {
      method: 'PATCH',
    });
  }

  async updatePhone(phoneData: any) {
    // Swagger: PATCH /api/Account/phone
    return this.request('/Account/phone', {
      method: 'PATCH',
      body: JSON.stringify(phoneData),
    });
  }

  async updateBirthdate(birthdateData: any) {
    // Swagger: PATCH /api/Account/birthdate
    return this.request('/Account/birthdate', {
      method: 'PATCH',
      body: JSON.stringify(birthdateData),
    });
  }

  // Avatars
  async getAvatars() {
    // Swagger: GET /api/Avatars
    return this.request('/Avatars');
  }

  async addAvatar(avatarData: any) {
    // Swagger: POST /api/Avatars
    return this.request('/Avatars', {
      method: 'POST',
      body: JSON.stringify(avatarData),
    });
  }

  // Додамо загальний метод для категорій
  async getCategories() {
    return this.request('/Categories/approved');
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;
