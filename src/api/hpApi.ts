import type { Character } from '../types/HPCharacter';

export const HPapi = {
  url: 'https://hp-api.onrender.com/api',

  async getAllCharct(): Promise<Character[]> {
    try {
      const response = await fetch(`${this.url}/characters`);
      if (!response.ok) throw new Error('Не удалось загрузить данные');
      const characters = await response.json();
      return characters;
    } catch (error) {
      console.error('Ошибка загрузки персонажей:', error);
      return [];
    }
  },

  async getCharacterByName(name: string): Promise<Character | null> {
    try {
      const all = await this.getAllCharct();
      return all.find(c => c.name.toLowerCase() === name.toLowerCase()) || null;
    } catch {
      return null;
    }
  }
};
