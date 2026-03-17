import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type CatalogProject = {
  name: string;
  url: string;
  github?: string;
  frameworks: string[];
  languages: string[];
};

const PROJECTS: CatalogProject[] = [
  { name: 'Del Toro Insurance', url: 'https://deltoroinsurance.com', frameworks: ['Wordpress'], languages: ['PHP'] },
  { name: 'IMS Del Toro Insurance', url: 'https://ims.deltoroinsurance.com', frameworks: ['Laravel'], languages: ['PHP'] },
  { name: 'Django Project', url: 'https://django.javierfolder.com', frameworks: ['Django'], languages: ['Python'] },
  { name: 'MyShop', url: 'https://myshop.javierfolder.com', frameworks: ['Yii3'], languages: ['PHP'] },
  { name: 'Yii3 Project', url: 'https://yii.javierfolder.com', frameworks: ['Yii3'], languages: ['PHP'] },
  { name: 'Pci Dashboard', url: 'https://pci.javierfolder.com', frameworks: ['React'], languages: ['JavaScript'] },
  { name: 'VentureTeach Solutions', url: 'https://test.javierfolder.com', frameworks: ['Wordpress'], languages: ['PHP'] },
  { name: 'IT Servicios', url: 'https://it.javierfolder.com', frameworks: ['HTML/CSS/JS'], languages: [] },
  { name: 'Beauty Wordpress', url: 'https://beauty.javierfolder.com', frameworks: ['Wordpress'], languages: ['PHP'] },
  { name: 'Laravel Shop', url: 'https://shop.javierfolder.com', frameworks: ['Laravel'], languages: ['PHP'] },
  { name: 'Cabinets Wordpress', url: 'https://cabinets.javierfolder.com', frameworks: ['Wordpress'], languages: [] },
  { name: 'Taxes Wordpress', url: 'https://taxes.javierfolder.com', frameworks: ['Wordpress'], languages: [] },
  { name: 'Travel Wordpress', url: 'https://travel.javierfolder.com', frameworks: ['Wordpress'], languages: ['PHP'] },
  { name: 'Chat Flask', url: 'https://chat.javierfolder.com', frameworks: ['Flask'], languages: ['Python'] },
  { name: 'Fuel Control', url: 'https://fuelcontrol.javierfolder.com', frameworks: ['Laravel'], languages: ['PHP', 'JavaScript'] },
  { name: 'Foro', url: 'https://foro.javierfolder.com', frameworks: ['Angular', 'Node.js'], languages: ['JavaScript'] },
  { name: 'Video', url: 'https://video.javierfolder.com', frameworks: ['Angular', 'Symfony'], languages: ['JavaScript', 'PHP'] },
  { name: 'My Gallery', url: 'https://asp.javierfolder.com', frameworks: ['ASP.NET'], languages: ['C#'] },
];

const FRAMEWORK_ICONS: Record<string, string> = {
  Laravel: 'https://laravel.com/img/logomark.min.svg',
  Django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  Flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  Angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Symfony: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
  Wordpress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg',
  Yii3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yii/yii-original.svg',
  'HTML/CSS/JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'ASP.NET': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_.NET_logo.png',
};

export default function CatalogScreen() {
  const { width } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const allFrameworks = useMemo(
    () => [...new Set(PROJECTS.flatMap((project) => project.frameworks))].sort(),
    [],
  );
  const allLanguages = useMemo(
    () => [...new Set(PROJECTS.flatMap((project) => project.languages))].sort(),
    [],
  );

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const filterMatch =
        activeFilter === 'all' ||
        project.frameworks.some((fw) => fw.toLowerCase() === activeFilter) ||
        project.languages.some((lang) => lang.toLowerCase() === activeFilter);
      const searchBlob = `${project.name} ${project.frameworks.join(' ')} ${project.languages.join(' ')}`.toLowerCase();
      const searchMatch = q.length === 0 || searchBlob.includes(q);
      return filterMatch && searchMatch;
    });
  }, [activeFilter, query]);

  const cardWidth = width >= 1280 ? '23%' : width >= 1024 ? '31%' : width >= 760 ? '48%' : '48%';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.hero}>
        <ThemedText style={styles.heroTitle}>
          Projects <ThemedText style={styles.heroTitleAccent}>Catalog</ThemedText>
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          A full directory of web projects, live demos, and technology stacks.
        </ThemedText>
        <View style={styles.statsRow}>
          <ThemedText style={styles.statText}> 
            <ThemedText style={styles.statNumber}>{PROJECTS.length}</ThemedText> projects
          </ThemedText>
          <ThemedText style={styles.statText}> 
            <ThemedText style={styles.statNumber}>{allFrameworks.length}</ThemedText> frameworks
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.controlsWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search projects..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />

        <View style={styles.filtersWrap}>
          <Pressable
            onPress={() => setActiveFilter('all')}
            style={[styles.filterButton, activeFilter === 'all' && styles.filterButtonActive]}>
            <ThemedText style={[styles.filterButtonText, activeFilter === 'all' && styles.filterButtonTextActive]}>
              All
            </ThemedText>
          </Pressable>

          {allFrameworks.map((fw) => {
            const key = fw.toLowerCase();
            const isActive = activeFilter === key;
            return (
              <Pressable key={fw} onPress={() => setActiveFilter(key)} style={[styles.filterButton, isActive && styles.filterButtonActive]}>
                <ThemedText style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>{fw}</ThemedText>
              </Pressable>
            );
          })}

          {allLanguages.map((lang) => {
            const key = lang.toLowerCase();
            const isActive = activeFilter === key;
            return (
              <Pressable key={lang} onPress={() => setActiveFilter(key)} style={[styles.filterButton, isActive && styles.filterButtonActive]}>
                <ThemedText style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>{lang}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>

      <View style={styles.grid}>
        {filteredProjects.map((project) => (
          <ThemedView key={project.name} style={[styles.card, { width: cardWidth }]}> 
            <View style={styles.cardHeader}>
              <View style={styles.iconRow}>
                {project.frameworks.slice(0, 2).map((fw) => (
                  <Image
                    key={`${project.name}-${fw}`}
                    source={{ uri: FRAMEWORK_ICONS[fw] }}
                    style={styles.frameworkIcon}
                    contentFit="contain"
                  />
                ))}
              </View>
              <ThemedText style={styles.cardTitle}>{project.name}</ThemedText>
            </View>

            <View style={styles.badgesRow}>
              {project.frameworks.map((fw) => (
                <View key={`${project.name}-${fw}-fw`} style={styles.frameworkBadge}>
                  <ThemedText style={styles.badgeText}>{fw}</ThemedText>
                </View>
              ))}
              {project.languages.map((lang) => (
                <View key={`${project.name}-${lang}-lang`} style={styles.languageBadge}>
                  <ThemedText style={styles.badgeText}>{lang}</ThemedText>
                </View>
              ))}
            </View>

            <ThemedText style={styles.urlText}>{project.url}</ThemedText>

            <View style={styles.cardActions}>
              <Pressable onPress={() => Linking.openURL(project.url)} style={styles.linkButton}>
                <ThemedText style={styles.linkButtonText}>Live Demo</ThemedText>
              </Pressable>
              {project.github && (
                <Pressable onPress={() => Linking.openURL(project.github as string)} style={styles.ghostButton}>
                  <ThemedText style={styles.ghostButtonText}>Source</ThemedText>
                </Pressable>
              )}
            </View>
          </ThemedView>
        ))}
      </View>

      {filteredProjects.length === 0 && <ThemedText style={styles.emptyState}>No projects match your filter.</ThemedText>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  page: {
    padding: 16,
    paddingTop: 40,
    gap: 14,
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderColor: '#1f2937',
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 40,
    fontWeight: '800',
    color: '#f3f4f6',
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: '#3b82f6',
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#9ca3af',
    textAlign: 'center',
    maxWidth: 640,
  },
  statsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 20,
  },
  statText: {
    color: '#9ca3af',
  },
  statNumber: {
    color: '#f3f4f6',
    fontWeight: '800',
  },
  controlsWrap: {
    gap: 12,
    backgroundColor: '#111827',
  },
  searchInput: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    color: '#f3f4f6',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filtersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#374151',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    color: '#d1d5db',
    fontSize: 13,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 6,
  },
  frameworkIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 2,
  },
  cardTitle: {
    flex: 1,
    color: '#f3f4f6',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 18,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  frameworkBadge: {
    backgroundColor: '#1e3a8a',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  languageBadge: {
    backgroundColor: '#78350f',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#dbeafe',
    fontSize: 10,
    fontWeight: '600',
  },
  urlText: {
    color: '#6b7280',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
  },
  linkButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  linkButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
  ghostButton: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  ghostButtonText: {
    color: '#d1d5db',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
});
