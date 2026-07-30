// ═══════════════════════════════════════════════
//  RPG COMPANION — Dice Roll Utilities
// ═══════════════════════════════════════════════

/**
 * Roll a single die with given number of sides
 */
export const rollDie = (sides) => {
  return Math.floor(Math.random() * sides) + 1;
};

/**
 * Roll multiple dice and return full result
 * @param {number} count - number of dice
 * @param {number} sides - faces per die
 * @param {number} modifier - bonus/penalty to add
 */
export const rollDice = (count, sides, modifier = 0) => {
  const rolls = Array.from({ length: count }, () => rollDie(sides));
  const total = rolls.reduce((sum, r) => sum + r, 0) + modifier;
  return { rolls, total, count, sides, modifier };
};

/**
 * Parse dice notation string like "2d6+3", "1d20", "3d8-1"
 */
export const parseDiceNotation = (notation) => {
  const match = notation.toLowerCase().match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) return null;
  return {
    count:    parseInt(match[1]),
    sides:    parseInt(match[2]),
    modifier: match[3] ? parseInt(match[3]) : 0,
  };
};

/**
 * Roll from dice notation string
 */
export const rollFromNotation = (notation) => {
  const parsed = parseDiceNotation(notation);
  if (!parsed) return null;
  return rollDice(parsed.count, parsed.sides, parsed.modifier);
};

/**
 * Evaluate if a D20 roll is a critical hit or miss
 */
export const evaluateD20 = (roll) => {
  if (roll === 20) return { type: 'CRITICAL_HIT',  label: '⚔️ CRÍTICO!',     color: '#FFD700' };
  if (roll === 1)  return { type: 'CRITICAL_MISS', label: '💀 FALHA CRÍTICA', color: '#EF4444' };
  if (roll >= 15)  return { type: 'HIGH',          label: '✅ Ótimo',         color: '#22C55E' };
  if (roll >= 10)  return { type: 'MEDIUM',        label: '🔶 Razoável',      color: '#F59E0B' };
  return               { type: 'LOW',           label: '❌ Baixo',          color: '#EF4444' };
};

/**
 * Ability score modifier (D&D 5e formula)
 */
export const getModifier = (score) => Math.floor((score - 10) / 2);

/**
 * Format modifier for display (+3, -2, +0)
 */
export const formatModifier = (mod) => (mod >= 0 ? `+${mod}` : `${mod}`);

/**
 * Roll 4d6 drop lowest (standard character creation)
 */
export const rollAbilityScore = () => {
  const rolls = Array.from({ length: 4 }, () => rollDie(6));
  rolls.sort((a, b) => a - b);
  const dropped = rolls[0];
  const kept = rolls.slice(1);
  const total = kept.reduce((sum, r) => sum + r, 0);
  return { rolls, dropped, kept, total };
};

/**
 * Roll a full set of 6 ability scores
 */
export const rollAllAbilityScores = () =>
  Array.from({ length: 6 }, () => rollAbilityScore());

/**
 * Get roll animation frames for display
 */
export const getRollFrames = (sides, finalResult, frameCount = 8) => {
  const frames = Array.from({ length: frameCount - 1 }, () => rollDie(sides));
  frames.push(finalResult);
  return frames;
};

/**
 * Proficiency bonus by character level (D&D 5e)
 */
export const getProficiencyBonus = (level) => {
  if (level <= 4)  return 2;
  if (level <= 8)  return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
};

/**
 * XP thresholds for leveling up (D&D 5e)
 */
export const XP_THRESHOLDS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000,
  48000, 64000, 85000, 100000, 120000, 140000,
  165000, 195000, 225000, 265000, 305000, 355000,
];

export const getLevelFromXP = (xp) => {
  let level = 1;
  for (let i = 1; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return Math.min(level, 20);
};
