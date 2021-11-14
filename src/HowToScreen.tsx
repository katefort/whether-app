import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import Styles from "./Styles";
import React, { useEffect, useState } from "react";
import { colorSecondary, colorPrimary } from "./Constants";

function HowToScreen({ navigation }: { navigation: any }) {
	// Ton of text explaining how to use app
	return (
		<View style={hStyles.howToScreen}>
			<View style={hStyles.menuHeader}>
				<Text style={hStyles.h1}>Help Menu</Text>
				<Button onPress={() => navigation.navigate("Home")}>
					<Entypo name="circle-with-cross" size={32} color={colorSecondary} />
				</Button>
			</View>
			<Text style={hStyles.h1}>{`Who is this app for?`}</Text>
			<Text style={hStyles.bodyText}>
				Whether is for University of Central Florida students who struggle to
				time their travel between classes. It overlays weather data with your
				class schedule to help you better plan for a rain-free commute! This
				should lead to less-soggy shoes for those walking, and users of
				wheel-based forms of transportation may benefit from a safer ride.
			</Text>
			<Text>
				<Text style={hStyles.h1}>How do I use Whether?</Text>
				The main screen will show your schedule, displayed as events in orange
				bubbles.
				<Text style={hStyles.h2}> What's with the green bubbles?</Text>
				<Text style={hStyles.bodyText}>
					The time range that you can leave so you can get to class in time is
					shown in light green. The best travel times are shown in darker green.
					(These are times that Whether determines are the least likely to have
					rain!)
				</Text>
			</Text>
		</View>
	);
}

const hStyles = StyleSheet.create({
	h1: {
		fontSize: 30,
		textAlign: "left",
		color: colorSecondary,
	},
	h2: {
		fontSize: 24,
		textAlign: "left",
		color: colorSecondary,
	},
	bodyText: {
		fontSize: 18,
		textAlign: "left",
		color: colorSecondary,
	},
	howToScreen: {
		marginTop: StatusBar.currentHeight,
		padding: "10%",
		height: "100%",

		backgroundColor: colorPrimary,
	},
	menuHeader: {
		fontSize: 42,
		color: colorSecondary,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default HowToScreen;
