import React from 'react';
import { Button, Linking, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';

export default function PrivacyPolicyScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827', padding: 24 }}>
      <ThemedText style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: palette.tint }}>Privacy Policy</ThemedText>
      <ThemedText style={{ fontSize: 16, marginBottom: 24, textAlign: 'center', color: '#ffffff' }}>
        Read our privacy policy at the link below:
      </ThemedText>
      <Button
        title="Open Privacy Policy"
        color={palette.tint}
        onPress={() => Linking.openURL('https://javierfolder.com/privacy-policy.html')}
      />
    </View>
  );
}
