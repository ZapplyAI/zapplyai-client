import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import userProfileService from '@/services/userProfile';
import { UserProfile } from '@/services/types';

/**
 * Custom hook to manage user profile data
 * Fetches profile from API when user is authenticated and stores it in localStorage
 */
export const useUserProfile = () => {
  const { user, error, isLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<Error | null>(null);

  useEffect(() => {
    // Only fetch profile if user is authenticated
    if (user && !isLoading && !error) {
      // Check if we have a stored profile first
      const storedProfile = userProfileService.getStoredUserProfile();

      if (storedProfile) {
        setProfile(storedProfile);
      }

      // Fetch fresh profile data from API if:
      // 1. We don't have a stored profile, or
      // 2. This is after a login (user object changed)
      const shouldFetchProfile = !storedProfile || user?.sub !== storedProfile?.id;

      if (shouldFetchProfile) {
        const fetchProfile = async () => {
          setIsProfileLoading(true);
          setProfileError(null);

          try {
            const profileData = await userProfileService.fetchUserProfile();
            setProfile(profileData);
            userProfileService.storeUserProfile(profileData);
          } catch (err) {
            console.error('Error in useUserProfile hook:', err);
            setProfileError(err instanceof Error ? err : new Error('Failed to fetch user profile'));

            // If we have a stored profile, keep using it despite the error
            if (!profile && storedProfile) {
              setProfile(storedProfile);
            }
          } finally {
            setIsProfileLoading(false);
          }
        };

        fetchProfile();
      }
    } else if (!user && !isLoading) {
      // Clear profile when user is not authenticated
      setProfile(null);
      userProfileService.clearUserProfile();
    }
  }, [user, isLoading, error, profile]);

  return {
    profile,
    isProfileLoading: isLoading || isProfileLoading,
    profileError,
    refreshProfile: async () => {
      if (user) {
        setIsProfileLoading(true);
        setProfileError(null);

        try {
          const profileData = await userProfileService.fetchUserProfile();
          setProfile(profileData);
          userProfileService.storeUserProfile(profileData);
        } catch (err) {
          console.error('Error refreshing user profile:', err);
          setProfileError(err instanceof Error ? err : new Error('Failed to refresh user profile'));

          // If we have a stored profile, keep using it despite the error
          const storedProfile = userProfileService.getStoredUserProfile();
          if (!profile && storedProfile) {
            setProfile(storedProfile);
          }
        } finally {
          setIsProfileLoading(false);
        }
      }
    }
  };
};

export default useUserProfile;
