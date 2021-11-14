import React, { useEffect, useState } from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu, Provider, Button, Divider } from "react-native-paper";
import { openDatabase, Database } from "./src/Database";
import Building from "./src/Building";
import { theme, colorSecondary, ScheduleEvent } from "./src/Constants";
import HomeScreen from "./src/HomeScreen";
import ScheduleScreen from "./src/ScheduleScreen";

let sqlDB = openDatabase();
const Stack = createNativeStackNavigator();

export default function App() {
	let [week, setWeek] = useState<Map<string, ScheduleEvent[]>>(
		new Map([
			["monday", []],
			["tuesday", []],
			["wednesday", []],
			["thursday", []],
			["friday", []],
			["saturday", []],
			["sunday", []],
		])
	);
	let db = new Database(sqlDB, setWeek);

	// Initialize DB after render
	useEffect(() => {
		sqlDB.transaction((tx) => {
			tx.executeSql(
				"create table if not exists schedules (id integer primary key not null, day_name text, events_list text);"
			);
		});
	}, []);

	return (
		<Provider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Home"
				>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen
						name="Schedule"
						component={ScheduleScreen}
						initialParams={{ week: week }}
					/>
					<Stack.Screen name="How To" component={HowToScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
