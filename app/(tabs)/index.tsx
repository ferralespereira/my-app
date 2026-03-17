import { Image } from 'expo-image';
import { useMemo, useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const SKILLS = [
  {
    title: 'PHP',
    subtitle: 'Laravel',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'],
  },
  {
    title: 'Python',
    subtitle: 'Django, Flask',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'],
  },
  {
    title: 'TypeScript',
    subtitle: 'Angular',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'],
  },
  {
    title: 'JavaScript',
    subtitle: 'Node.js, jQuery',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'],
  },
  {
    title: 'HTML',
    subtitle: 'Semantic Markup, Accessibility',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'],
  },
  {
    title: 'CSS',
    subtitle: 'Tailwind, SCSS, Responsive Design',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'],
  },
  {
    title: 'Bootstrap',
    subtitle: 'Responsive UI Framework',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'],
  },
  {
    title: 'C# & ASP.net',
    subtitle: 'Full-Stack Windows',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'],
  },
  {
    title: 'SQL & Databases',
    subtitle: 'MySQL, MongoDb, MariaDB',
    icons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    ],
  },
  {
    title: 'AWS Services',
    subtitle: 'EC2, Route53, CloudFront',
    icons: ['https://javierfolder.com/aws.webp'],
    paddedIcon: true,
  },
  {
    title: 'Linux OS',
    subtitle: 'System Administration, Docker',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'],
  },
  {
    title: 'Angular & Frontend',
    subtitle: 'Responsive Design',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg'],
  },
  {
    title: 'Git / Version Control',
    subtitle: 'GitHub Mastery',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'],
  },
  {
    title: 'CMS & E-commerce',
    subtitle: 'WordPress, Aimeos',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg'],
    paddedIcon: true,
  },
  {
    title: 'SEO & Analytics',
    subtitle: 'SEM, Google Analytics',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'],
  },
  {
    title: 'Docker',
    subtitle: 'Containerization & DevOps',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'],
  },
  {
    title: 'Kubernetes',
    subtitle: 'Container Orchestration',
    icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'],
  },
];

const FRAMEWORKS = [
  {
    title: 'Laravel',
    subtitle: 'PHP Framework',
    icon: 'https://laravel.com/img/logomark.min.svg',
  },
  {
    title: 'Symfony',
    subtitle: 'PHP Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
    paddedIcon: true,
  },
  {
    title: 'Angular',
    subtitle: 'TypeScript Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
  },
  {
    title: 'Node.js',
    subtitle: 'JavaScript Runtime',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    title: 'Django',
    subtitle: 'Python Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    paddedIcon: true,
  },
  {
    title: 'Flask',
    subtitle: 'Python Microframework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    paddedIcon: true,
  },
  {
    title: 'jQuery',
    subtitle: 'JavaScript Library',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  },
  {
    title: 'ASP.NET',
    subtitle: 'C# Web Framework',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_.NET_logo.png',
    paddedIcon: true,
  },
];

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'summary' | 'teach' | 'frameworks'>('home');
  const [sectionOffsets, setSectionOffsets] = useState({ home: 0, summary: 0, teach: 0, frameworks: 0 });
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const introTitleSize = width >= 1024 ? 64 : width >= 760 ? 54 : width >= 520 ? 44 : 15;
  const introTitleLineHeight = width >= 1024 ? 72 : width >= 760 ? 60 : width >= 520 ? 50 : 24;
  const badgeSize = width >= 760 ? 196 : width >= 520 ? 176 : 140;
  const bulletFontSize = width >= 760 ? 22 : width >= 520 ? 19 : 16;
  const bulletLineHeight = width >= 760 ? 28 : width >= 520 ? 25 : 22;
  const introLeadSize = width >= 760 ? 20 : 15;
  const introLeadLineHeight = width >= 760 ? 28 : 24;
  const skillCardWidth = width >= 1280 ? '17%' : width >= 1024 ? '22%' : width >= 760 ? '30%' : width >= 520 ? '46%' : '48%';
  const frameworkCardWidth = width >= 1024 ? '17%' : width >= 760 ? '30%' : width >= 520 ? '46%' : '48%';

  const surface = useMemo(
    () => ({
      borderColor: scheme === 'light' ? '#1f2937' : '#3b82f6',
      backgroundColor: scheme === 'light' ? '#ffffff' : '#1f2937',
    }),
    [scheme],
  );

  const scrollToSection = (section: 'home' | 'summary' | 'teach' | 'frameworks') => {
    setActiveSection(section);
    const y = Math.max(sectionOffsets[section] - 12, 0);
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <View style={[styles.screen, { backgroundColor: '#111827' }]}> 
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: '#111827' }}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}>
        <ThemedView style={[styles.introHero, { backgroundColor: '#111827' }]}> 
          <View style={styles.introContent}>
            <View style={styles.introHeadingRow}>
              <Image
                source={{ uri: 'https://javierfolder.com/jf.jpeg' }}
                style={[styles.profileImage, { borderColor: palette.tint }]}
                contentFit="cover"
              />
              <ThemedText
                style={[
                  styles.introTitle,
                  {
                    fontFamily: Fonts.rounded,
                    fontSize: introTitleSize,
                    lineHeight: introTitleLineHeight,
                    color: '#ffffff',
                  },
                ]}>
                Hello, I&apos;m{' '}
                <ThemedText
                  style={[
                    styles.introName,
                    {
                      color: palette.tint,
                      fontSize: introTitleSize,
                      lineHeight: introTitleLineHeight,
                    },
                  ]}>
                  Javier Ferrales
                </ThemedText>
              </ThemedText>
            </View>

            <Image
              source={{ uri: 'https://javierfolder.com/AI-Practitioner.webp' }}
              style={[styles.badgeImage, { height: badgeSize, width: badgeSize }]}
              contentFit="contain"
            />

            <View style={styles.bulletList}>
              <ThemedText style={[styles.bulletItem, { fontSize: bulletFontSize, lineHeight: bulletLineHeight, color: '#ffffff' }]}> 
                - Full-Stack Web Developer
              </ThemedText>
              <ThemedText style={[styles.bulletItem, { fontSize: bulletFontSize, lineHeight: bulletLineHeight, color: '#ffffff' }]}> 
                - Cloud Certificate Practitioner
              </ThemedText>
            </View>

            <ThemedText style={[styles.introLead, { fontSize: introLeadSize, lineHeight: introLeadLineHeight, color: '#ffffff' }]}> 
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

        <ThemedView
        style={[styles.sectionCard, { backgroundColor: '#1f2937', borderWidth: 0 }]}
        onLayout={({ nativeEvent }) => {
          const y = nativeEvent.layout.y;
          setSectionOffsets((prev) => ({
            ...prev,
            summary: y,
          }));
        }}>

        <View style={[styles.aboutGrid, isWide && styles.aboutGridWide]}>
          <ThemedView
            style={[
              styles.aboutSummaryCard,
              {
                backgroundColor: '#1f2937',
                borderWidth: 0,
              },
            ]}>
            <ThemedText style={[styles.aboutSummaryTitle, { color: palette.tint }]}>Summary & Expertise</ThemedText>

            <ThemedText lightColor="#ffffff" darkColor="#ffffff" style={styles.aboutParagraph}>
              I am a focused professional in developing robust web architecture, content, and platforms across both Backend and Frontend. My expertise spans multiple languages including PHP, Python, JavaScript, TypeScript, and HTML.
            </ThemedText>

            {!isAboutExpanded && (
              <Pressable onPress={() => setIsAboutExpanded(true)}>
                <ThemedText style={[styles.learnMoreText, { color: palette.tint }]}>Learn more -&gt;</ThemedText>
              </Pressable>
            )}

            {isAboutExpanded && (
              <>
                <ThemedText lightColor="#ffffff" darkColor="#ffffff" style={styles.aboutParagraph}>
                  I&apos;m passionate about building scalable applications using modern <ThemedText type="defaultSemiBold" lightColor="#ffffff" darkColor="#ffffff">MVC architecture frameworks</ThemedText> like Laravel, Symfony, Angular, Node.js, and Django. I have significant experience with both <ThemedText type="defaultSemiBold" lightColor="#ffffff" darkColor="#ffffff">MongoDB</ThemedText> and relational databases such as <ThemedText type="defaultSemiBold" lightColor="#ffffff" darkColor="#ffffff">MySQL</ThemedText> and MariaDB, ensuring effective data creation and manipulation using SQL.
                </ThemedText>

                <ThemedText lightColor="#ffffff" darkColor="#ffffff" style={styles.aboutParagraph}>
                  Furthermore, I possess a <ThemedText type="defaultSemiBold" lightColor="#ffffff" darkColor="#ffffff">Cloud Certificate Practitioner</ThemedText> status and experience with Linux OS. I am proficient in implementing essential <ThemedText type="defaultSemiBold" lightColor="#ffffff" darkColor="#ffffff">AWS services</ThemedText> (Route53, EC2, EBS, Load Balancer, Cloudfront, RDS) and utilize Git/GitHub for version control. I am driven to push every project to its highest level of performance and availability.
                </ThemedText>

                <Pressable onPress={() => setIsAboutExpanded(false)}>
                  <ThemedText style={[styles.learnMoreText, { color: palette.tint }]}>Show less &lt;-</ThemedText>
                </Pressable>
              </>
            )}
          </ThemedView>
        </View>
      </ThemedView>

        <ThemedView
        style={[styles.sectionCard, { backgroundColor: '#111827', borderWidth: 0 }]}
        onLayout={({ nativeEvent }) => {
          const y = nativeEvent.layout.y;
          setSectionOffsets((prev) => ({
            ...prev,
            teach: y,
          }));
        }}>
        <View style={styles.sectionHeadingWrap}>
          <ThemedText style={[styles.sectionHeading, { borderColor: palette.tint, color: '#ffffff' }]}> 
            Tech Stack & Computer Skills
          </ThemedText>
        </View>

        <View style={styles.skillsGrid}>
          {SKILLS.map((skill) => (
            <ThemedView
              key={skill.title}
              style={[
                styles.skillCard,
                {
                  width: skillCardWidth,
                  backgroundColor: '#1f2937',
                },
              ]}>
              <View style={[styles.skillIconRow, skill.icons.length > 1 && styles.skillIconRowMultiple]}>
                {skill.icons.map((icon) => (
                  <Image
                    key={icon}
                    source={{ uri: icon }}
                    style={[styles.skillIcon, skill.paddedIcon && styles.skillIconPadded]}
                    contentFit="contain"
                  />
                ))}
              </View>
              <ThemedText lightColor="#ffffff" darkColor="#ffffff" style={styles.skillTitle}>
                {skill.title}
              </ThemedText>
              <ThemedText lightColor="#9ca3af" darkColor="#9ca3af" style={styles.skillSubtitle}>
                {skill.subtitle}
              </ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

        <ThemedView
        style={[styles.sectionCard, { backgroundColor: '#111827', borderWidth: 0 }]}
        onLayout={({ nativeEvent }) => {
          const y = nativeEvent.layout.y;
          setSectionOffsets((prev) => ({
            ...prev,
            frameworks: y,
          }));
        }}>
        <View style={styles.sectionHeadingWrap}>
          <ThemedText style={[styles.sectionHeading, { borderColor: palette.tint, color: '#ffffff' }]}>Frameworks</ThemedText>
        </View>

        <View style={[styles.skillsGrid, styles.frameworksGrid]}>
          {FRAMEWORKS.map((framework) => (
            <ThemedView
              key={framework.title}
              style={[
                styles.frameworkCard,
                {
                  width: frameworkCardWidth,
                  backgroundColor: '#1f2937',
                },
              ]}>
              <Image
                source={{ uri: framework.icon }}
                style={[styles.skillIcon, framework.paddedIcon && styles.skillIconPadded]}
                contentFit="contain"
              />
              <ThemedText style={[styles.frameworkTitle, { color: palette.tint }]}>
                {framework.title}
              </ThemedText>
              <ThemedText lightColor="#9ca3af" darkColor="#9ca3af" style={styles.skillSubtitle}>
                {framework.subtitle}
              </ThemedText>
            </ThemedView>
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

      <View style={[styles.fixedTabsBar, surface]}>
        <View style={styles.sectionTabsRow}>
          <Pressable
            style={[
              styles.sectionTabButton,
              { borderColor: palette.tint },
              activeSection === 'home' && [styles.sectionTabButtonActive, { backgroundColor: palette.tint }],
            ]}
            onPress={() => scrollToSection('home')}>
            <ThemedText
              style={[
                styles.sectionTabButtonText,
                { color: palette.tint },
                activeSection === 'home' && styles.sectionTabButtonTextActive,
              ]}>
              Home
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.sectionTabButton,
              { borderColor: palette.tint },
              activeSection === 'summary' && [styles.sectionTabButtonActive, { backgroundColor: palette.tint }],
            ]}
            onPress={() => scrollToSection('summary')}>
            <ThemedText
              style={[
                styles.sectionTabButtonText,
                { color: palette.tint },
                activeSection === 'summary' && styles.sectionTabButtonTextActive,
              ]}>
              Sumary
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.sectionTabButton,
              { borderColor: palette.tint },
              activeSection === 'teach' && [styles.sectionTabButtonActive, { backgroundColor: palette.tint }],
            ]}
            onPress={() => scrollToSection('teach')}>
            <ThemedText
              style={[
                styles.sectionTabButtonText,
                { color: palette.tint },
                activeSection === 'teach' && styles.sectionTabButtonTextActive,
              ]}>
              Teach
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.sectionTabButton,
              { borderColor: palette.tint },
              activeSection === 'frameworks' && [styles.sectionTabButtonActive, { backgroundColor: palette.tint }],
            ]}
            onPress={() => scrollToSection('frameworks')}>
            <ThemedText
              style={[
                styles.sectionTabButtonText,
                { color: palette.tint },
                activeSection === 'frameworks' && styles.sectionTabButtonTextActive,
              ]}>
              Frameworks
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  page: {
    padding: 16,
    gap: 12,
    paddingBottom: 110,
  },
  introHero: {
    borderWidth: 0,
    borderRadius: 20,
    padding: 18,
    justifyContent: 'center',
    marginTop: 32,
  },
  introContent: {
    alignItems: 'center',
    gap: 12,
  },
  introHeadingRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  introTitle: {
    textAlign: 'left',
    fontWeight: '800',
    maxWidth: 920,
    flexShrink: 1,
  },
  introName: {
    fontWeight: '900',
  },
  badgeImage: {
    borderRadius: 8,
  },
  bulletList: {
    width: '100%',
    maxWidth: 420,
    gap: 6,
  },
  bulletItem: {
    textAlign: 'left',
    fontWeight: '700',
  },
  introLead: {
    textAlign: 'left',
    maxWidth: 640,
  },
  introActions: {
    marginTop: 6,
    gap: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  sectionTabsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sectionTabButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sectionTabButtonText: {
    fontSize: 8,
    fontWeight: '700',
  },
  sectionTabButtonActive: {
    borderColor: 'transparent',
  },
  sectionTabButtonTextActive: {
    color: '#ffffff',
  },
  fixedTabsBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
  },
  sectionHeadingWrap: {
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    textAlign: 'center',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  aboutGrid: {
    gap: 12,
  },
  aboutGridWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  aboutProfileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 64,
    borderWidth: 4,
    padding: 4,
    marginBottom: 0,
  },
  profileLocation: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  profileLink: {
    fontSize: 14,
    lineHeight: 20,
  },
  aboutSummaryCard: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    gap: 8,
  },
  aboutSummaryTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 6,
  },
  aboutParagraph: {
    fontSize: 17,
    lineHeight: 28,
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  frameworksGrid: {
    justifyContent: 'center',
  },
  skillCard: {
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 148,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  skillIconRow: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillIconRowMultiple: {
    flexDirection: 'row',
    gap: 8,
  },
  skillIcon: {
    width: 38,
    height: 38,
  },
  skillIconPadded: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
  },
  skillTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  skillSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  frameworkCard: {
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 144,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  frameworkTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
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
    fontSize: 12,
  },
  ctaOutline: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ctaOutlineText: {
    fontWeight: '700',
    fontSize: 12,
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
});
