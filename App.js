import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const Tab = createBottomTabNavigator()
const Tabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          switch (route.name) {
            case 'Decks':
              iconName = focused ? 'md-list-circle' : 'md-list-circle-outline'
              break

            case 'Add Deck':
              iconName = focused ? 'md-add-circle' : 'md-add-circle-outline'
              break

            default:
              iconName = focused ? 'md-happy' : 'md-happy-outline'
              break
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Decks' component={Decks} />
      <Tab.Screen name='Add Deck' component={AddDeck} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

const MainNavigation = (props) => {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={{
            title: 'Decks',
          }}
        />
        <Stack.Screen name='DeckDetail' component={DeckDetail} />
        <Stack.Screen name='Add Card' component={AddCard} />
        <Stack.Screen
          name='Quiz'
          component={Quiz}
          options={{
            headerTitleAlign: 'left',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <StatusBar style='auto' />
      <MainNavigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
})
