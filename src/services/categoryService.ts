import apiService from './api';

export interface Category {
  id: string;
  name: string;
  isApproved: boolean;
  wordsCount: number;
  sentenceCount: number;
  createdDate: string;
  imageUrl?: string;
}

export const categoryService = {
  async getApprovedCategories(): Promise<Category[]> {
    try {
      const response = await fetch('https://localhost:5000/api/Categories/approved', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }
};