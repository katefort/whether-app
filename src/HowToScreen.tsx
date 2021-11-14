import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";
import React, { useEffect, useState } from "react";
import { colorSecondary, colorPrimary } from "./Constants";

function HowToScreen({ navigation }: { navigation: any }) {
	// Ton of text explaining how to use app
	return (
		<View style={hStyles.howToScreen}>
			<View style={hStyles.menuHeader}>
				<Text style={hStyles.h1}>Help</Text>
				<Button onPress={() => navigation.navigate("Home")}>
					<Ionicons
						name="close-circle-outline"
						size={32}
						color={colorSecondary}
					/>
				</Button>
			</View>

			<Text>
				<Text style={hStyles.h2}>{`Who is this app for?`}</Text>
				{"\n\n"}
				<Text style={hStyles.bodyText}>
					Whether is for University of Central Florida students who struggle to
					time their travel between classes. It overlays weather data with your
					class schedule to help you better plan for a rain-free commute! This
					should lead to less-soggy shoes for those walking, and users of
					wheel-based forms of transportation may benefit from a safer ride.
				</Text>
				{"\n\n"}
				<Text style={hStyles.h2}>How do I use Whether?</Text>
				{"\n\n"}
				<Text style={hStyles.bodyText}>
					The main screen will show your schedule, displayed as events in orange
					bubbles.
				</Text>
				{"\n\n"}
				<Text style={hStyles.h2}>What's with the green bubbles?</Text>
				{"\n\n"}
				<Text style={hStyles.bodyText}>
					The time range that you can leave so you can get to class in time is
					shown in light green. The best travel time are shown in darker green.
					(These are times that Whether determines are the least likely to have
					rain!)
				</Text>
			</Text>
		</View>
	);
}

const hStyles = StyleSheet.create({
	h1: {
		fontSize: 32,
		textAlign: "center",
		color: colorSecondary,
		textAlignVertical: "bottom",
	},
	h2: {
		fontSize: 26,
		textAlign: "center",
		color: colorSecondary,
	},
	bodyText: {
		fontSize: 22,
		lineHeight: 28,
		textAlign: "left",
		color: colorSecondary,
	},
	howToScreen: {
		justifyContent: "flex-start",
		marginTop: StatusBar.currentHeight,
		padding: "10%",
		paddingVertical: "13%",
		height: "100%",
		backgroundColor: colorPrimary,
	},
	menuHeader: {
		fontSize: 32,
		color: colorSecondary,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default HowToScreen;
