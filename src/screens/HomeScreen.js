import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Animated, TouchableOpacity, ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { rollDie, evaluateD20 } from '../utils/diceUtils';
import { INITIATIVE_TIPS } from '../data/rpgData';
import GlowCard from '../components/GlowCard';

const QUICK_ACTIONS = [
  { label: 'Rolar Dados',  icon: 'dice',       tab: 'Dice',    color: COLORS.d20 },
  { label: 'Magias',       icon: 'sparkles',   tab: 'Spells',  color: COLORS.primary },
  { label: 'Classes',      icon: 'people',     tab: 'Classes', color: COLORS.d8 },
  { label: 'Ferramentas',  icon: 'construct',  tab: 'Tools',   color: COLORS.gold },
];

export default function HomeScreen() {
  const insets    = useSafeAreaInsets();
  const nav       = useNavigation();
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [quickRoll, setQuickRoll]  = useState(null);
  const [tipIndex,  setTipIndex]   = useState(0);
  const tipAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(tipAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(tipAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
      setTipIndex(i => (i + 1) % INITIATIVE_TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickD20 = () => {
    const result = rollDie(20);
    const eval20 = evaluateD20(result);
    setQuickRoll({ result, ...eval20 });
    setTimeout(() => setQuickRoll(null), 3000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── HERO BANNER ─────────────────────────── */}
        <LinearGradient
          colors={['#1a0535', '#0D0A1A', '#0a0014']}
          style={styles.hero}
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.heroRune}>⚔️</Text>
            <Text style={styles.heroTitle}>RPG{'\n'}COMPANION</Text>
            <Text style={styles.heroSub}>Seu grimório digital de aventuras</Text>

            {/* Quick D20 Roll */}
            <TouchableOpacity style={styles.heroBtn} onPress={handleQuickD20} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.primaryDark, COLORS.primary]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.heroBtnGrad}
              >
                <Text style={styles.heroBtnText}>🎲 Rolar D20</Text>
              </LinearGradient>
            </TouchableOpacity>

            {quickRoll && (
              <Animated.View style={[styles.quickRollResult, { borderColor: quickRoll.color }]}>
                <Text style={[styles.quickRollNum, { color: quickRoll.color }]}>
                  {quickRoll.result}
                </Text>
                <Text style={[styles.quickRollLabel, { color: quickRoll.color }]}>
                  {quickRoll.label}
                </Text>
              </Animated.View>
            )}
          </Animated.View>
        </LinearGradient>

        {/* ── QUICK ACTIONS ────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Navegação Rápida</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.tab}
                style={[styles.quickCard, { borderColor: action.color + '60' }]}
                onPress={() => nav.navigate(action.tab)}
                activeOpacity={0.75}
              >
                <LinearGradient
                  colors={[action.color + '25', action.color + '08']}
                  style={styles.quickCardGrad}
                >
                  <Ionicons name={action.icon} size={28} color={action.color} />
                  <Text style={[styles.quickCardLabel, { color: action.color }]}>
                    {action.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── TIP OF THE MOMENT ───────────────────── */}
        <View style={styles.section}>
          <GlowCard glowColor={COLORS.gold} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Text style={styles.tipHeaderIcon}>💡</Text>
              <Text style={styles.tipHeaderText}>Dica de Combate</Text>
            </View>
            <Animated.Text style={[styles.tipText, { opacity: tipAnim }]}>
              {INITIATIVE_TIPS[tipIndex]}
            </Animated.Text>
          </GlowCard>
        </View>

        {/* ── FEATURES OVERVIEW ───────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 O que tem aqui</Text>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureInfo}>
                <Text style={styles.featureName}>{f.name}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── FOOTER ──────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>✨ Que os dados estejam ao seu favor ✨</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const FEATURES = [
  { icon: '🎲', name: 'Rolar Dados',        desc: 'D4, D6, D8, D10, D12, D20 e D100 com animação e histórico' },
  { icon: '🔮', name: 'Grimório de Magias', desc: '6 escolas mágicas com mais de 30 magias detalhadas' },
  { icon: '⚔️', name: 'Classes de RPG',     desc: '8 classes clássicas com habilidades e dados de vida' },
  { icon: '🎰', name: 'Rolagem Múltipla',   desc: 'Role vários dados ao mesmo tempo com modificadores' },
  { icon: '🧮', name: 'Gerador de Atributos', desc: 'Gere seus 6 atributos com o método 4d6 descarta menor' },
  { icon: '🎲', name: 'Dados Personalizados', desc: 'Crie notações personalizadas como 3d6+5' },
  { icon: '👹', name: 'Bestiário',           desc: 'Monstros com CR, PV e habilidades especiais' },
  { icon: '💀', name: 'Condições',           desc: 'Referência rápida de todas as condições de combate' },
  { icon: '💰', name: 'Tabela de Loot',      desc: 'Gere itens aleatórios do comum ao lendário' },
  { icon: '🏷️', name: 'Gerador de Nomes',   desc: 'Nomes para elfos, anões, humanos, orcs e gnomos' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll:    { paddingBottom: 40 },

  // Hero
  hero: {
    padding: SPACING.xxl,
    paddingTop: SPACING.xl,
    alignItems: 'center',
    minHeight: 320,
    justifyContent: 'center',
  },
  heroRune:  { fontSize: 48, marginBottom: SPACING.sm },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.hero,
    fontWeight: FONTS.weights.black,
    textAlign: 'center',
    letterSpacing: 4,
    lineHeight: 42,
  },
  heroSub: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  heroBtn: { borderRadius: RADIUS.full, overflow: 'hidden', ...{ elevation: 8 } },
  heroBtnGrad: { paddingHorizontal: SPACING.xxl, paddingVertical: SPACING.md },
  heroBtnText: {
    color: '#fff',
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },
  quickRollResult: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    backgroundColor: '#1a0535',
  },
  quickRollNum:   { fontSize: 52, fontWeight: FONTS.weights.black },
  quickRollLabel: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, marginTop: 4 },

  // Sections
  section:      { paddingHorizontal: SPACING.xl, marginTop: SPACING.xxl },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },

  // Quick Grid
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  quickCard: {
    width: '47%',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  quickCardGrad: { padding: SPACING.lg, alignItems: 'center', gap: SPACING.sm },
  quickCardLabel: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold },

  // Tip
  tipCard:       { backgroundColor: '#1a1000' },
  tipHeader:     { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  tipHeaderIcon: { fontSize: 20 },
  tipHeaderText: { color: COLORS.gold, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  tipText:       { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, lineHeight: 22, fontStyle: 'italic' },

  // Features
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  featureIcon: { fontSize: 22, width: 32, textAlign: 'center' },
  featureInfo: { flex: 1 },
  featureName: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  featureDesc: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, marginTop: 2 },

  // Footer
  footer:     { alignItems: 'center', marginTop: SPACING.xxxl, paddingBottom: SPACING.xl },
  footerText: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontStyle: 'italic' },
});
