import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Linking,
	ActivityIndicator,
	StyleSheet,
	FlatList,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Menu, Button, Divider } from "react-native-paper";
import { colorPrimary, colorSecondary, defaultRadius } from "./Constants";
import Styles from "./Styles";
import sample from "../sampleCall";

const HomeScreen = ({ route, navigation }: { route: any; navigation: any }) => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([0]);
	const [temp, setTemp] = useState(0);
	let { week } = route.params;

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

			for (let hour of hourly) {
				for (let i = 0; i < 4; i++) {
					fifteenly.push(255 * hour["pop"]);
				}
			}
			setData(fifteenly);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	let weatherData;
	useEffect(() => {
		getWeatherData();
	}, []);

	const renderItem = ({ item }: { item: number }) => (
		<WeatherBit alpha={item} />
	);

	return (
		<View style={hStyles.homeScreen}>
			<View style={hStyles.body}>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item, index) => "" + item + index}
				/>
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
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	weatherBitContainer: {
		width: "100%",
		height: 10,
	},
	tempContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	temp: {
		fontSize: 18,
		color: colorSecondary,
		padding: 10,
		textAlignVertical: "bottom",
	},
	body: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",

		position: "relative",
		width: "100%",
		height: "90%",

		backgroundColor: "white",
		color: "#684655",
	},
	tabContainer: {
		position: "relative",
		justifyContent: "center",

		width: "100%",
		height: "10%",
		paddingLeft: "5%",
		paddingRight: "2%",
		backgroundColor: colorPrimary,
	},
	tabIcons: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	menuIcon: {},
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
