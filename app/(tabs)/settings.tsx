import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { LogOut, User, Mail, Shield } from 'lucide-react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [imageLoadError, setImageLoadError] = React.useState(false);

  React.useEffect(() => {
    // Reset image error state when user image URL changes
    setImageLoadError(false);
  }, [user?.imageUrl]);

  const handleSignOut = async () => {
    console.log("Sign out button pressed");
    
    // For web, use window.confirm; for native, use Alert
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) {
        await performSignOut();
      }
    } else {
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Sign Out",
            style: "destructive",
            onPress: performSignOut,
          },
        ]
      );
    }
  };

  const performSignOut = async () => {
    console.log("Confirming sign out");
    setIsSigningOut(true);
    try {
      console.log("Starting sign out process");
      
      // Clear any cached tokens first
      try {
        await Promise.all([
          SecureStore.deleteItemAsync("__clerk_client_jwt"),
          SecureStore.deleteItemAsync("__clerk_db_jwt"),
          SecureStore.deleteItemAsync("__clerk_session_jwt"),
        ]);
        console.log("Tokens cleared");
      } catch (tokenError) {
        console.log("Token cleanup error (ignorable):", tokenError);
      }
      
      // Sign out from Clerk - this will trigger the automatic redirect in _layout.tsx
      await signOut();
      console.log("Clerk sign out completed - automatic redirect should happen");
      
    } catch (error) {
      console.error("Sign out error:", error);
      if (Platform.OS === 'web') {
        window.alert("Failed to sign out. Please try again.");
      } else {
        Alert.alert("Error", "Failed to sign out. Please try again.");
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              {user?.imageUrl && !imageLoadError ? (
                <Image 
                  source={{ uri: user.imageUrl }} 
                  style={styles.avatar}
                  onError={() => {
                    console.log('Profile image failed to load');
                    setImageLoadError(true);
                  }}
                />
              ) : (
                <User size={32} color="#6B7280" strokeWidth={1.5} />
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
              </Text>
              <View style={styles.profileDetail}>
                <Mail size={14} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.profileEmail}>
                  {user?.primaryEmailAddress?.emailAddress || 'No email'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#6B7280" strokeWidth={2} />
            <Text style={styles.menuText}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.signOutItem, isSigningOut && styles.disabledItem]}
            onPress={() => {
              console.log("TouchableOpacity pressed, isSigningOut:", isSigningOut);
              if (!isSigningOut) {
                handleSignOut();
              }
            }}
            activeOpacity={0.7}
          >
            {isSigningOut ? (
              <ActivityIndicator size={20} color="#EF4444" />
            ) : (
              <LogOut size={20} color="#EF4444" strokeWidth={2} />
            )}
            <Text style={[styles.menuText, styles.signOutText]}>
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Version 1.0.0
          </Text>
          <Text style={styles.sectionText}>
            Built with Expo, Convex, and Clerk
          </Text>
          <Text style={styles.sectionText}>
            Real-time sync across all your devices
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  signOutItem: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    color: '#EF4444',
  },
  disabledItem: {
    opacity: 0.6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});