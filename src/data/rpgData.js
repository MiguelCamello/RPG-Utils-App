// ═══════════════════════════════════════════════
//  RPG COMPANION — Central Data Store
// ═══════════════════════════════════════════════

export const DICE_TYPES = [
  { sides: 4,   label: 'D4',   emoji: '🔺', color: '#FF6B35', description: 'Dado de 4 faces — dano de adagas' },
  { sides: 6,   label: 'D6',   emoji: '🎲', color: '#F7C59F', description: 'Dado de 6 faces — o clássico' },
  { sides: 8,   label: 'D8',   emoji: '💎', color: '#A8DADC', description: 'Dado de 8 faces — dano de machados' },
  { sides: 10,  label: 'D10',  emoji: '🔷', color: '#457B9D', description: 'Dado de 10 faces — percentual' },
  { sides: 12,  label: 'D12',  emoji: '⬡',  color: '#9B5DE5', description: 'Dado de 12 faces — bárbaros' },
  { sides: 20,  label: 'D20',  emoji: '⚔️', color: '#F15BB5', description: 'Dado de 20 faces — o rei dos RPGs' },
  { sides: 100, label: 'D100', emoji: '🌀', color: '#FEE440', description: 'Dado percentual — destino!' },
];

export const MAGIC_SCHOOLS = [
  {
    name: 'Evocação',
    icon: '🔥',
    color: '#FF4500',
    description: 'Magia de força bruta. Manipula energia pura para causar dano massivo.',
    spells: [
      { name: 'Bola de Fogo', level: 3, damage: '8d6', type: 'Fogo', description: 'Uma esfera incandescente explode em um raio de 6m causando 8d6 de dano de fogo.' },
      { name: 'Raio', level: 3, damage: '8d6', type: 'Elétrico', description: 'Um raio de eletricidade atinge até 3 criaturas em linha reta.' },
      { name: 'Míssil Mágico', level: 1, damage: '3x1d4+1', type: 'Arcano', description: 'Três dardos de força mágica que sempre acertam o alvo.' },
      { name: 'Cone de Frio', level: 5, damage: '8d8', type: 'Gelo', description: 'Um sopro glacial congela tudo em um cone de 18m.' },
      { name: 'Relâmpago em Cadeia', level: 6, damage: '10d8', type: 'Elétrico', description: 'Salta entre múltiplos alvos reduzindo dano a cada salto.' },
    ]
  },
  {
    name: 'Necromancia',
    icon: '💀',
    color: '#6B2D8B',
    description: 'Magia da vida e da morte. Drena energia vital e controla mortos-vivos.',
    spells: [
      { name: 'Toque Vampírico', level: 3, damage: '3d6', type: 'Necrótico', description: 'Drena vida do alvo e cura o conjurador com a metade do dano.' },
      { name: 'Raio de Doença', level: 2, damage: '2d6', type: 'Necrótico', description: 'Um raio putrefato causa dano e reduz a Constituição do alvo.' },
      { name: 'Animar Mortos', level: 3, damage: '—', type: 'Ritual', description: 'Levanta um esqueleto ou zumbi sob seu controle por 24 horas.' },
      { name: 'Palavra de Poder: Morte', level: 9, damage: 'Instantâneo', type: 'Necrótico', description: 'Mata instantaneamente criaturas com 100 PV ou menos.' },
      { name: 'Esfera Cinzenta', level: 4, damage: '3d8', type: 'Necrótico', description: 'Uma orbe de energia cinzenta envelhece e enfraquece o alvo.' },
    ]
  },
  {
    name: 'Ilusionismo',
    icon: '🌀',
    color: '#00B4D8',
    description: 'Magia da mente e da percepção. Engana sentidos e cria realidades falsas.',
    spells: [
      { name: 'Imagem Espelhada', level: 2, damage: '—', type: 'Ilusão', description: 'Cria 3 cópias ilusórias de você, fazendo ataques errarem.' },
      { name: 'Invisibilidade', level: 2, damage: '—', type: 'Ilusão', description: 'Torna criatura invisível até atacar ou conjurar magia.' },
      { name: 'Fantasia Maior', level: 4, damage: '—', type: 'Ilusão', description: 'Cria uma ilusão completa com som, cheiro e sensação.' },
      { name: 'Confusão', level: 4, damage: '—', type: 'Encantamento', description: 'Afeta criaturas em 3m de raio, fazendo agir aleatoriamente.' },
      { name: 'Dominação de Pessoa', level: 5, damage: '—', type: 'Encantamento', description: 'Toma controle total de uma criatura humanoide.' },
    ]
  },
  {
    name: 'Transmutação',
    icon: '⚗️',
    color: '#06D6A0',
    description: 'Magia da transformação. Altera a forma e propriedades da matéria.',
    spells: [
      { name: 'Teia', level: 2, damage: '—', type: 'Transmutação', description: 'Cria teias pegajosas que prendem criaturas na área.' },
      { name: 'Voo', level: 3, damage: '—', type: 'Transmutação', description: 'Concede velocidade de voo de 18m por 10 minutos.' },
      { name: 'Polimorfismo', level: 4, damage: '—', type: 'Transmutação', description: 'Transforma uma criatura em qualquer besta que escolher.' },
      { name: 'Pele Rochosa', level: 4, damage: '—', type: 'Abjuração', description: 'Aumenta CA para 16 e concede resistência a dano não-mágico.' },
      { name: 'Desintegrar', level: 6, damage: '10d6+40', type: 'Transmutação', description: 'Um raio verde reduz a pó qualquer coisa que tocar.' },
    ]
  },
  {
    name: 'Divinação',
    icon: '🔮',
    color: '#FFB703',
    description: 'Magia do conhecimento. Revela segredos, o futuro e verdades ocultas.',
    spells: [
      { name: 'Detectar Magia', level: 1, damage: '—', type: 'Divinação', description: 'Percebe auras mágicas em criaturas e objetos por 1 minuto.' },
      { name: 'Identificar', level: 1, damage: '—', type: 'Ritual', description: 'Revela as propriedades de um item mágico ou magia.' },
      { name: 'Visão Verdadeira', level: 6, damage: '—', type: 'Divinação', description: 'Enxerga formas verdadeiras, planos etéreos e invisibilidade.' },
      { name: 'Presciência', level: 9, damage: '—', type: 'Divinação', description: 'Vê o futuro próximo. Vantagem em todos os testes por 8h.' },
      { name: 'Adivinhar', level: 4, damage: '—', type: 'Ritual', description: 'Recebe uma resposta honesta sobre um evento dos próximos 7 dias.' },
    ]
  },
  {
    name: 'Abjuração',
    icon: '🛡️',
    color: '#4CC9F0',
    description: 'Magia protetora. Cria barreiras, nega magia e expulsa entidades.',
    spells: [
      { name: 'Escudo Arcano', level: 1, damage: '—', type: 'Abjuração', description: 'Reação: +5 CA e imunidade a Míssil Mágico até próximo turno.' },
      { name: 'Contrafeitiço', level: 3, damage: '—', type: 'Abjuração', description: 'Interrompe uma magia de nível 3 ou menor automaticamente.' },
      { name: 'Círculo Mágico', level: 3, damage: '—', type: 'Ritual', description: 'Protege área de 3m de criaturas celestiais, elementais ou infernais.' },
      { name: 'Dissipar Magia', level: 3, damage: '—', type: 'Abjuração', description: 'Encerra magias ativas em uma criatura, objeto ou área.' },
      { name: 'Globo Antimagia', level: 8, damage: '—', type: 'Abjuração', description: 'Esfera de 3m que suprime toda magia dentro dela.' },
    ]
  },
];

export const CHARACTER_CLASSES = [
  {
    name: 'Guerreiro',
    icon: '⚔️',
    color: '#E63946',
    hitDie: 'd10',
    primaryStats: ['Força', 'Constituição'],
    description: 'Mestre do combate físico. Versátil, resistente e letal com qualquer arma.',
    features: ['Segundo Fôlego', 'Surto de Ação', 'Estilo de Combate', 'Combate Adicional'],
    savingThrows: ['Força', 'Constituição'],
  },
  {
    name: 'Mago',
    icon: '🔮',
    color: '#7B2FBE',
    hitDie: 'd6',
    primaryStats: ['Inteligência'],
    description: 'Estudioso das artes arcanas. Possui o maior arsenal de magias do jogo.',
    features: ['Recuperação Arcana', 'Feitiços Preparados', 'Livro de Magia', 'Domínio Arcano'],
    savingThrows: ['Inteligência', 'Sabedoria'],
  },
  {
    name: 'Clérigo',
    icon: '✨',
    color: '#F4A261',
    hitDie: 'd8',
    primaryStats: ['Sabedoria'],
    description: 'Servo divino. Combina cura poderosa com magia sagrada e combate.',
    features: ['Canalizar Divindade', 'Expulsar Mortos-Vivos', 'Domínio Divino', 'Intervenção Divina'],
    savingThrows: ['Sabedoria', 'Carisma'],
  },
  {
    name: 'Ladino',
    icon: '🗡️',
    color: '#2D6A4F',
    hitDie: 'd8',
    primaryStats: ['Destreza'],
    description: 'Especialista em furtividade e precisão. Golpe Furtivo causa dano devastador.',
    features: ['Golpe Furtivo', 'Furtividade', 'Ação Ardilosa', 'Esquiva Incorpórea'],
    savingThrows: ['Destreza', 'Inteligência'],
  },
  {
    name: 'Ranger',
    icon: '🏹',
    color: '#588157',
    hitDie: 'd10',
    primaryStats: ['Destreza', 'Sabedoria'],
    description: 'Explorador e caçador. Letal contra inimigos favoritos em terrenos conhecidos.',
    features: ['Inimigo Favorito', 'Explorador Natural', 'Estilo de Combate', 'Magias de Ranger'],
    savingThrows: ['Força', 'Destreza'],
  },
  {
    name: 'Paladino',
    icon: '🛡️',
    color: '#FFD60A',
    hitDie: 'd10',
    primaryStats: ['Força', 'Carisma'],
    description: 'Cavaleiro sagrado. Une poder marcial com magia divina e auras de proteção.',
    features: ['Senso Divino', 'Imposição de Mãos', 'Ataque Divino', 'Aura de Proteção'],
    savingThrows: ['Sabedoria', 'Carisma'],
  },
  {
    name: 'Bárbaro',
    icon: '🪓',
    color: '#DC2F02',
    hitDie: 'd12',
    primaryStats: ['Força', 'Constituição'],
    description: 'Guerreiro selvagem. Em fúria, torna-se uma máquina de destruição imparável.',
    features: ['Fúria', 'Defesa sem Armadura', 'Ataque Descuidado', 'Sentido de Perigo'],
    savingThrows: ['Força', 'Constituição'],
  },
  {
    name: 'Bardo',
    icon: '🎵',
    color: '#F72585',
    hitDie: 'd8',
    primaryStats: ['Carisma'],
    description: 'Artista e mago. Inspira aliados, confunde inimigos e sabe um pouco de tudo.',
    features: ['Inspiração Bárdica', 'Especialização', 'Canção de Descanso', 'Segredos Mágicos'],
    savingThrows: ['Destreza', 'Carisma'],
  },
];

export const CONDITIONS = [
  { name: 'Agarrado',      icon: '🤝', color: '#8B5CF6', effect: 'Velocidade zero. Termina se agressor se mover para longe.' },
  { name: 'Assustado',     icon: '😱', color: '#EF4444', effect: 'Desvantagem em testes enquanto vir a fonte. Não pode se mover em direção a ela.' },
  { name: 'Atordoado',     icon: '💫', color: '#F59E0B', effect: 'Incapacitado. Falha automática em Força/Destreza. Ataques têm vantagem.' },
  { name: 'Caído',         icon: '⬇️', color: '#6B7280', effect: 'Desvantagem em ataques. Ataques à distância têm vantagem, corpo-a-corpo também.' },
  { name: 'Cego',          icon: '👁️', color: '#374151', effect: 'Falha automática em testes que precisem de visão. Desvantagem em ataques.' },
  { name: 'Encantado',     icon: '💕', color: '#EC4899', effect: 'Não pode atacar o encantador. Encantador tem vantagem em testes sociais.' },
  { name: 'Envenenado',    icon: '☠️', color: '#16A34A', effect: 'Desvantagem em testes de ataque e perícias.' },
  { name: 'Exausto',       icon: '😴', color: '#78716C', effect: 'Penalidades cumulativas por nível: -2 em testes, metade velocidade, etc.' },
  { name: 'Incapacitado',  icon: '🚫', color: '#DC2626', effect: 'Não pode realizar ações ou reações.' },
  { name: 'Inconsciente',  icon: '💤', color: '#1E3A5F', effect: 'Caído, incapacitado. Falha em Força/Destreza. Ataques têm vantagem crítica.' },
  { name: 'Invisível',     icon: '👻', color: '#D1D5DB', effect: 'Impossível de ser visto. Vantagem em ataques, desvantagem nos contra ele.' },
  { name: 'Paralisado',    icon: '⚡', color: '#7C3AED', effect: 'Incapacitado. Falha em Força/Destreza. Ataques à distância ≤1.5m são críticos.' },
  { name: 'Petrificado',   icon: '🪨', color: '#9CA3AF', effect: 'Transformado em pedra. Incapacitado e resistência a todos os danos.' },
  { name: 'Surdo',         icon: '👂', color: '#B45309', effect: 'Falha automática em testes que precisem de audição.' },
];

export const ABILITY_SCORES = [
  { name: 'Força',        abbr: 'FOR', icon: '💪', description: 'Poder físico, ataques corpo-a-corpo, carregar peso.' },
  { name: 'Destreza',     abbr: 'DES', icon: '🏃', description: 'Agilidade, reflexos, ataques à distância, furtividade.' },
  { name: 'Constituição', abbr: 'CON', icon: '❤️', description: 'Resistência, pontos de vida, concentração de magia.' },
  { name: 'Inteligência', abbr: 'INT', icon: '🧠', description: 'Memória, raciocínio, magias arcanas, perícias de conhecimento.' },
  { name: 'Sabedoria',    abbr: 'SAB', icon: '🦉', description: 'Percepção, intuição, magias divinas e da natureza.' },
  { name: 'Carisma',      abbr: 'CAR', icon: '✨', description: 'Força de personalidade, liderança, magias de encantamento.' },
];

export const INITIATIVE_TIPS = [
  "Roleplay suas ações — descreva como seu personagem se move!",
  "Lembre-se: você pode usar sua ação bônus mesmo que esqueça a principal.",
  "Ajudar um aliado dá vantagem a ele no próximo ataque!",
  "Retirada (Dash) dobra sua velocidade de movimento.",
  "Esquivar (Dodge) dá desvantagem aos ataques contra você.",
  "Espreitar (Hide) pode ser usado em combate para atacar com vantagem!",
  "Empurrar um inimigo pode jogá-lo em uma posição desfavorável.",
  "Alvos caídos sofrem crítico de ataques corpo-a-corpo a ≤1,5m.",
  "Criaturas grandes ou maiores podem passar por aliados menores.",
  "Concentração se quebra ao sofrer dano — faça o teste de CON!",
];

export const ENCOUNTER_DIFFICULTY = [
  { level: 'Fácil',    color: '#22C55E', xpMultiplier: 1,   description: 'Os aventureiros vencerão sem gastar recursos significativos.' },
  { level: 'Médio',    color: '#EAB308', xpMultiplier: 1.5, description: 'Haverá desgaste, mas sem risco real de morte.' },
  { level: 'Difícil',  color: '#F97316', xpMultiplier: 2,   description: 'Risco real. Os jogadores precisarão de estratégia.' },
  { level: 'Mortal',   color: '#EF4444', xpMultiplier: 3,   description: 'Um ou mais personagens podem morrer. Alta tensão!' },
];

export const LOOT_TABLES = {
  common: [
    '🪙 2d6 peças de ouro', '🗡️ Adaga +1', '🧪 Poção de Cura Menor',
    '📜 Pergaminho de magia nível 1', '💎 Pedra semipreciosa (5po)',
    '🏹 Aljava com 20 flechas +1', '🔑 Chave misteriosa', '📿 Amuleto sem identificar',
  ],
  uncommon: [
    '⚔️ Espada Longa +1', '🛡️ Escudo +1', '🧪 Poção de Cura',
    '🎭 Anel de Proteção', '👢 Botas de Élfico', '🗺️ Mapa de dungeon desconhecida',
    '📜 Pergaminho de magia nível 2-3', '🔮 Orbe de Concentração',
  ],
  rare: [
    '⚔️ Espada Longa +2 (flamejante)', '🏹 Arco Élfico +2', '💍 Anel de Proteção +2',
    '🧤 Luvas de Destreza do Ogro', '🧪 Poção de Cura Superior', '🪄 Cajado do Mago',
    '🗡️ Adaga Oculta (ignora armadura não-mágica)', '📖 Tomo de +2 em Inteligência',
  ],
  legendary: [
    '⚔️ Excalibur — Espada +3, crítico em 19-20', '🔮 Olho de Vecna',
    '🏹 Arco de Apollo — nunca erra', '💀 Foice do Ceifador — mata com 1 acerto em falha',
    '🧪 Poção de Imortalidade (1 uso)', '📖 Necronomicon — acesso a todas as magias',
    '🪄 Varinha dos Desejos (3 cargas)', '👑 Coroa de Domínio — controla mortos-vivos',
  ],
};

export const MONSTERS = [
  { name: 'Goblin',         cr: '1/4', hp: '7',   ac: 15, icon: '👺', type: 'Humanoide',   description: 'Pequeno e covarde, mas perigoso em grupos. Foge quando sozinho.' },
  { name: 'Esqueleto',      cr: '1/4', hp: '13',  ac: 13, icon: '💀', type: 'Morto-Vivo',  description: 'Imune a veneno e exaustão. Vulnerável a dano esmagador.' },
  { name: 'Zumbi',          cr: '1/4', hp: '22',  ac: 8,  icon: '🧟', type: 'Morto-Vivo',  description: 'Quase imortal — se ficar a 0 PV, faz teste de CON CD 5 para ficar a 1.' },
  { name: 'Orc',            cr: '1/2', hp: '15',  ac: 13, icon: '👹', type: 'Humanoide',   description: 'Agressivo e resistente. Fúria agressiva garante avanço extra ao atacar.' },
  { name: 'Lobisomem',      cr: '3',   hp: '58',  ac: 11, icon: '🐺', type: 'Humanoide',   description: 'Imune a dano não-mágico. Pode infectar com mordida. Prata o mata.' },
  { name: 'Mimic',          cr: '2',   hp: '58',  ac: 12, icon: '🎁', type: 'Monstruosidade', description: 'Disfarça-se de baú. Gruda no alvo com pseudópodes adesivos.' },
  { name: 'Vampiro',        cr: '13',  hp: '144', ac: 16, icon: '🧛', type: 'Morto-Vivo',  description: 'Regen. 20 PV/turno. Imune a frio e necrótico. Fraqueza: luz solar.' },
  { name: 'Dragão Vermelho',cr: '17',  hp: '256', ac: 19, icon: '🐉', type: 'Dragão',      description: 'Lendário. Sopro de fogo 26d6. Imune a fogo. Resistente a magia.' },
  { name: 'Beholder',       cr: '13',  hp: '180', ac: 18, icon: '👁️', type: 'Aberração',   description: 'Antimagia central. 10 raios oculares com efeitos devastadores.' },
  { name: 'Lich',           cr: '21',  hp: '135', ac: 17, icon: '🧙', type: 'Morto-Vivo',  description: 'Arquimago imortal. Regen com phylactery. Conjurador de nível 18.' },
];

export const RANDOM_NAMES = {
  elvish:  ['Aelthas', 'Sylvara', 'Erandur', 'Lirien', 'Caladwen', 'Thaeron', 'Miriel', 'Voronwë'],
  human:   ['Aldric', 'Seraphina', 'Brennan', 'Isolde', 'Gareth', 'Mara', 'Theron', 'Elara'],
  dwarf:   ['Thordin', 'Brunhilda', 'Gorin', 'Dagny', 'Ulfgar', 'Helga', 'Balin', 'Nori'],
  orc:     ['Gruumsh', 'Vasha', 'Korgoth', 'Mog', 'Urgash', 'Draka', 'Bolg', 'Zug'],
  gnome:   ['Fizwick', 'Springle', 'Nix', 'Tock', 'Whimble', 'Fizz', 'Cogsworth', 'Pip'],
};
