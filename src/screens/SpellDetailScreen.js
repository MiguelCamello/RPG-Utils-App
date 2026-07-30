import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import ScreenHeader from '../components/ScreenHeader';
import GlowCard from '../components/GlowCard';

const LEVEL_LABELS = ['Truque', '1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º'];

export default function SpellDetailScreen() {
  const nav   = useNavigation();
  const route = useRoute();
  const { spell, schoolColor } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={spell.name}
        subtitle={`${spell.type} • ${LEVEL_LABELS[spell.level] || spell.level + 'º Nível'}`}
        onBack={() => nav.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* ── HERO ───────────────────────────── */}
          <LinearGradient
            colors={[schoolColor + '40', schoolColor + '10', 'transparent']}
            style={styles.hero}
          >
            <Text style={styles.heroEmoji}>✨</Text>
            <Text style={[styles.heroLevel, { color: schoolColor }]}>
              {LEVEL_LABELS[spell.level] || `${spell.level}º`} Círculo
            </Text>
          </LinearGradient>

          {/* ── STATS ──────────────────────────── */}
          <View style={styles.section}>
            <View style={styles.statsGrid}>
              <StatBox label="Escola"    value={spell.type}   color={schoolColor} />
              <StatBox label="Nível"     value={LEVEL_LABELS[spell.level] || spell.level} color={schoolColor} />
              <StatBox label="Dano/Efeito" value={spell.damage} color={spell.damage !== '—' ? COLORS.danger : COLORS.textMuted} />
            </View>
          </View>

          {/* ── DESCRIPTION ────────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={schoolColor}>
              <Text style={styles.descTitle}>📜 Descrição</Text>
              <Text style={styles.descText}>{spell.description}</Text>
            </GlowCard>
          </View>

          {/* ── SPELL TIPS ─────────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={COLORS.gold} style={{ backgroundColor: '#1a1000' }}>
              <Text style={styles.tipsTitle}>⚡ Dicas de Uso</Text>
              {getSpellTips(spell).map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={styles.tipBullet}>◆</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </GlowCard>
          </View>

          {/* ── LEVEL INFO ─────────────────────── */}
          <View style={styles.section}>
            <GlowCard glowColor={schoolColor + '80'}>
              <Text style={styles.levelTitle}>📈 Slot de Magia</Text>
              <Text style={styles.levelText}>
                Esta magia ocupa um slot de {LEVEL_LABELS[spell.level] || spell.level + 'º'} nível.
                {spell.level === 0
                  ? ' Truques podem ser usados à vontade, sem gastar slots!'
                  : ` Conjuradores de alto nível podem conjurá-la em um slot superior para potencializar o efeito.`
                }
              </Text>
            </GlowCard>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function StatBox({ label, value, color }) {
  return (
    <View style={[statStyles.box, { borderColor: color + '50' }]}>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={[statStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

function getSpellTips(spell) {
  const tips = [];
  if (spell.damage !== '—' && spell.damage.includes('d')) {
    tips.push('Role o dano mesmo que o inimigo já pareça derrotado — cada PV conta!');
  }
  if (spell.level >= 5) {
    tips.push('Magia de alto nível — use com sabedoria, slots são preciosos.');
  }
  if (spell.type === 'Concentração' || spell.description.toLowerCase().includes('concentração')) {
    tips.push('Requer Concentração. Evite tomar dano enquanto mantém esta magia ativa.');
  }
  if (spell.type === 'Ritual') {
    tips.push('Pode ser conjurada como ritual (10 min extras) sem gastar slot de magia.');
  }
  if (spell.level === 0) {
    tips.push('Truque — sem custo de slot! Use o quanto quiser em combate.');
  }
  if (spell.description.toLowerCase().includes('resistência')) {
    tips.push('Resistência corta o dano pela metade — alvos com resistência são mais difíceis de eliminar.');
  }
  if (tips.length === 0) {
    tips.push('Leia a descrição com atenção — alguns efeitos têm interações poderosas com outras magias.');
    tips.push('Combine com itens mágicos ou habilidades de classe para maximizar o potencial.');
  }
  return tips;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },

  hero: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.sm,
  },
  heroEmoji: { fontSize: 56 },
  heroLevel: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.bold },

  statsGrid: { flexDirection: 'row', gap: SPACING.md },

  descTitle: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.md },
  descText:  { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, lineHeight: 24 },

  tipsTitle: { color: COLORS.gold, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.md },
  tipRow:    { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  tipBullet: { color: COLORS.gold, fontSize: 10, marginTop: 5 },
  tipText:   { flex: 1, color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 20 },

  levelTitle: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginBottom: SPACING.sm },
  levelText:  { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, lineHeight: 20 },
});

const statStyles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  label: { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
  value: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, textAlign: 'center' },
});
