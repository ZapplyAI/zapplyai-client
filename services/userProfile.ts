import axios from '@/lib/axios';
import { UserProfile } from './types';

const userProfileService = {
  /**
   * Fetches the user profile from the API
   * @returns Promise with the user profile data
   */
  fetchUserProfile: async (): Promise<UserProfile> => {
    try {
      const { data } = await axios.get('/api/auth/me');
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  /**
   * Stores the user profile in localStorage
   * @param profile The user profile to store
   */
  storeUserProfile: (profile: UserProfile): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  },

  /**
   * Retrieves the user profile from localStorage
   * @returns The stored user profile or null if not found
   */
  getStoredUserProfile: (): UserProfile | null => {
    if (typeof window !== 'undefined') {
      const profileData = localStorage.getItem('userProfile');
      if (profileData) {
        try {
          return JSON.parse(profileData) as UserProfile;
        } catch (error) {
          console.error('Error parsing stored user profile:', error);
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Clears the stored user profile from localStorage
   */
  clearUserProfile: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile');
    }
  }
};

export default userProfileService;
