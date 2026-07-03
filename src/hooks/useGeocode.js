import { useState, useRef } from 'react';
import axios from 'axios';

export function useGeocode() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const search = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    // Cancel any in-flight request before starting a new one — important for a type-ahead field,
    // otherwise slow older requests can resolve after newer ones and show stale results.
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: query, format: 'json', limit: 5 },
        signal: abortControllerRef.current.signal,
      });
      setSuggestions(response.data);
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') return; // expected, ignore
      console.error('Geocoding failed:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return { search, suggestions, loading };
}
