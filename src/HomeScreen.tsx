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
			let hourly = json["hourly"].slice(0, 24);

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
					<View style={{ alignSelf: "center", left: "-40%", zIndex: 1 }}>
						{week
							.get("monday")!
							.map((event: ScheduleEvent, i: number, arr: ScheduleEvent[]) => {
								let offset =
									event.start.getHours() * 60 + event.start.getMinutes();
								let height =
									event.end.getMinutes() -
									event.start.getMinutes() +
									60 * (event.end.getHours() - event.start.getHours());

								return (
									<Block
										e={event}
										offset={offset}
										height={height}
										key={i}
									></Block>
								);
							})}
					</View>
					<View>
						{weatherData.map((value: number, i: number, arr: number[]) => {
							return <WeatherBit alpha={value} key={i} />;
						})}
					</View>
					<View>
						{/* // create a block using weather data & classes 
						// make block from end of last class to 15 minutes before next class */}
						{/* {week.
							.get("monday")!
							min = Math.min(...json["hourly"].slice(0, 24));
							} */}
					</View>
					<CurrentTimePointer side={"top"}></CurrentTimePointer>
					<CurrentTimePointer side={"bottom"}></CurrentTimePointer>
				</ScrollView>
			</View>
			<Tab navigation={navigation} temp={isLoading ? 0 : temp}></Tab>
			<StatusBar style="auto" />
		</View>
	);
};

function CommuteBlock({
	e,
	offset,
	height,
}: {
	e: ScheduleEvent;
	offset: number;
	height: number;
}) {}

function WeatherBit({ alpha }: { alpha: number }) {
	return (
		<View
			style={[
				{ backgroundColor: "rgba(122,177,255," + alpha + ")" },
				hStyles.weatherBitContainer,
			]}
		/>
	);
}

function CurrentTimePointer({ side }: { side: string }) {
	let now = new Date(Date.now());

	return (
		<View
			style={[
				{
					top:
						now.getHours() * 60 +
						now.getMinutes() +
						(side == "bottom" ? 10 : 0),
					zIndex: 4,
					position: "absolute",
				},
				side == "bottom"
					? hStyles.currentTimePointerBot
					: hStyles.currentTimePointerTop,
			]}
		></View>
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
	return (
		<View style={[hStyles.block, { top: offset, height: height }]}>
			<Text
				style={{
					color: "white",
					fontSize: 14,
					textAlign: "center",
				}}
			>
				{e.name}
			</Text>
			<Text
				style={{
					color: "white",
					fontSize: 14,
					textAlign: "center",
				}}
			>
				{e.building}
			</Text>
			<Text
				style={{
					color: "white",
					fontSize: 14,
					textAlign: "center",
				}}
			>
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
		backgroundColor: "#d3fcff",
		flex: 1,
	},
	body: {
		position: "relative",
		flex: 9,
	},
	tabContainer: {
		height: "10%",
		flex: 1,
		paddingLeft: "5%",
		backgroundColor: colorPrimary,
	},
	weatherBitContainer: {
		width: "100%",
		height: 15,
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
	currentTimePointerBot: {
		borderTopColor: "#FF7F11",
		borderRightColor: "#FF7F11",
		borderLeftColor: "#FF7F11",
		borderBottomColor: "transparent",
		borderWidth: 10,
		borderTopWidth: 2,
		height: 5,
		width: "100%",
		left: 0,
		right: 0,
	},
	currentTimePointerTop: {
		borderTopColor: "transparent",
		borderRightColor: "#FF7F11",
		borderLeftColor: "#FF7F11",
		borderBottomColor: "#FF7F11",
		borderWidth: 10,
		borderBottomWidth: 2,
		height: 5,
		width: "100%",
		left: 0,
		right: 0,
	},
	block: {
		display: "flex",
		borderRadius: defaultRadius,
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		width: "80%",
		backgroundColor: colorPrimary,
		opacity: 0.8,
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
