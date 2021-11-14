import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Linking,
	ActivityIndicator,
	StyleSheet,
	ScrollView,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Menu, Button, Divider } from "react-native-paper";
import {
	colorPrimary,
	colorSecondary,
	defaultRadius,
	ScheduleEvent,
} from "./Constants";
import Styles from "./Styles";
import sample from "../sampleCall";

const HomeScreen = ({ route, navigation }: { route: any; navigation: any }) => {
	const [isLoading, setLoading] = useState(true);
	const [weatherData, setWeatherData] = useState([0]);
	const [temp, setTemp] = useState(0);
	let { week }: { week: Map<string, ScheduleEvent[]> } = route.params;

	// TODO: Remove this todo
	// TODO: Update to "One Call" API
	const getWeatherData = async () => {
		try {
			// TODO: delete short circuit

			// const response = await fetch(
			// 	"https://api.openweathermap.org/data/2.5/onecall?lat=28.601965825052027&lon=-81.20070363252516&appid={}",
			// 	{
			// 		method: "GET",
			// 		headers: {
			// 			Accept: "application/json",
			// 		},
			// 	}
			// );``
			// const json = await response.json();
			// setData(json);
			const json = sample;
			let hourly = json["hourly"];

			let curTemp = hourly[0]["temp"];
			curTemp = Math.round((curTemp - 273) * 1.8 + 32);
			setTemp(curTemp);

			let fifteenly: number[] = [];

			for (let i = 0; i < hourly.length; i++) {
				if (i > 0 && i < hourly.length - 1) {
					// Do funny averaging
					fifteenly.push((2 * hourly[i - 1]["pop"] + hourly[i]["pop"]) / 2);
					fifteenly.push((hourly[i - 1]["pop"] + 2 * hourly[i]["pop"]) / 3);
					fifteenly.push((hourly[i + 1]["pop"] + 2 * hourly[i]["pop"]) / 3);
					fifteenly.push((2 * hourly[i + 1]["pop"] + hourly[i]["pop"]) / 2);
				} else {
					// Don't do funny averaging (only at ends)
					for (let j = 0; j < 4; j++) {
						fifteenly.push(hourly[i]["pop"]);
					}
				}
			}
			setWeatherData(fifteenly);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getWeatherData();
	}, []);

	return (
		<View style={hStyles.homeScreen}>
			<View style={hStyles.body}>
				<ScrollView>
					<View>
						{week
							.get("monday")!
							.map((event: ScheduleEvent, i: number, arr: ScheduleEvent[]) => {
								let offset =
									event.start.getHours() * 60 + event.start.getMinutes();
								let height =
									3 *
									(event.end.getMinutes() -
										event.start.getMinutes() +
										60 * (event.end.getHours() - event.start.getHours()));

								return <Block e={event} offset={10} height={height}></Block>;
							})}
					</View>
					<View>
						{weatherData.map((value: number, i: number, arr: number[]) => {
							return <WeatherBit alpha={value} key={i} />;
						})}
					</View>
				</ScrollView>
			</View>
			<Tab navigation={navigation} temp={isLoading ? 0 : temp}></Tab>
			<StatusBar style="auto" />
		</View>
	);
};

function WeatherBit({ alpha }: { alpha: number }) {
	return (
		<View
			style={[
				{ backgroundColor: "rgba(144,228,255," + alpha + ")" },
				hStyles.weatherBitContainer,
			]}
		/>
	);
}

function Block({
	e,
	offset,
	height,
}: {
	e: ScheduleEvent;
	offset: number;
	height: number;
}) {
	console.log(e);

	return (
		<View style={[hStyles.block, { top: offset }]}>
			<Text>bonk{e.name}</Text>
			<Text>{e.building}</Text>
			<Text>
				{e.start.getHours()}:{e.start.getMinutes()}-{e.end.getHours()}:
				{e.end.getMinutes()}
			</Text>
		</View>
	);
}
function Tab({ navigation, temp }: { navigation: any; temp: number }) {
	const [menuVisible, setMenuVisible] = useState(false);

	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	return (
		<View style={hStyles.tabContainer}>
			<View style={hStyles.tabIcons}>
				<View style={hStyles.tempContainer}>
					<Ionicons name="cloud-outline" size={40} color={colorSecondary} />
					<Text style={hStyles.temp}>{"" + temp + "°F"}</Text>
				</View>
				<Menu
					contentStyle={hStyles.menuPopout}
					visible={menuVisible}
					onDismiss={closeMenu}
					anchor={
						<Button style={hStyles.menuIcon} onPress={openMenu}>
							<Entypo name="menu" size={48} color={colorSecondary}></Entypo>
						</Button>
					}
				>
					<Menu.Item
						title="Schedule"
						style={hStyles.menuButton}
						onPress={() => {
							closeMenu();
							navigation.navigate("Schedule");
						}}
					></Menu.Item>
					<Menu.Item
						title="How To"
						style={hStyles.menuButton}
						onPress={() => {
							closeMenu();
							navigation.navigate("How To");
						}}
					>
						<Text style={hStyles.menuButtonText}>How to</Text>
					</Menu.Item>
					<Menu.Item
						title="GitHub"
						style={hStyles.menuButton}
						onPress={() => {
							closeMenu();
							Linking.openURL("https://github.com/katefort/whether-app");
						}}
					></Menu.Item>
				</Menu>
			</View>
		</View>
	);
}

const hStyles = StyleSheet.create({
	homeScreen: {
		flex: 1,
	},
	body: {
		position: "relative",
		flex: 9,
	},
	tabContainer: {
		flex: 1,
		paddingLeft: "5%",
		backgroundColor: colorPrimary,
	},
	weatherBitContainer: {
		width: "100%",
		height: 45,
	},
	tempContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	temp: {
		fontSize: 18,
		color: colorSecondary,
		padding: 10,
	},
	block: {
		position: "absolute",
		zIndex: 1,
		width: "100%",
		backgroundColor: colorPrimary,
		color: "black",
	},
	tabIcons: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	menuIcon: {
		padding: "0%",
	},
	menuPopout: {
		justifyContent: "space-between",

		marginBottom: "20%",
		borderRadius: defaultRadius,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.5,
		elevation: 7,

		backgroundColor: colorSecondary,
	},
	menuButton: {},
	menuButtonText: {
		fontSize: 20,
	},
});
export default HomeScreen;
