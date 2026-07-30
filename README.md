# ⚔️ RPG Companion

> **Seu grimório digital de aventuras** — Um app completo para sessões de RPG de mesa

![RPG Companion](./assets/splash.png)

---

## 🚀 Como Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o Expo
npx expo start

# 3. Abrir no celular
# → Escaneie o QR Code com o app "Expo Go" (iOS ou Android)
```

---

## 📱 Telas & Funcionalidades

### 🏠 Home
- Banner heroico com botão de rolar D20 rápido
- Navegação rápida para todas as seções
- Dica de combate rotativa (muda a cada 5 segundos)
- Visão geral de todos os recursos

### 🎲 Dados (`DiceScreen`)
| Recurso | Detalhe |
|---------|---------|
| Seletor de dados | D4, D6, D8, D10, D12, **D20**, D100 |
| Animação de rolagem | Shuffle rápido antes do resultado |
| Múltiplos dados | Até 20 dados ao mesmo tempo |
| Modificador | +/- para bônus/penalidade |
| Notação personalizada | `2d6+3`, `4d8-2`, `1d20+5` |
| Crítico/Falha Crítica | D20 mostra alerta especial em 20 ou 1 |
| Histórico | Últimas 30 rolagens com breakdown |

### 📖 Grimório (`SpellsScreen` + `SpellDetailScreen`)
| Escola | Magias |
|--------|--------|
| 🔥 Evocação | Bola de Fogo, Raio, Míssil Mágico... |
| 💀 Necromancia | Toque Vampírico, Animar Mortos... |
| 🌀 Ilusionismo | Invisibilidade, Dominação de Pessoa... |
| ⚗️ Transmutação | Polimorfismo, Desintegrar, Voo... |
| 🔮 Divinação | Visão Verdadeira, Presciência... |
| 🛡️ Abjuração | Contrafeitiço, Globo Antimagia... |

- Filtro por escola e busca por nome/tipo
- Detalhes completos: nível, escola, dano, descrição
- Dicas de uso contextuais para cada magia

### ⚔️ Classes (`ClassesScreen` + `ClassDetailScreen`)
8 classes: **Guerreiro, Mago, Clérigo, Ladino, Ranger, Paladino, Bárbaro, Bardo**

Cada classe inclui:
- Dado de Vida, Atributos Primários
- Habilidades de Classe e Salvaguardas
- **Gerador de Atributos** — rola 4d6 descarta o menor

### 🛠️ Ferramentas (`ToolsScreen`)
| Ferramenta | O que faz |
|------------|-----------|
| 💀 Condições | 14 condições com efeitos detalhados (clique para expandir) |
| 👹 Bestiário | 10 monstros clássicos com CR, PV, CA e habilidades |
| 💰 Tabela de Loot | Gera itens aleatórios: Comum, Incomum, Raro, Lendário |
| 🏷️ Gerador de Nomes | Elfos, Humanos, Anões, Orcs, Gnomos |
| ⚔️ Dificuldade | Guia de encontros Fácil/Médio/Difícil/Mortal |
| 📊 Atributos | Referência dos 6 atributos + tabela de modificadores |

---

## 🎨 Design System

```
Tema: Dark Fantasy
Cor principal: #9D4EDD (Roxo arcano)
Fundo: #0D0A1A (Preto profundo)
Cards: #160F2E (Roxo escuro)
Texto: #F0E6FF (Branco violáceo)
Dourado: #FFD700 (Destaque e ouro)
```

---

## 📂 Estrutura de Arquivos

```
rpg-companion/
├── App.js                          # Entry point
├── app.json                        # Config Expo
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         # Bottom tabs + Stacks
│   ├── screens/
│   │   ├── HomeScreen.js           # Tela inicial
│   │   ├── DiceScreen.js           # Rolagem de dados
│   │   ├── SpellsScreen.js         # Lista de magias
│   │   ├── SpellDetailScreen.js    # Detalhe da magia
│   │   ├── ClassesScreen.js        # Lista de classes
│   │   ├── ClassDetailScreen.js    # Detalhe da classe
│   │   └── ToolsScreen.js          # Ferramentas diversas
│   ├── components/
│   │   ├── GlowCard.js             # Card com glow colorido
│   │   └── ScreenHeader.js         # Header reutilizável
│   ├── utils/
│   │   ├── theme.js                # Cores, fontes, espaçamentos
│   │   └── diceUtils.js            # Lógica de rolagem de dados
│   └── data/
│       └── rpgData.js              # Todos os dados do jogo
```

---

## 📦 Dependências Principais

| Pacote | Uso |
|--------|-----|
| `expo` ~51 | Framework base |
| `@react-navigation/native` | Navegação |
| `@react-navigation/bottom-tabs` | Tab bar |
| `expo-linear-gradient` | Gradientes arcanos |
| `expo-haptics` | Vibração ao rolar dados |
| `@expo/vector-icons` | Ícones Ionicons |
| `react-native-reanimated` | Animações fluidas |
| `react-native-safe-area-context` | Safe area |

---

## 🔧 Próximas Funcionalidades (Sugestões)

- [ ] 💾 **Salvar personagens** com AsyncStorage
- [ ] ⏱️ **Rastreador de iniciativa** para combate
- [ ] 🎵 **Sons de dados** com expo-av
- [ ] 🌐 **Mais feitiços** (lista completa D&D 5e)
- [ ] 📜 **Ficha de personagem** completa
- [ ] 🗓️ **Timer de turno** para agilizar combate
- [ ] 🔔 **Notificações** para lembrar sessão
- [ ] 🌙 **Temas** (Tolkien, Lovecraft, Sci-fi)

---

*Que os dados estejam ao seu favor! ✨*
