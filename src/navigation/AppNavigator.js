import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

// Screens
import HomeScreen         from '../screens/HomeScreen';
import DiceScreen         from '../screens/DiceScreen';
import SpellsScreen       from '../screens/SpellsScreen';
import ClassesScreen      from '../screens/ClassesScreen';
import ToolsScreen        from '../screens/ToolsScreen';
import SpellDetailScreen  from '../screens/SpellDetailScreen';
import ClassDetailScreen  from '../screens/ClassDetailScreen';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

// ── Stacks ──────────────────────────────────────
function SpellsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SpellsList"   component={SpellsScreen} />
      <Stack.Screen name="SpellDetail"  component={SpellDetailScreen} />
    </Stack.Navigator>
  );
}

function ClassesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClassesList"  component={ClassesScreen} />
      <Stack.Screen name="ClassDetail"  component={ClassDetailScreen} />
    </Stack.Navigator>
  );
}

// ── Tab Icon ─────────────────────────────────────
function TabIcon({ name, focused, label }) {
  return (
    <View style={styles.tabIconWrap}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? COLORS.primaryGlow : COLORS.textMuted}
      />
      <Text style={[styles.tabLabel, { color: focused ? COLORS.primaryGlow : COLORS.textMuted }]}>
        {label}
      </Text>
      {focused && <View style={styles.tabDot} />}
    </View>
  );
}

// ── Main Navigator ────────────────────────────────
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Início" />
          ),
        }}
      />
      <Tab.Screen
        name="Dice"
        component={DiceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'dice' : 'dice-outline'} focused={focused} label="Dados" />
          ),
        }}
      />
      <Tab.Screen
        name="Spells"
        component={SpellsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'sparkles' : 'sparkles-outline'} focused={focused} label="Magias" />
          ),
        }}
      />
      <Tab.Screen
        name="Classes"
        component={ClassesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'people' : 'people-outline'} focused={focused} label="Classes" />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'construct' : 'construct-outline'} focused={focused} label="Ferramentas" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#100B20',
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryGlow,
    marginTop: 2,
  },
});
