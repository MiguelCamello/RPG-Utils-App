import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import {
  CONDITIONS, MONSTERS, LOOT_TABLES,
  RANDOM_NAMES, ABILITY_SCORES, ENCOUNTER_DIFFICULTY,
} from '../data/rpgData';
import { rollDie, rollDice } from '../utils/diceUtils';
import GlowCard from '../components/GlowCard';
import ScreenHeader from '../components/ScreenHeader';

const TOOLS = [
  { id: 'conditions',  label: 'Condições',           icon: '💀', color: '#8B5CF6' },
  { id: 'monsters',    label: 'Bestiário',            icon: '👹', color: '#EF4444' },
  { id: 'loot',        label: 'Tabela de Loot',       icon: '💰', color: '#F59E0B' },
  { id: 'names',       label: 'Gerador de Nomes',     icon: '🏷️', color: '#06D6A0' },
  { id: 'encounter',   label: 'Dificuldade',          icon: '⚔️', color: '#FF6B6B' },
  { id: 'ability',     label: 'Referência Atributos', icon: '📊', color: '#3B82F6' },
];

export default function ToolsScreen() {
  const [activeTool, setActiveTool] = useState('conditions');
  const [generatedName, setGeneratedName] = useState(null);
  const [generatedLoot, setGeneratedLoot] = useState(null);
  const [expandedMonster, setExpandedMonster] = useState(null);
  const [expandedCondition, setExpandedCondition] = useState(null);

  // ── Name Generator ──────────────────────────
  const generateName = (race) => {
    const list = RANDOM_NAMES[race];
    setGeneratedName({ race, name: list[rollDie(list.length) - 1] });
  };

  // ── Loot Generator ──────────────────────────
  const generateLoot = (tier) => {
    const table = LOOT_TABLES[tier];
    const count = tier === 'legendary' ? 1 : rollDie(3);
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(table[rollDie(table.length) - 1]);
    }
    setGeneratedLoot({ tier, items: [...new Set(items)] });
  };

  const activeTool_ = TOOLS.find(t => t.id === activeTool);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Ferramentas" subtitle="Recursos para sua partida" icon="🛠️" />

      {/* ── TOOL SELECTOR ──────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolSelector}
        contentContainerStyle={styles.toolSelectorContent}
      >
        {TOOLS.map(tool => (
          <TouchableOpacity
            key={tool.id}
            onPress={() => setActiveTool(tool.id)}
            style={[
              styles.toolChip,
              { borderColor: tool.color + '60' },
              activeTool === tool.id && { backgroundColor: tool.color + '25', borderColor: tool.color },
            ]}
          >
            <Text style={styles.toolChipIcon}>{tool.icon}</Text>
            <Text style={[styles.toolChipLabel, activeTool === tool.id && { color: tool.color }]}>
              {tool.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ════════════════════════════════════════
            CONDITIONS
        ════════════════════════════════════════ */}
        {activeTool === 'conditions' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Referência rápida de todas as condições de combate</Text>
            {CONDITIONS.map(cond => (
              <TouchableOpacity
                key={cond.name}
                onPress={() => setExpandedCondition(e => e === cond.name ? null : cond.name)}
                activeOpacity={0.8}
              >
                <View style={[styles.conditionCard, { borderLeftColor: cond.color }]}>
                  <View style={styles.conditionHeader}>
                    <Text style={styles.conditionIcon}>{cond.icon}</Text>
                    <Text style={[styles.conditionName, { color: cond.color }]}>{cond.name}</Text>
                    <Text style={styles.expandArrow}>
                      {expandedCondition === cond.name ? '▲' : '▼'}
                    </Text>
                  </View>
                  {expandedCondition === cond.name && (
                    <Text style={styles.conditionEffect}>{cond.effect}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ════════════════════════════════════════
            MONSTERS
        ════════════════════════════════════════ */}
        {activeTool === 'monsters' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Monstros clássicos com estatísticas rápidas</Text>
            {MONSTERS.map(monster => (
              <TouchableOpacity
                key={monster.name}
                onPress={() => setExpandedMonster(e => e === monster.name ? null : monster.name)}
                activeOpacity={0.8}
              >
                <GlowCard
                  glowColor={COLORS.danger + '60'}
                  style={styles.monsterCard}
                >
                  <View style={styles.monsterHeader}>
                    <Text style={styles.monsterIcon}>{monster.icon}</Text>
                    <View style={styles.monsterInfo}>
                      <Text style={styles.monsterName}>{monster.name}</Text>
                      <Text style={styles.monsterType}>{monster.type}</Text>
                    </View>
                    <View style={styles.monsterStats}>
                      <View style={styles.crBadge}>
                        <Text style={styles.crLabel}>CR</Text>
                        <Text style={styles.crValue}>{monster.cr}</Text>
                      </View>
                    </View>
                  </View>

                  {expandedMonster === monster.name && (
                    <View style={styles.monsterDetail}>
                      <View style={styles.monsterStatRow}>
                        <StatPill label="PV" value={monster.hp} color={COLORS.success} />
                        <StatPill label="CA" value={monster.ac} color={COLORS.info} />
                      </View>
                      <Text style={styles.monsterDesc}>{monster.description}</Text>
                    </View>
                  )}
                </GlowCard>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ════════════════════════════════════════
            LOOT
        ════════════════════════════════════════ */}
        {activeTool === 'loot' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Gere tesouros aleatórios por raridade</Text>

            <View style={styles.lootBtns}>
              {Object.keys(LOOT_TABLES).map(tier => (
                <TouchableOpacity
                  key={tier}
                  onPress={() => generateLoot(tier)}
                  style={[styles.lootBtn, { borderColor: TIER_COLORS[tier] }]}
                >
                  <LinearGradient
                    colors={[TIER_COLORS[tier] + '40', TIER_COLORS[tier] + '10']}
                    style={styles.lootBtnGrad}
                  >
                    <Text style={styles.lootBtnIcon}>{TIER_ICONS[tier]}</Text>
                    <Text style={[styles.lootBtnText, { color: TIER_COLORS[tier] }]}>
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {generatedLoot && (
              <GlowCard glowColor={TIER_COLORS[generatedLoot.tier]} style={styles.lootResult}>
                <Text style={[styles.lootResultTitle, { color: TIER_COLORS[generatedLoot.tier] }]}>
                  {TIER_ICONS[generatedLoot.tier]} Loot {generatedLoot.tier}!
                </Text>
                {generatedLoot.items.map((item, i) => (
                  <View key={i} style={styles.lootItem}>
                    <Text style={styles.lootItemText}>{item}</Text>
                  </View>
                ))}
              </GlowCard>
            )}
          </View>
        )}

        {/* ════════════════════════════════════════
            NAME GENERATOR
        ════════════════════════════════════════ */}
        {activeTool === 'names' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Gere nomes para seu personagem ou NPCs</Text>

            {generatedName && (
              <GlowCard glowColor={COLORS.success} style={styles.nameResult}>
                <Text style={styles.nameResultRace}>{generatedName.race.toUpperCase()}</Text>
                <Text style={styles.nameResultName}>{generatedName.name}</Text>
              </GlowCard>
            )}

            <View style={styles.raceGrid}>
              {Object.keys(RANDOM_NAMES).map(race => (
                <TouchableOpacity
                  key={race}
                  onPress={() => generateName(race)}
                  style={styles.raceBtn}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[RACE_COLORS[race] + '40', RACE_COLORS[race] + '15']}
                    style={styles.raceBtnGrad}
                  >
                    <Text style={styles.raceBtnIcon}>{RACE_ICONS[race]}</Text>
                    <Text style={[styles.raceBtnLabel, { color: RACE_COLORS[race] }]}>
                      {race.charAt(0).toUpperCase() + race.slice(1)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ════════════════════════════════════════
            ENCOUNTER DIFFICULTY
        ════════════════════════════════════════ */}
        {activeTool === 'encounter' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Guia rápido de dificuldade de encontros</Text>
            {ENCOUNTER_DIFFICULTY.map(enc => (
              <GlowCard key={enc.level} glowColor={enc.color + '80'} style={styles.encCard}>
                <View style={styles.encHeader}>
                  <View style={[styles.encDot, { backgroundColor: enc.color }]} />
                  <Text style={[styles.encLevel, { color: enc.color }]}>{enc.level}</Text>
                  <Text style={styles.encMult}>×{enc.xpMultiplier} XP</Text>
                </View>
                <Text style={styles.encDesc}>{enc.description}</Text>
              </GlowCard>
            ))}

            <GlowCard glowColor={COLORS.gold} style={{ marginTop: SPACING.md, backgroundColor: '#1a1200' }}>
              <Text style={styles.encTipTitle}>💡 Regra de Ouro</Text>
              <Text style={styles.encTipText}>
                Calcule o XP total dos monstros e multiplique pelo fator de dificuldade. Compare com os limiares de XP dos personagens pelo nível para definir a categoria do encontro.
              </Text>
            </GlowCard>
          </View>
        )}

        {/* ════════════════════════════════════════
            ABILITY SCORES REFERENCE
        ════════════════════════════════════════ */}
        {activeTool === 'ability' && (
          <View style={styles.section}>
            <Text style={styles.toolDesc}>Guia dos 6 atributos fundamentais do D&D</Text>
            {ABILITY_SCORES.map(ab => (
              <GlowCard key={ab.name} glowColor={COLORS.primary + '60'} style={styles.abilityCard}>
                <View style={styles.abilityHeader}>
                  <Text style={styles.abilityIcon}>{ab.icon}</Text>
                  <View>
                    <Text style={styles.abilityName}>{ab.name}</Text>
                    <Text style={styles.abilityAbbr}>{ab.abbr}</Text>
                  </View>
                </View>
                <Text style={styles.abilityDesc}>{ab.description}</Text>

                {/* Modifier Table */}
                <View style={styles.modTable}>
                  <Text style={styles.modTableTitle}>Tabela de Modificadores</Text>
                  <View style={styles.modTableRow}>
                    {[1,2,3,4,5,6,7,8,9,10].map(score => {
                      const mod = Math.floor((score - 10) / 2);
                      return (
                        <View key={score} style={styles.modCell}>
                          <Text style={styles.modScore}>{score}</Text>
                          <Text style={[styles.modMod, { color: mod >= 0 ? COLORS.success : COLORS.danger }]}>
                            {mod >= 0 ? `+${mod}` : `${mod}`}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.modTableRow}>
                    {[11,12,13,14,15,16,17,18,19,20].map(score => {
                      const mod = Math.floor((score - 10) / 2);
                      return (
                        <View key={score} style={styles.modCell}>
                          <Text style={styles.modScore}>{score}</Text>
                          <Text style={[styles.modMod, { color: mod >= 0 ? COLORS.success : COLORS.danger }]}>
                            {mod >= 0 ? `+${mod}` : `${mod}`}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </GlowCard>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ── Sub-components ──────────────────────────────
function StatPill({ label, value, color }) {
  return (
    <View style={[pillStyles.wrap, { borderColor: color + '60' }]}>
      <Text style={pillStyles.label}>{label}</Text>
      <Text style={[pillStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

// ── Data constants ──────────────────────────────
const TIER_COLORS = { common: '#9CA3AF', uncommon: '#22C55E', rare: '#3B82F6', legendary: '#F59E0B' };
const TIER_ICONS  = { common: '🪙', uncommon: '💚', rare: '💎', legendary: '🌟' };
const RACE_COLORS = { elvish: '#A8DADC', human: '#F7C59F', dwarf: '#B45309', orc: '#EF4444', gnome: '#EC4899' };
const RACE_ICONS  = { elvish: '🧝', human: '🧑', dwarf: '🪨', orc: '👹', gnome: '🎩' };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.lg },
  toolDesc:  { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginBottom: SPACING.md, fontStyle: 'italic' },

  // Tool Selector
  toolSelector:        { maxHeight: 64, marginTop: SPACING.md },
  toolSelectorContent: { paddingHorizontal: SPACING.xl, gap: SPACING.sm, alignItems: 'center' },
  toolChip: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.xs,
    borderWidth: 1, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs + 2,
    backgroundColor: COLORS.bgCard,
  },
  toolChipIcon:  { fontSize: 14 },
  toolChipLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium },

  // Conditions
  conditionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  conditionHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  conditionIcon:   { fontSize: 20 },
  conditionName:   { flex: 1, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  expandArrow:     { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  conditionEffect: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginTop: SPACING.sm, lineHeight: 20 },

  // Monsters
  monsterCard:   { marginBottom: SPACING.sm, padding: SPACING.md },
  monsterHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  monsterIcon:   { fontSize: 28 },
  monsterInfo:   { flex: 1 },
  monsterName:   { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  monsterType:   { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  monsterStats:  { alignItems: 'flex-end' },
  crBadge:       { alignItems: 'center', backgroundColor: COLORS.danger + '25', borderRadius: RADIUS.sm, padding: SPACING.xs + 2 },
  crLabel:       { color: COLORS.danger, fontSize: FONTS.sizes.xs },
  crValue:       { color: COLORS.danger, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.black },
  monsterDetail: { marginTop: SPACING.sm, gap: SPACING.sm },
  monsterStatRow: { flexDirection: 'row', gap: SPACING.sm },
  monsterDesc:   { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 18 },

  // Loot
  lootBtns:    { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  lootBtn:     { width: '47%', borderRadius: RADIUS.lg, borderWidth: 1, overflow: 'hidden' },
  lootBtnGrad: { padding: SPACING.md, alignItems: 'center', gap: SPACING.xs },
  lootBtnIcon: { fontSize: 24 },
  lootBtnText: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },
  lootResult:  { gap: SPACING.sm },
  lootResultTitle: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, marginBottom: SPACING.xs },
  lootItem:    { backgroundColor: COLORS.bgElevated, borderRadius: RADIUS.sm, padding: SPACING.sm },
  lootItemText: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md },

  // Names
  nameResult:     { alignItems: 'center', marginBottom: SPACING.xl, padding: SPACING.xxl },
  nameResultRace: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, letterSpacing: 2 },
  nameResultName: { color: COLORS.success, fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.black, marginTop: SPACING.xs },
  raceGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  raceBtn:        { width: '30%', borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  raceBtnGrad:    { padding: SPACING.md, alignItems: 'center', gap: SPACING.xs },
  raceBtnIcon:    { fontSize: 28 },
  raceBtnLabel:   { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },

  // Encounter
  encCard:   { marginBottom: SPACING.sm },
  encHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.xs },
  encDot:    { width: 10, height: 10, borderRadius: 5 },
  encLevel:  { flex: 1, fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  encMult:   { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },
  encDesc:   { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 18 },
  encTipTitle: { color: COLORS.gold, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.xs },
  encTipText:  { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 20 },

  // Ability
  abilityCard:   { marginBottom: SPACING.md },
  abilityHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  abilityIcon:   { fontSize: 28 },
  abilityName:   { color: COLORS.textPrimary, fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  abilityAbbr:   { color: COLORS.primary, fontSize: FONTS.sizes.sm },
  abilityDesc:   { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 18, marginBottom: SPACING.md },

  modTable:      { gap: SPACING.xs },
  modTableTitle: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs, marginBottom: SPACING.xs },
  modTableRow:   { flexDirection: 'row', gap: 2 },
  modCell:       { flex: 1, alignItems: 'center', backgroundColor: COLORS.bgElevated, borderRadius: 4, paddingVertical: 3 },
  modScore:      { color: COLORS.textSecondary, fontSize: 9 },
  modMod:        { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold },
});

const pillStyles = StyleSheet.create({
  wrap:  { borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, alignItems: 'center' },
  label: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  value: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.black },
});
