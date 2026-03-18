import React from 'react';
import { Button, Linking, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Privacy Policy</Text>
      <Text style={{ fontSize: 16, marginBottom: 24, textAlign: 'center' }}>
        Read our privacy policy at the link below:
      </Text>
      <Button
        title="Open Privacy Policy"
        onPress={() => Linking.openURL('https://javierfolder.com/privacy-policy.html')}
      />
    </View>
  );
}
