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
		<View style={Styles.scheduleScreen}>
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
				<Ionicons name="add-circle" size={32} color={colorTertiary}></Ionicons>
			</Pressable>
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
			<View style={eStyles.eventHeaderContainer}>
				<Text style={eStyles.eventName}>{e.name}</Text>
				<Pressable onPress={() => db.removeEvent(week, day, e.name)}>
					<Entypo name="minus" size={48} color={"red"} />
				</Pressable>
			</View>
			<Text style={eStyles.eventBldg}>{e.building}</Text>
			<Text style={eStyles.eventStart}>
				{e.start.getHours()}:{e.start.getMinutes()} - {e.end.getHours()}:
				{e.end.getMinutes()}
			</Text>
		</View>
	);
}

const eStyles = StyleSheet.create({
	sectionHeaderContainer: {
		backgroundColor: colorPrimary,
	},
	sectionHeaderText: {
		fontSize: 32,
		color: colorSecondary,
		textTransform: "capitalize",
		textAlign: "center",
		padding: "5%",
	},
	eventContainer: {
		position: "relative",
		borderRadius: defaultRadius,
		backgroundColor: colorTertiary,
		paddingTop: "2%",
		padding: "6%",
		marginBottom: "10%",
	},
	eventHeaderContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	eventName: {
		textAlign: "center",
		fontSize: 24,
	},
	eventBldg: {
		textTransform: "capitalize",
		fontSize: 15,
	},
	eventStart: {},
	eventEnd: {},
});

export default ScheduleScreen;
