import { DefaultTheme } from "react-native-paper";
import Building from "./Building";

export const colorPrimary = "#3A3A3A";
export const colorSecondary = "#FFFFFF";
export const defaultRadius = 20;
export const theme = {
	...DefaultTheme,
	roundness: defaultRadius,
	colors: {
		...DefaultTheme.colors,
		primary: colorPrimary,
		accent: colorSecondary,
	},
};

export interface ScheduleEvent {
	name: string;
	building: Building;
	start: Date;
	end: Date;
}
