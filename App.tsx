import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-native-paper";
import { openDatabase, Database } from "./src/Database";
import { theme, colorSecondary, ScheduleEvent } from "./src/Constants";
import HomeScreen from "./src/HomeScreen";
import ScheduleScreen from "./src/ScheduleScreen";
import HowToScreen from "./src/HowToScreen";

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

	let newWeek: Map<string, ScheduleEvent[]> = new Map([
		["monday", []],
		["tuesday", []],
		["wednesday", []],
		["thursday", []],
		["friday", []],
		["saturday", []],
		["sunday", []],
	]);

	// START DEMO MATERIAL
	let cs2: ScheduleEvent = {
		name: "CS2",
		building: "CLASSROOM BUILDING I",
		start: new Date(1, 1, 1, 16, 30),
		end: new Date(1, 1, 1, 17, 45),
	};

	let bio2: ScheduleEvent = {
		name: "Bio II",
		building: "CHEMISTRY BUILDING",
		start: new Date(1, 1, 1, 11, 30),
		end: new Date(1, 1, 1, 12, 20),
	};

	let bioLabs: ScheduleEvent = {
		name: "Bio II Labs",
		building: "BIOLOGICAL SCIENCES BUILDING",
		start: new Date(1, 1, 1, 13, 30),
		end: new Date(1, 1, 1, 16, 20),
	};

	let sysSoft: ScheduleEvent = {
		name: "Systems Software",
		building: "CLASSROOM BUILDING I",
		start: new Date(1, 1, 1, 19, 30),
		end: new Date(1, 1, 1, 20, 45),
	};

	let cs2Labs: ScheduleEvent = {
		name: "CS2 Labs",
		building: "HARRIS CORPORATION ENGINEERING CENTER",
		start: new Date(1, 1, 1, 14, 30),
		end: new Date(1, 1, 1, 15, 20),
	};

	let phiClub: ScheduleEvent = {
		name: "Philosophy Club",
		building: "PSYCHOLOGY BUILDING",
		start: new Date(1, 1, 1, 18, 0),
		end: new Date(1, 1, 1, 19, 0),
	};
	// END DEMO MATERIAL

	newWeek.set("monday", [cs2, bio2, sysSoft]);
	newWeek.set("wednesday", [cs2, bio2, bioLabs, sysSoft]);
	newWeek.set("friday", [bio2, cs2Labs, phiClub]);

	let db = new Database(sqlDB, setWeek);

	// Initialize DB after render
	useEffect(() => {
		sqlDB.transaction((tx) => {
			tx.executeSql(
				"create table if not exists schedules (id integer primary key not null, day_name text, events_list text);"
			);
		});
		// db.getEventsForWeek();
		setWeek(newWeek);
		console.log(week);
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
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						initialParams={{ week: week }}
					/>
					<Stack.Screen
						name="Schedule"
						component={ScheduleScreen}
						initialParams={{ week: week, db: db }}
					/>
					<Stack.Screen name="How To" component={HowToScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
