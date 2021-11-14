import { View, SectionList, Text, Pressable, StyleSheet } from "react-native";
import Styles from "./Styles";
import React, { useState, useEffect } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
	colorPrimary,
	colorSecondary,
	colorTertiary,
	defaultRadius,
	ScheduleEvent,
} from "./Constants";
import { Database } from "./Database";

function ScheduleScreen({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) {
	interface data {
		title: string;
		data: ScheduleEvent[];
	}

	let { week, db }: { week: Map<string, ScheduleEvent[]>; db: Database } =
		route.params;

	// make week info parseable to SectionList
	let days: data[] = [];
	for (let key of Array.from(week.keys())) {
		days.push({ title: key, data: week.get(key)! });
	}

	return (
		<View style={eStyles.scheduleScreen}>
			<View style={{ position: "relative" }}>
				<View style={eStyles.headerContainer}>
					<View style={{ width: 36 }}></View>
					<Text style={eStyles.menuHeader}>Schedule</Text>
					<Pressable
						// TODO: Route onPress to new screen that takes user input
						onPress={() => {
							route.params.db.addEvent(
								route.params.week,
								"friday",
								"CS2",
								"CLASSROOM BUILDING I",
								new Date(),
								new Date()
							);
						}}
					>
						<Ionicons
							name="add-circle"
							size={32}
							color={colorTertiary}
						></Ionicons>
					</Pressable>
				</View>
				<SectionList
					sections={days}
					keyExtractor={({ name, building, start, end }) =>
						name + building + start + end
					}
					renderItem={({ item }) => (
						<Event e={item} db={route.params.db} week={route.params.week} />
					)}
					renderSectionHeader={({ section }) => (
						<View style={eStyles.sectionHeaderContainer}>
							<Text style={eStyles.sectionHeaderText}>{section.title}</Text>
						</View>
					)}
					stickySectionHeadersEnabled
				/>
			</View>
		</View>
	);
}

function Event({
	e,
	db,
	week,
}: {
	e: ScheduleEvent;
	db: Database;
	week: Map<string, ScheduleEvent[]>;
}) {
	const weekday = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];
	const day = weekday[e.start.getDay()];

	return (
		<View style={eStyles.eventContainer}>
			<View style={eStyles.eventText}>
				<Text style={eStyles.eventName}>{e.name}</Text>
				<Text style={eStyles.eventBldg}>{e.building}</Text>
				<Text style={eStyles.eventStart}>
					{e.start.getHours()}:{e.start.getMinutes()} - {e.end.getHours()}:
					{e.end.getMinutes()}
				</Text>
			</View>
			<Pressable
				style={{ flex: 1, alignItems: "center" }}
				onPress={() => db.removeEvent(week, day, e.name)}
			>
				<Ionicons name="remove-circle" size={36} color={"red"} />
			</Pressable>
		</View>
	);
}

const eStyles = StyleSheet.create({
	scheduleScreen: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: colorPrimary,
		padding: "5%",
	},
	headerContainer: {
		paddingTop: 24,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	menuHeader: {
		fontSize: 32,
		color: colorSecondary,
	},
	sectionHeaderContainer: {
		backgroundColor: colorPrimary,
	},
	// Monday, Wednesday, etc.
	sectionHeaderText: {
		fontSize: 32,
		color: colorSecondary,
		textTransform: "capitalize",
		textAlign: "left",
		padding: "4%",
	},
	eventText: {
		flex: 4,
	},
	eventContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		zIndex: 2, 
		width: "100%",
		padding: "4%",

		borderRadius: defaultRadius,
		backgroundColor: colorTertiary,
		marginBottom: "10%",
	},
	eventName: {
		fontSize: 24,
	},
	eventBldg: {
		textTransform: "capitalize",
		fontSize: 18,
	},
	eventStart: {
		fontSize: 18 
	},
	eventEnd: {},
});

export default ScheduleScreen;
