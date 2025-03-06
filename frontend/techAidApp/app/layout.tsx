import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{
          title: 'Sign Up',
          presentation: 'modal'  // or 'card' for standard navigation
        }} 
      />
      <Stack.Screen 
        name="signin" 
        options={{
          title: 'Sign In',
          presentation: 'modal'  // or 'card' for standard navigation
        }} 
      />
    </Stack>
  );
}