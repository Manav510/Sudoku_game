import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from 'src/screens/LoginPage/LoginPage'
import Signup from 'src/screens/SignUpPage/SignUpPage'
import RouteNames from '../RouteNames'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={RouteNames.Login} component={LoginPage} />
      <AuthStack.Screen name={RouteNames.Signup} component={Signup} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator