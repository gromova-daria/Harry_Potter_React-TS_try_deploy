import type { Character } from '../types/HPCharacter';

export const HPapi = {
  url: 'https://hp-api.onrender.com/api',

  async getAllCharct(): Promise<Character[]> {
    try {
      const response = await fetch(`${this.url}/characters`);
      if (!response.ok) throw new Error('Не удалось загрузить данные');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Ошибка загрузки персонажей:', err);
      return [];
    }
  }
};


