import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">ABOUT</ThemedText>
      </ThemedView>
      <ThemedText>TechAidApp is designed to simplify the process of re-purposing gadgets you no longer use. Our platform connects donors with recipients, providing a seamless way to ensure technology continues to benefit those who need it. </ThemedText>
      <Collapsible title="Features of the App">
        <ThemedText>
        Key Features of the TechAidApp:
          <ThemedText type="defaultSemiBold">
        - Easy gadget donation process
        - Secure and reliable matching system for donors and recipients
        - Support for multiple types of gadgets and categories
        - Up-to-date tracking of donation status and history</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title=" TechAidApp Mission">
        <ThemedText>
        At TechAidApp, our mission is to bridge the gap between technological excess and need. By facilitating gadget donations, we aim to reduce electronic waste and support communities with updated technology.
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="App Values">
        <ThemedText>
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
          We value transparency, sustainability, and community support. Through TechAidApp, you can make a tangible impact, contribute to a sustainable future, and help those in need get access to vital technology.
          </ThemedText>
        </ThemedText>
       
      </Collapsible>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});