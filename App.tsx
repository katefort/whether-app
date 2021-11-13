import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
	return (
		<View style={styles.app}>
			<View style={styles.body}>
				<Text>reeee</Text>
			</View>
			<View style={styles.tabContainer}>
				<Ionicons
					name="cloud-outline"
					size={64}
					color={colorSecondary}
				></Ionicons>
				<Pressable style={styles.hamburgerButton}>
					<Ionicons name="md-menu" size={64} color={colorSecondary}></Ionicons>
				</Pressable>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const colorPrimary = "#3A3A3A";
const colorSecondary = "#FFFFFF";
const styles = StyleSheet.create({
	app: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
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
		display: "flex",
		flexDirection: "row",
		paddingLeft: "5%",
		justifyContent: "space-between",

		position: "relative",
		width: "100%",
		height: "10%",

		backgroundColor: colorPrimary,
	},
	hamburgerButton: {},
});
