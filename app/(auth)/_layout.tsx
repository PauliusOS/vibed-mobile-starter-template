import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="sign-in" 
        options={{ 
          title: "Sign In",
          headerBackTitle: "Back"
        }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ 
          title: "Sign Up",
          headerBackTitle: "Back"
        }} 
      />
    </Stack>
  );
}