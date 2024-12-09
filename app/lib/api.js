"use client";
const API_BASE_URL = "https://api.themoviedb.org/3";
const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/**
 * Funkcja do wykonywania żądań z cache
 */
export async function fetchWithCache(endpoint) {
  const url = `${API_BASE_URL}${endpoint}?api_key=${NEXT_PUBLIC_TMDB_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Response Status: ${response.status}`);
      const errorBody = await response.json();
      console.error(`Error Body:`, errorBody);
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

/**
 * Fetch popular movies
 */
export async function fetchPopularMovies() {
  try {
    const data = await fetchWithCache("/movie/popular");
    return data.results || []; // Wyciągnij tylko tablicę 'results'
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

/**
 * Fetch popular TV shows
 */
export async function fetchPopularTvShows() {
  try {
    const data = await fetchWithCache("/tv/popular");
    return data.results || []; // Wyciągnij tylko tablicę 'results'
  } catch (error) {
    console.error("Failed to fetch TV shows:", error);
    return [];
  }
}
