import React from "react";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as SecureStore from "expo-secure-store";
import { View, Text, StyleSheet } from "react-native";

// Check if Convex URL is properly configured
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const isConvexConfigured = convexUrl && convexUrl.startsWith('https://');

// Only create Convex client if URL is configured
const convex = isConvexConfigured ? new ConvexReactClient(convexUrl) : null;

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore getToken error:", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore saveToken error:", error);
    }
  },
  async deleteToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("SecureStore deleteToken error:", error);
    }
  },
};

function ConvexProviderWithAuth({ children }: { children: React.ReactNode }) {
  // If Convex is not configured, show a setup message
  if (!convex) {
    return (
      <View style={styles.setupContainer}>
        <View style={styles.setupCard}>
          <Text style={styles.setupTitle}>Setup Required</Text>
          <Text style={styles.setupText}>
            To use this app, you need to configure Convex and Clerk.
          </Text>
          <Text style={styles.setupText}>
            Please follow the setup instructions in SETUP.md
          </Text>
          <Text style={styles.setupStep}>
            1. Set up your Convex project{'\n'}
            2. Set up your Clerk application{'\n'}
            3. Add environment variables to .env.local
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If Clerk is not configured, show setup message
  if (!publishableKey) {
    return (
      <View style={styles.setupContainer}>
        <View style={styles.setupCard}>
          <Text style={styles.setupTitle}>Setup Required</Text>
          <Text style={styles.setupText}>
            To use this app, you need to configure Convex and Clerk.
          </Text>
          <Text style={styles.setupText}>
            Please follow the setup instructions in SETUP.md
          </Text>
          <Text style={styles.setupStep}>
            1. Set up your Convex project{'\n'}
            2. Set up your Clerk application{'\n'}
            3. Add environment variables to .env.local
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ConvexProviderWithAuth>
          {children}
        </ConvexProviderWithAuth>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default AuthProvider;

const styles = StyleSheet.create({
  setupContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  setupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  setupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  setupText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'center',
  },
  setupStep: {
    fontSize: 14,
    color: '#888',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    lineHeight: 20,
  },
});