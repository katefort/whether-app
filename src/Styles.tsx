import { colorPrimary, colorSecondary, defaultRadius } from "./Constants";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
	homeScreen: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	scheduleScreen: {
		width: "100%",
		height: "100%",

		backgroundColor: colorPrimary,
		padding: "10%",
		paddingTop: "15%",
	},
	scheduleSectionHeader: {
		fontSize: 32,
		color: colorSecondary,
	},
	eventContainer: {},
	eventName: {},
	eventBldg: {},
	eventStart: {},
	eventEnd: {},
	howToScreen: {
		backgroundColor: colorPrimary,
		padding: "15%",
		marginVertical: "5%",
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
		display: "flex",
		justifyContent: "center",

		width: "100%",
		height: "10%",
		paddingLeft: "4%",
		paddingRight: "4%",

		backgroundColor: colorPrimary,
	},
	tabIcons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
	hamburgerButton: {},
	hamburgerButtonText: {
		fontSize: 20,
	},
	show: {
		display: "flex",
	},
	hide: {
		display: "none",
	},
	h1: {
		fontSize: 32,
		textAlign: "left",
	},
});

export default Styles;
