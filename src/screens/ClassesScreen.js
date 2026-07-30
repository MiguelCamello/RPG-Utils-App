import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { CHARACTER_CLASSES } from '../data/rpgData';
import ScreenHeader from '../components/ScreenHeader';

export default function ClassesScreen() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Classes"
        subtitle="Escolha seu caminho de aventura"
        icon="⚔️"
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.intro}>
            Cada classe representa uma especialização única. Escolha com base no seu estilo de jogo!
          </Text>
        </View>

        {CHARACTER_CLASSES.map(cls => (
          <TouchableOpacity
            key={cls.name}
            style={styles.card}
            onPress={() => nav.navigate('ClassDetail', { cls })}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[cls.color + '30', cls.color + '10', COLORS.bgCard]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.cardGrad}
            >
              {/* Left accent */}
              <View style={[styles.accentBar, { backgroundColor: cls.color }]} />

              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <Text style={styles.classIcon}>{cls.icon}</Text>
                  <View style={styles.classInfo}>
                    <Text style={[styles.className, { color: cls.color }]}>{cls.name}</Text>
                    <Text style={styles.classHitDie}>Dado de Vida: {cls.hitDie}</Text>
                  </View>
                  <View style={styles.statsRight}>
                    {cls.primaryStats.map(stat => (
                      <View key={stat} style={[styles.statBadge, { borderColor: cls.color + '80' }]}>
                        <Text style={[styles.statBadgeText, { color: cls.color }]}>{stat.slice(0, 3).toUpperCase()}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text style={styles.classDesc}>{cls.description}</Text>

                {/* Feature Pills */}
                <View style={styles.featurePills}>
                  {cls.features.slice(0, 3).map(f => (
                    <View key={f} style={[styles.pill, { borderColor: cls.color + '50' }]}>
                      <Text style={[styles.pillText, { color: cls.color }]}>{f}</Text>
                    </View>
                  ))}
                  {cls.features.length > 3 && (
                    <View style={[styles.pill, { borderColor: COLORS.border }]}>
                      <Text style={styles.pillTextMuted}>+{cls.features.length - 3}</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.cardArrow}>›</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },

  intro: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  card: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  accentBar: { width: 4, alignSelf: 'stretch', borderRadius: 2 },
  cardContent: { flex: 1, gap: SPACING.sm },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  classIcon:    { fontSize: 28 },
  classInfo:    { flex: 1 },
  className:    { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  classHitDie:  { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginTop: 1 },
  statsRight:   { flexDirection: 'column', gap: SPACING.xs },
  statBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
    alignItems: 'center',
  },
  statBadgeText: { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
  classDesc:     { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 18 },
  featurePills:  { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs },
  pill: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  pillText:    { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium },
  pillTextMuted: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  cardArrow:   { color: COLORS.textMuted, fontSize: 28, paddingLeft: SPACING.xs },
});
