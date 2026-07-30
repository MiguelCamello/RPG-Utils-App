import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { MAGIC_SCHOOLS } from '../data/rpgData';
import GlowCard from '../components/GlowCard';
import ScreenHeader from '../components/ScreenHeader';

export default function SpellsScreen() {
  const nav = useNavigation();
  const [search, setSearch] = useState('');
  const [activeSchool, setActiveSchool] = useState(null);

  const filteredSchools = MAGIC_SCHOOLS
    .filter(school => !activeSchool || school.name === activeSchool)
    .map(school => ({
      ...school,
      spells: school.spells.filter(
        spell =>
          spell.name.toLowerCase().includes(search.toLowerCase()) ||
          spell.type.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(school => school.spells.length > 0);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Grimório"
        subtitle="Magias e feitiços arcanos"
        icon="📖"
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── SEARCH ─────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.searchRow}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar magia ou tipo..."
              placeholderTextColor={COLORS.textMuted}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── SCHOOL FILTER ──────────────────── */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.schoolChip, !activeSchool && styles.schoolChipActive]}
              onPress={() => setActiveSchool(null)}
            >
              <Text style={[styles.schoolChipText, !activeSchool && { color: COLORS.primaryGlow }]}>
                ✨ Todas
              </Text>
            </TouchableOpacity>
            {MAGIC_SCHOOLS.map(school => (
              <TouchableOpacity
                key={school.name}
                style={[
                  styles.schoolChip,
                  { borderColor: school.color + '80' },
                  activeSchool === school.name && {
                    backgroundColor: school.color + '30',
                    borderColor: school.color,
                  },
                ]}
                onPress={() => setActiveSchool(s => s === school.name ? null : school.name)}
              >
                <Text style={styles.schoolChipIcon}>{school.icon}</Text>
                <Text style={[styles.schoolChipText, { color: school.color }]}>{school.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── SCHOOLS ────────────────────────── */}
        {filteredSchools.map(school => (
          <View key={school.name} style={styles.section}>
            <GlowCard glowColor={school.color} noPad>
              {/* School Header */}
              <LinearGradient
                colors={[school.color + '40', school.color + '10', 'transparent']}
                style={styles.schoolHeader}
              >
                <Text style={styles.schoolIcon}>{school.icon}</Text>
                <View style={styles.schoolInfo}>
                  <Text style={[styles.schoolName, { color: school.color }]}>{school.name}</Text>
                  <Text style={styles.schoolDesc}>{school.description}</Text>
                </View>
              </LinearGradient>

              {/* Spells */}
              {school.spells.map((spell, i) => (
                <TouchableOpacity
                  key={spell.name}
                  style={[
                    styles.spellRow,
                    i < school.spells.length - 1 && styles.spellRowBorder,
                  ]}
                  onPress={() => nav.navigate('SpellDetail', { spell, schoolColor: school.color })}
                  activeOpacity={0.75}
                >
                  <View style={styles.spellLeft}>
                    <View style={styles.spellLevelBadge}>
                      <Text style={[styles.spellLevelText, { color: school.color }]}>
                        Nv.{spell.level}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.spellName}>{spell.name}</Text>
                      <Text style={styles.spellType}>{spell.type}</Text>
                    </View>
                  </View>
                  <View style={styles.spellRight}>
                    {spell.damage !== '—' && (
                      <Text style={[styles.spellDamage, { color: school.color }]}>{spell.damage}</Text>
                    )}
                    <Text style={styles.spellArrow}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </GlowCard>
          </View>
        ))}

        {filteredSchools.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔮</Text>
            <Text style={styles.emptyText}>Nenhuma magia encontrada</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.lg },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  searchIcon:  { fontSize: 16 },
  searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: FONTS.sizes.md, paddingVertical: SPACING.md },
  clearSearch: { color: COLORS.textMuted, fontSize: FONTS.sizes.md, padding: SPACING.xs },

  // School filter chips
  schoolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.bgCard,
  },
  schoolChipActive: { backgroundColor: COLORS.primary + '30', borderColor: COLORS.primaryGlow },
  schoolChipIcon:   { fontSize: 14 },
  schoolChipText:   { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },

  // School card
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  schoolIcon: { fontSize: 32 },
  schoolInfo: { flex: 1 },
  schoolName: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  schoolDesc: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginTop: 2, lineHeight: 18 },

  // Spell rows
  spellRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  spellRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  spellLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  spellLevelBadge: {
    width: 36, height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spellLevelText: { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
  spellName:      { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  spellType:      { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  spellRight:     { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  spellDamage:    { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  spellArrow:     { color: COLORS.textMuted, fontSize: 22 },

  // Empty
  empty:     { alignItems: 'center', marginTop: 80, gap: SPACING.md },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: COLORS.textMuted, fontSize: FONTS.sizes.lg },
});
