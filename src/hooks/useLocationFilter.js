import { useState, useCallback } from 'react';

// Pas de ville par défaut : tous les prestataires France s'affichent tant que
// le client n'a pas fait de recherche par ville.
const defaultFilter = () => ({ city: '', cityInsee: '', departmentCode: '', neighborhood: '', fullLocation: '' });

// Persists the location filter per service in sessionStorage so it survives
// navigating away (e.g. opening a provider profile) and coming back.
export function useLocationFilter(serviceKey) {
  const storageKey = `locationFilter:${serviceKey}`;

  const [locationFilter, setLocationFilterState] = useState(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore malformed/unavailable storage
    }
    return defaultFilter();
  });

  const setLocationFilter = useCallback((value) => {
    setLocationFilterState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // storage unavailable (e.g. private browsing) - ignore
      }
      return next;
    });
  }, [storageKey]);

  return [locationFilter, setLocationFilter];
}
