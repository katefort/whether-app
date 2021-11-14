import { colorPrimary, colorSecondary, defaultRadius } from "./Constants";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
	scheduleScreen: {
		width: "100%",
		height: "100%",
		alignItems: "center",

		backgroundColor: colorPrimary,
		padding: "5%",
		paddingTop: "15%",
	},
	show: {
		display: "flex",
	},
	hide: {
		display: "none",
	},

});

export default Styles;
