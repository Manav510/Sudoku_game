import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AppStack from '../src/navigation/AppStack/AppStack'
import useUserStore from '../src/store/zustland/authStore'
import AuthNavigator from '../src/navigation/AppStack/AuthStack'

export default function App() {
  const isAuthenticated = useUserStore((state) => state.isLoggedIn)

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar style='auto' />
          <NavigationContainer independent={true}>
            {isAuthenticated ? <AppStack /> : <AuthNavigator />}
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
