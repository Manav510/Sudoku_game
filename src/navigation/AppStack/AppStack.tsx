import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RouteNames from '../RouteNames';
import HomePage from 'src/screens/HomePage.tsx/HomePage';
import GamePage from 'src/screens/GamePage/GamePage';
import WinnerScreen from 'src/screens/ResultPage/WnnerPage';
import LooserScreen from 'src/screens/ResultPage/LooserPage';
const Stack = createNativeStackNavigator();

const AppStack = () => {    
	return (
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name={RouteNames.Home} component={HomePage} />
				<Stack.Screen name={RouteNames.Game} component={GamePage} />
				<Stack.Screen name={RouteNames.Winner} component={WinnerScreen} />
				<Stack.Screen name={RouteNames.Looser} component={LooserScreen} />
			</Stack.Navigator>
	);
};

export default AppStack;
