import { useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Goal = {
  id: string;
  label: string;
  done: boolean;
};

const INITIAL_GOALS: Goal[] = [
  { id: '1', label: 'Drink 2L of water', done: false },
  { id: '2', label: 'Read for 20 minutes', done: true },
  { id: '3', label: 'Take a 30 minute walk', done: false },
];

export default function PlannerScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [input, setInput] = useState('');

  const completed = goals.filter((goal) => goal.done).length;
  const progress = goals.length === 0 ? 0 : completed / goals.length;

  const progressLabel = useMemo(() => {
    const percentage = Math.round(progress * 100);
    return `${completed}/${goals.length} complete (${percentage}%)`;
  }, [completed, goals.length, progress]);

  const toggleGoal = (id: string) => {
    setGoals((current) =>
      current.map((goal) => (goal.id === id ? { ...goal, done: !goal.done } : goal)),
    );
  };

  const addGoal = () => {
    const label = input.trim();
    if (!label) {
      return;
    }

    setGoals((current) => [{ id: `${Date.now()}`, label, done: false }, ...current]);
    setInput('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <ThemedView style={[styles.hero, { borderColor: palette.icon }]}>
        <ThemedText type="title" style={[styles.heroTitle, { fontFamily: Fonts.rounded }]}>
          Daily Planner
        </ThemedText>
        <ThemedText>{progressLabel}</ThemedText>
        <View style={[styles.progressTrack, { backgroundColor: palette.icon }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.max(progress * 100, goals.length ? 12 : 0)}%`,
                backgroundColor: palette.tint,
              },
            ]}
          />
        </View>
      </ThemedView>

      <ThemedView style={[styles.card, { borderColor: palette.icon }]}>
        <ThemedText type="subtitle">Add a goal</ThemedText>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ex: 10 minutes stretching"
          placeholderTextColor={palette.icon}
          style={[
            styles.input,
            {
              borderColor: palette.icon,
              color: palette.text,
              backgroundColor: palette.background,
            },
          ]}
        />
        <Pressable
          onPress={addGoal}
          style={[styles.addButton, { backgroundColor: palette.tint }]}>
          <ThemedText style={styles.addButtonLabel}>Add Goal</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={[styles.card, { borderColor: palette.icon }]}>
        <ThemedText type="subtitle">Today</ThemedText>
        {goals.map((goal) => (
          <Pressable
            key={goal.id}
            onPress={() => toggleGoal(goal.id)}
            style={[styles.goalItem, { borderColor: palette.icon }]}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: palette.tint,
                  backgroundColor: goal.done ? palette.tint : 'transparent',
                },
              ]}
            />
            <ThemedText
              style={[
                styles.goalLabel,
                goal.done && { textDecorationLine: 'line-through', opacity: 0.65 },
              ]}>
              {goal.label}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 34,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    opacity: 0.25,
  },
  progressFill: {
    height: '100%',
    minWidth: 0,
    borderRadius: 999,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#ffffff',
    fontWeight: '700',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
  },
  goalLabel: {
    flex: 1,
  },
});