import axios from '@/lib/axios';
import { UserProfile } from './types';

// Cache for the user profile data
let cachedProfile: UserProfile | null = null;
let profileCacheTime: number | null = null;
// Cache expiry time in milliseconds (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000;

const userProfileService = {
  /**
   * Fetches the user profile from the API
   * @param forceRefresh If true, bypasses the cache and fetches fresh data
   * @param mode Optional mode parameter (individual or organization)
   * @returns Promise with the user profile data
   */
  fetchUserProfile: async (forceRefresh = false, mode?: string): Promise<UserProfile> => {
    try {
      // Check if we have a cached profile that's not expired and forceRefresh is not requested
      const currentTime = Date.now();
      if (!forceRefresh && cachedProfile && profileCacheTime && currentTime < profileCacheTime + CACHE_EXPIRY) {
        return cachedProfile;
      }

      // Extract mode from URL params if not provided and we're in browser
      let userMode = mode;
      if (!userMode && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        userMode = urlParams.get('mode') || 'individual';
      }

      // Build URL with mode parameter
      const url = '/api/auth/me';
      const { data } = await axios.get(url);

      // Update cache
      cachedProfile = data;
      profileCacheTime = currentTime;

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  /**
   * Stores the user profile in localStorage and updates the memory cache
   * @param profile The user profile to store
   */
  storeUserProfile: (profile: UserProfile): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
    // Update in-memory cache
    cachedProfile = profile;
    profileCacheTime = Date.now();
  },

  /**
   * Retrieves the user profile from localStorage and updates the memory cache if found
   * @returns The stored user profile or null if not found
   */
  getStoredUserProfile: (): UserProfile | null => {
    // First check if we have a valid in-memory cache
    if (cachedProfile && profileCacheTime && Date.now() < profileCacheTime + CACHE_EXPIRY) {
      return cachedProfile;
    }

    if (typeof window !== 'undefined') {
      const profileData = localStorage.getItem('userProfile');
      if (profileData) {
        try {
          const parsedProfile = JSON.parse(profileData) as UserProfile;
          // Update in-memory cache with the profile from localStorage
          cachedProfile = parsedProfile;
          profileCacheTime = Date.now();
          return parsedProfile;
        } catch (error) {
          console.error('Error parsing stored user profile:', error);
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Clears the stored user profile from localStorage and memory cache
   */
  clearUserProfile: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile');
    }
    // Clear in-memory cache
    cachedProfile = null;
    profileCacheTime = null;
  }
};

export default userProfileService;
