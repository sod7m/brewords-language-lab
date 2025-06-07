export interface FlashCard {
  front: string;
  back: string;
}

export const flashCardService = {
  async getFlashCardsByCategory(categoryId: string): Promise<FlashCard[]> {
    try {
      const response = await fetch(`https://localhost:5000/api/FlashCards/category/${categoryId}?originLang=0&destLang=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch flash cards');
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Failed to fetch flash cards:', error);
      throw error;
    }
  }
};