import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { rollAbilityScore, getModifier, formatModifier, getProficiencyBonus } from '../utils/diceUtils';
import { ABILITY_SCORES } from '../data/rpgData';
import ScreenHeader from '../components/ScreenHeader';
import GlowCard from '../components/GlowCard';
import { useState } from 'react';

export default function ClassDetailScreen() {
  const nav   = useNavigation();
  const route = useRoute();
  const { cls } = route.params;

  const [rolledStats, setRolledStats] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleRollStats = () => {
    const rolled = ABILITY_SCORES.map(ab => ({
      ...ab,
      ...rollAbilityScore(),
    }));
    setRolledStats(rolled);
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={cls.name} subtitle={cls.description} onBack={() => nav.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* ── HERO ───────────────────────────── */}
          <LinearGradient
            colors={[cls.color + '50', cls.color + '15', 'transparent']}
            style={styles.hero}
          >
            <Text style={styles.heroIcon}>{cls.icon}</Text>
            <View style={styles.heroBadges}>
              <Badge label="Dado de Vida" value={cls.hitDie} color={cls.color} />
              <Badge label="Proficiência" value={`+${getProficiencyBonus(1)}`} color={cls.color} />
            </View>
          </LinearGradient>

          {/* ── PRIMARY STATS ──────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={cls.color}>
              <Text style={styles.cardTitle}>💪 Atributos Primários</Text>
              <View style={styles.primaryStats}>
                {cls.primaryStats.map(stat => (
                  <View key={stat} style={[styles.primaryStatBadge, { backgroundColor: cls.color + '25', borderColor: cls.color }]}>
                    <Text style={[styles.primaryStatText, { color: cls.color }]}>{stat}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.primaryStatNote}>
                Maximize estes atributos ao criar seu personagem para melhor desempenho.
              </Text>
            </GlowCard>
          </View>

          {/* ── FEATURES ───────────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={cls.color + '80'}>
              <Text style={styles.cardTitle}>⚡ Habilidades de Classe</Text>
              {cls.features.map((f, i) => (
                <View key={f} style={[styles.featureRow, i < cls.features.length - 1 && styles.featureRowBorder]}>
                  <View style={[styles.featureNum, { backgroundColor: cls.color + '30' }]}>
                    <Text style={[styles.featureNumText, { color: cls.color }]}>{i + 1}</Text>
                  </View>
                  <Text style={styles.featureName}>{f}</Text>
                </View>
              ))}
            </GlowCard>
          </View>

          {/* ── SAVING THROWS ──────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={COLORS.gold + '80'} style={{ backgroundColor: '#1a1200' }}>
              <Text style={styles.cardTitle}>🛡️ Salvaguardas</Text>
              <Text style={styles.saveNote}>
                Esta classe tem proficiência em salvaguardas de:
              </Text>
              <View style={styles.saveBadges}>
                {cls.savingThrows.map(s => (
                  <View key={s} style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>{s}</Text>
                  </View>
                ))}
              </View>
            </GlowCard>
          </View>

          {/* ── STAT ROLLER ────────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={cls.color}>
              <View style={styles.statRollerHeader}>
                <Text style={styles.cardTitle}>🎲 Gerar Atributos</Text>
                <TouchableOpacity
                  onPress={handleRollStats}
                  style={[styles.rollBtn, { backgroundColor: cls.color }]}
                >
                  <Text style={styles.rollBtnText}>
                    {rolledStats ? 'Rolar Novamente' : 'Rolar 4d6↓'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.statRollerNote}>
                Método 4d6 descarta o menor dado — padrão D&D 5e.
              </Text>

              {rolledStats && (
                <View style={styles.statsGrid}>
                  {rolledStats.map(stat => {
                    const mod = getModifier(stat.total);
                    const isPrimary = cls.primaryStats.includes(stat.name);
                    return (
                      <View
                        key={stat.name}
                        style={[
                          styles.statBox,
                          isPrimary && { borderColor: cls.color, backgroundColor: cls.color + '15' },
                        ]}
                      >
                        <Text style={styles.statIcon}>{stat.icon}</Text>
                        <Text style={styles.statName}>{stat.abbr}</Text>
                        <Text style={[styles.statValue, isPrimary && { color: cls.color }]}>
                          {stat.total}
                        </Text>
                        <Text style={[styles.statMod, { color: mod >= 0 ? COLORS.success : COLORS.danger }]}>
                          {formatModifier(mod)}
                        </Text>
                        <Text style={styles.statRolls}>[{stat.kept.join(',')}]</Text>
                        {isPrimary && <Text style={[styles.primaryBadge, { color: cls.color }]}>★</Text>}
                      </View>
                    );
                  })}
                </View>
              )}
            </GlowCard>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function Badge({ label, value, color }) {
  return (
    <View style={[badgeStyles.wrap, { borderColor: color + '80' }]}>
      <Text style={badgeStyles.label}>{label}</Text>
      <Text style={[badgeStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },
  cardTitle: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.md },

  hero: { alignItems: 'center', paddingVertical: SPACING.xxl, gap: SPACING.lg },
  heroIcon: { fontSize: 64 },
  heroBadges: { flexDirection: 'row', gap: SPACING.md },

  primaryStats:     { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  primaryStatBadge: { borderWidth: 1.5, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  primaryStatText:  { fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.md },
  primaryStatNote:  { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontStyle: 'italic' },

  featureRow:       { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  featureNum:       { width: 28, height: 28, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  featureNumText:   { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  featureName:      { color: COLORS.textPrimary, fontSize: FONTS.sizes.md },

  saveNote:    { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginBottom: SPACING.sm },
  saveBadges:  { flexDirection: 'row', gap: SPACING.sm },
  saveBadge:   { backgroundColor: COLORS.goldDim + '30', borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  saveBadgeText: { color: COLORS.gold, fontWeight: FONTS.weights.bold, fontSize: FONTS.sizes.sm },

  statRollerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.xs },
  rollBtn:       { borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  rollBtnText:   { color: '#fff', fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  statRollerNote: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginBottom: SPACING.md },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  statBox: {
    width: '30%',
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    alignItems: 'center',
    gap: 2,
  },
  statIcon:    { fontSize: 16 },
  statName:    { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  statValue:   { color: COLORS.textPrimary, fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.black },
  statMod:     { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  statRolls:   { color: COLORS.textMuted, fontSize: 9 },
  primaryBadge: { fontSize: 10, fontWeight: FONTS.weights.bold },
});

const badgeStyles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
  },
  label: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  value: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.black },
});
