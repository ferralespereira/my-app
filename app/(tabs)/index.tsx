import { useMemo } from 'react';
import { Image } from 'expo-image';
import { Linking, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const SKILLS = [
  'PHP / Laravel',
  'Python / Django / Flask',
  'TypeScript / Angular',
  'JavaScript / Node.js',
  'MySQL / MongoDB / MariaDB',
  'AWS / Linux / Docker',
];

const PROJECTS = [
  {
    name: 'Fuel Company Inventory System',
    stack: 'Laravel, MySQL, Deployment',
    description: 'Inventory workflows and reporting for operational teams.',
  },
  {
    name: 'Angular + Node Dev Forum',
    stack: 'Angular, Node.js, MongoDB',
    description: 'Community platform for technical discussions and code sharing.',
  },
  {
    name: 'Flask Real-Time Chat',
    stack: 'Flask, Socket.IO',
    description: 'Lightweight messaging app with real-time communication.',
  },
];

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const { width, height } = useWindowDimensions();
  const isWide = width >= 760;

  const surface = useMemo(
    () => ({
      borderColor: scheme === 'light' ? '#1f2937' : '#3b82f6',
      backgroundColor: scheme === 'light' ? '#ffffff' : '#1f2937',
    }),
    [scheme],
  );

  return (
    <ScrollView
      style={{ backgroundColor: palette.background }}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      <ThemedView style={[styles.introHero, surface, { minHeight: height * 0.84 }]}>
        <View style={styles.introContent}>
          <ThemedText style={[styles.introTitle, { fontFamily: Fonts.rounded }]}>
            Hello, I&apos;m <ThemedText style={[styles.introName, { color: palette.tint }]}>Javier Ferrales</ThemedText>
          </ThemedText>

          <Image
            source={{ uri: 'https://javierfolder.com/AI-Practitioner.webp' }}
            style={styles.badgeImage}
            contentFit="contain"
          />

          <View style={styles.bulletList}>
            <ThemedText style={styles.bulletItem}>- Full-Stack Web Developer</ThemedText>
            <ThemedText style={styles.bulletItem}>- Cloud Certificate Practitioner</ThemedText>
          </View>

          <ThemedText style={styles.introLead}>
            With a focus on scalable architecture and enterprise solutions.
          </ThemedText>

          <View style={[styles.introActions, isWide && styles.introActionsWide]}>
            <Pressable
              onPress={() => Linking.openURL('https://javierfolder.com/#projects')}
              style={[styles.cta, styles.introPrimaryCta, { backgroundColor: palette.tint }]}>
              <ThemedText style={styles.ctaText}>View My Projects</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL('https://javierfolder.com/#contact')}
              style={[styles.ctaOutline, { borderColor: palette.tint }]}>
              <ThemedText style={[styles.ctaOutlineText, { color: palette.tint }]}>Get In Touch</ThemedText>
            </Pressable>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.hero, surface]}>
        <View style={[styles.glow, styles.glowOne, { backgroundColor: '#3b82f6' }]} />
        <View style={[styles.glow, styles.glowTwo, { backgroundColor: '#1f2937' }]} />

        <ThemedText style={[styles.kicker, { color: palette.tint }]}>JAVIERFOLDER STYLE VIEW</ThemedText>
        <ThemedText style={[styles.heroTitle, { fontFamily: Fonts.rounded }]}>
          Hello, I&apos;m Javier Ferrales
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Full-stack developer focused on scalable architecture, platform quality, and cloud-ready
          delivery.
        </ThemedText>

        <View style={[styles.badgeRow, isWide && styles.badgeRowWide]}>
          <View style={[styles.badge, { borderColor: palette.tint, backgroundColor: '#3b82f620' }]}>
            <ThemedText style={styles.badgeText}>Full-Stack Web Developer</ThemedText>
          </View>
          <View style={[styles.badge, { borderColor: palette.tint, backgroundColor: '#3b82f620' }]}>
            <ThemedText style={styles.badgeText}>Cloud Practitioner</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, surface]}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText>
          I build robust backend and frontend solutions with a strong focus on maintainability,
          performance, and business impact. I enjoy turning complex requirements into reliable,
          production-ready systems.
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, surface]}>
        <ThemedText type="subtitle">Tech Stack</ThemedText>
        <View style={[styles.chipWrap, isWide && styles.chipWrapWide]}>
          {SKILLS.map((skill) => (
            <View key={skill} style={[styles.chip, { borderColor: palette.icon }]}>
              <ThemedText style={styles.chipText}>{skill}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, surface]}>
        <ThemedText type="subtitle">Featured Projects</ThemedText>
        <View style={styles.projectsWrap}>
          {PROJECTS.map((project) => (
            <View key={project.name} style={[styles.projectCard, { borderColor: palette.icon }]}>
              <ThemedText style={styles.projectName}>{project.name}</ThemedText>
              <ThemedText style={[styles.projectStack, { color: palette.tint }]}>
                {project.stack}
              </ThemedText>
              <ThemedText>{project.description}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, surface]}>
        <ThemedText type="subtitle">Get In Touch</ThemedText>
        <ThemedText>Email: ferralespereira@gmail.com</ThemedText>
        <View style={styles.ctaRow}>
          <Pressable style={[styles.cta, { backgroundColor: palette.tint }]}>
            <ThemedText style={styles.ctaText}>View Projects</ThemedText>
          </Pressable>
          <Pressable style={[styles.ctaOutline, { borderColor: palette.tint }]}>
            <ThemedText style={[styles.ctaOutlineText, { color: palette.tint }]}>Get In Touch</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  introHero: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    justifyContent: 'center',
  },
  introContent: {
    alignItems: 'center',
    gap: 12,
  },
  introTitle: {
    fontSize: 44,
    lineHeight: 50,
    textAlign: 'center',
    fontWeight: '800',
  },
  introName: {
    fontWeight: '900',
  },
  badgeImage: {
    height: 220,
    width: 220,
    borderRadius: 8,
  },
  bulletList: {
    width: '100%',
    maxWidth: 420,
    gap: 6,
  },
  bulletItem: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  introLead: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    maxWidth: 640,
  },
  introActions: {
    marginTop: 6,
    gap: 10,
    width: '100%',
  },
  introActionsWide: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introPrimaryCta: {
    shadowColor: '#3b82f6',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 8,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    opacity: 0.13,
  },
  glowOne: {
    right: -60,
    top: -90,
  },
  glowTwo: {
    left: -80,
    bottom: -120,
  },
  kicker: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 23,
    maxWidth: 680,
  },
  badgeRow: {
    marginTop: 8,
    gap: 8,
  },
  badgeRowWide: {
    flexDirection: 'row',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  chipWrap: {
    gap: 8,
  },
  chipWrapWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  projectsWrap: {
    gap: 10,
  },
  projectCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 5,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '700',
  },
  projectStack: {
    fontSize: 13,
    fontWeight: '700',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  cta: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ctaText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  ctaOutline: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ctaOutlineText: {
    fontWeight: '700',
  },
});
