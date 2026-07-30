import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput,
  FlatList, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import {
  rollDie, rollDice, rollFromNotation,
  evaluateD20, parseDiceNotation,
} from '../utils/diceUtils';
import { DICE_TYPES } from '../data/rpgData';
import GlowCard from '../components/GlowCard';
import ScreenHeader from '../components/ScreenHeader';

const MAX_HISTORY = 30;

export default function DiceScreen() {
  const insets = useSafeAreaInsets();

  // Single die state
  const [activeDie,    setActiveDie]    = useState(DICE_TYPES[5]); // D20
  const [lastResult,   setLastResult]   = useState(null);
  const [isRolling,    setIsRolling]    = useState(false);
  const [diceCount,    setDiceCount]    = useState(1);
  const [modifier,     setModifier]     = useState(0);
  const [history,      setHistory]      = useState([]);

  // Custom notation
  const [notation,     setNotation]     = useState('');
  const [notationErr,  setNotationErr]  = useState('');

  // Animation
  const scaleAnim  = useRef(new Animated.Value(1)).current;
  const shakeAnim  = useRef(new Animated.Value(0)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const displayNum = useRef(new Animated.Value(0)).current;
  const [displayRoll, setDisplayRoll] = useState(null);

  // ── Roll logic ─────────────────────────────
  const animateRoll = useCallback((finalResult) => {
    setIsRolling(true);
    setDisplayRoll(null);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim,  { toValue: 1.3, duration: 120, useNativeDriver: true }),
        Animated.timing(shakeAnim,  { toValue: 1,   duration: 80,  useNativeDriver: true }),
      ]),
      Animated.timing(scaleAnim, { toValue: 0.8, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1,   duration: 60, useNativeDriver: true }),
    ]).start(() => {
      setDisplayRoll(finalResult);
      setIsRolling(false);
      Animated.spring(resultAnim, {
        toValue: 1, friction: 5, tension: 300, useNativeDriver: true,
      }).start();
    });

    // Rapid number shuffle
    let ticks = 0;
    const shuffle = setInterval(() => {
      setDisplayRoll(rollDie(activeDie.sides));
      ticks++;
      if (ticks > 10) { clearInterval(shuffle); setDisplayRoll(finalResult); }
    }, 60);
  }, [activeDie, scaleAnim, shakeAnim, resultAnim]);

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    resultAnim.setValue(0);

    const result = rollDice(diceCount, activeDie.sides, modifier);
    animateRoll(result.total);
    setLastResult(result);

    const eval20 = activeDie.sides === 20 && diceCount === 1 ? evaluateD20(result.total) : null;
    const entry = {
      id:        Date.now(),
      dice:      `${diceCount}d${activeDie.sides}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : `${modifier}`) : ''}`,
      rolls:     result.rolls,
      total:     result.total,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      special:   eval20,
      color:     activeDie.color,
    };
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
  }, [isRolling, diceCount, activeDie, modifier, resultAnim, animateRoll]);

  const handleCustomRoll = () => {
    setNotationErr('');
    const parsed = parseDiceNotation(notation.trim());
    if (!parsed) {
      setNotationErr('Formato inválido. Use: 2d6, 1d20+3, 4d8-2');
      return;
    }
    const result = rollDice(parsed.count, parsed.sides, parsed.modifier);
    const modStr = parsed.modifier !== 0 ? (parsed.modifier > 0 ? `+${parsed.modifier}` : `${parsed.modifier}`) : '';
    const entry = {
      id:        Date.now(),
      dice:      `${parsed.count}d${parsed.sides}${modStr}`,
      rolls:     result.rolls,
      total:     result.total,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      color:     COLORS.gold,
    };
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
    setLastResult({ ...result, custom: true });
    setDisplayRoll(result.total);
  };

  const eval20 = activeDie.sides === 20 && diceCount === 1 && lastResult
    ? evaluateD20(lastResult.total)
    : null;

  // ── Render ─────────────────────────────────
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Dados" subtitle="Role e descubra seu destino" icon="🎲" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── DICE SELECTOR ──────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Escolha o Dado</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diceRow}>
            {DICE_TYPES.map(die => (
              <TouchableOpacity
                key={die.sides}
                onPress={() => { setActiveDie(die); setLastResult(null); setDisplayRoll(null); }}
                style={[
                  styles.dieChip,
                  { borderColor: die.color + '80' },
                  activeDie.sides === die.sides && {
                    backgroundColor: die.color + '30',
                    borderColor: die.color,
                  },
                ]}
              >
                <Text style={styles.dieEmoji}>{die.emoji}</Text>
                <Text style={[styles.dieLabel, { color: die.color }]}>{die.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.dieDescription}>{activeDie.description}</Text>
        </View>

        {/* ── BIG DICE BUTTON ────────────────── */}
        <View style={styles.section}>
          <GlowCard glowColor={activeDie.color} style={styles.rollArea}>
            <Animated.View style={[styles.bigDice, { transform: [{ scale: scaleAnim }] }]}>
              <LinearGradient
                colors={[activeDie.color + '40', activeDie.color + '15', COLORS.bgCard]}
                style={styles.bigDiceGrad}
              >
                <Text style={styles.bigDiceEmoji}>{activeDie.emoji}</Text>
                {displayRoll !== null ? (
                  <Animated.Text style={[styles.bigResult, { color: eval20?.color || activeDie.color }]}>
                    {displayRoll}
                  </Animated.Text>
                ) : (
                  <Text style={styles.bigDiceSides}>{activeDie.label}</Text>
                )}
                {eval20 && (
                  <Text style={[styles.evalLabel, { color: eval20.color }]}>{eval20.label}</Text>
                )}
                {lastResult && lastResult.rolls.length > 1 && (
                  <Text style={styles.rollBreakdown}>
                    [{lastResult.rolls.join(', ')}]
                    {lastResult.modifier !== 0
                      ? ` ${lastResult.modifier > 0 ? '+' : ''}${lastResult.modifier}`
                      : ''}
                  </Text>
                )}
              </LinearGradient>
            </Animated.View>

            {/* Count & Modifier */}
            <View style={styles.controls}>
              <View style={styles.controlGroup}>
                <Text style={styles.controlLabel}>Quantidade</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    onPress={() => setDiceCount(c => Math.max(1, c - 1))}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="remove" size={18} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                  <Text style={styles.counterVal}>{diceCount}</Text>
                  <TouchableOpacity
                    onPress={() => setDiceCount(c => Math.min(20, c + 1))}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="add" size={18} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.controlGroup}>
                <Text style={styles.controlLabel}>Modificador</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    onPress={() => setModifier(m => m - 1)}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="remove" size={18} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                  <Text style={styles.counterVal}>
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModifier(m => m + 1)}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="add" size={18} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleRoll}
              disabled={isRolling}
              style={styles.rollBtn}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[activeDie.color + 'CC', activeDie.color + '88']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.rollBtnGrad}
              >
                <Text style={styles.rollBtnText}>
                  {isRolling ? '⏳ Rolando...' : `🎲 Rolar ${diceCount}${activeDie.label}`}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </GlowCard>
        </View>

        {/* ── CUSTOM NOTATION ────────────────── */}
        <View style={styles.section}>
          <GlowCard glowColor={COLORS.gold}>
            <Text style={styles.sectionLabel}>🧮 Notação Personalizada</Text>
            <Text style={styles.notationHint}>Ex: 2d6, 1d20+5, 4d8-2, 3d6+3</Text>
            <View style={styles.notationRow}>
              <TextInput
                style={styles.notationInput}
                value={notation}
                onChangeText={t => { setNotation(t); setNotationErr(''); }}
                placeholder="2d6+3"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={handleCustomRoll} style={styles.notationBtn}>
                <LinearGradient
                  colors={[COLORS.goldDim, COLORS.gold]}
                  style={styles.notationBtnGrad}
                >
                  <Ionicons name="play" size={20} color="#000" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {notationErr ? <Text style={styles.notationErr}>{notationErr}</Text> : null}
          </GlowCard>
        </View>

        {/* ── HISTORY ───────────────────────── */}
        {history.length > 0 && (
          <View style={styles.section}>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionLabel}>📜 Histórico de Rolagens</Text>
              <TouchableOpacity onPress={() => setHistory([])}>
                <Text style={styles.clearBtn}>Limpar</Text>
              </TouchableOpacity>
            </View>
            {history.map(entry => (
              <View key={entry.id} style={[styles.historyEntry, { borderLeftColor: entry.color }]}>
                <View style={styles.historyLeft}>
                  <Text style={[styles.historyDice, { color: entry.color }]}>{entry.dice}</Text>
                  <Text style={styles.historyRolls}>[{entry.rolls.join(', ')}]</Text>
                  {entry.special && (
                    <Text style={[styles.historySpecial, { color: entry.special.color }]}>
                      {entry.special.label}
                    </Text>
                  )}
                </View>
                <View style={styles.historyRight}>
                  <Text style={[styles.historyTotal, { color: entry.color }]}>{entry.total}</Text>
                  <Text style={styles.historyTime}>{entry.timestamp}</Text>
                </View>
              </View>
            ))}
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
  section:   { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },
  sectionLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },

  // Dice selector
  diceRow:       { marginBottom: SPACING.sm },
  dieChip: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.bgCard,
    minWidth: 64,
  },
  dieEmoji:       { fontSize: 22 },
  dieLabel:       { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold, marginTop: 2 },
  dieDescription: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, fontStyle: 'italic' },

  // Roll area
  rollArea: { alignItems: 'center', padding: SPACING.xl },
  bigDice:  { width: '100%', marginBottom: SPACING.xl },
  bigDiceGrad: {
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    minHeight: 160,
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  bigDiceEmoji: { fontSize: 40 },
  bigDiceSides: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.black,
  },
  bigResult: {
    fontSize: 72,
    fontWeight: FONTS.weights.black,
    lineHeight: 80,
  },
  evalLabel: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold },
  rollBreakdown: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm },

  // Controls
  controls:     { flexDirection: 'row', gap: SPACING.xl, marginBottom: SPACING.xl },
  controlGroup: { alignItems: 'center', gap: SPACING.xs },
  controlLabel: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.xs,
  },
  counterBtn: {
    width: 32, height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterVal: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    minWidth: 36,
    textAlign: 'center',
  },

  // Roll Button
  rollBtn:     { width: '100%', borderRadius: RADIUS.full, overflow: 'hidden' },
  rollBtnGrad: { paddingVertical: SPACING.md + 2, alignItems: 'center' },
  rollBtnText: { color: '#fff', fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, letterSpacing: 1 },

  // Custom notation
  notationHint: { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, marginBottom: SPACING.sm },
  notationRow:  { flexDirection: 'row', gap: SPACING.sm },
  notationInput: {
    flex: 1,
    backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 1,
  },
  notationBtn:     { borderRadius: RADIUS.md, overflow: 'hidden' },
  notationBtnGrad: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  notationErr:     { color: COLORS.danger, fontSize: FONTS.sizes.sm, marginTop: SPACING.xs },

  // History
  historyHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: SPACING.sm,
  },
  clearBtn: { color: COLORS.danger, fontSize: FONTS.sizes.sm },
  historyEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
  },
  historyLeft:    { flex: 1 },
  historyDice:    { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  historyRolls:   { color: COLORS.textMuted, fontSize: FONTS.sizes.sm, marginTop: 2 },
  historySpecial: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold, marginTop: 2 },
  historyRight:   { alignItems: 'flex-end' },
  historyTotal:   { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.black },
  historyTime:    { color: COLORS.textMuted, fontSize: FONTS.sizes.xs },
});
