import type { PolicyAcceptance } from '@/types';

const STORAGE_KEY = 'policyAcceptances';

export function saveAcceptance(data: PolicyAcceptance): void {
  if (typeof window === 'undefined') return;
  try {
    const existingAcceptances = getAcceptances();
    const updatedAcceptances = [...existingAcceptances, data];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAcceptances));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function getAcceptances(): PolicyAcceptance[] {
  if (typeof window === 'undefined') return [];
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
}
