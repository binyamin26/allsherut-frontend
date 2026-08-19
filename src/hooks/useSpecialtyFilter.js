import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// Filtre côté client la liste des prestataires déjà chargée pour un service,
// à partir du paramètre ?specialty=<valeur hébraïque> posé par la barre de
// recherche de la homepage (ex: "aquarium" -> ניקוי ותחזוקת אקווריומים).
// On cherche la valeur dans le JSON complet du provider (service_details,
// availability, etc.) pour rester correct quelle que soit la clé de filtre
// réellement utilisée côté backend pour ce service.
export function useSpecialtyFilter(providers) {
  const location = useLocation();

  const specialty = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('specialty') || null;
  }, [location.search]);

  const filteredProviders = useMemo(() => {
    if (!specialty) return providers;
    return providers.filter((provider) => {
      try {
        return JSON.stringify(provider).includes(specialty);
      } catch {
        return true;
      }
    });
  }, [providers, specialty]);

  return { filteredProviders, specialty };
}
