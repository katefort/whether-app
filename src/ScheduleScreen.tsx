import { ScheduleEvent } from "./Constants";
import { View, SectionList, Text } from "react-native";
import Styles from "./Styles";

function ScheduleScreen({
	navigation,
	week,
}: {
	navigation: Navigator;
	week: Map<string, ScheduleEvent[]>;
}) {
	interface data {
		title: string;
		data: ScheduleEvent[];
	}

	let days: data[] = [];
	week.forEach(
		(val: ScheduleEvent[], key: string, week: Map<string, ScheduleEvent[]>) => {
			days.push({ title: key, data: val });
		}
	);
	return (
		<View style={Styles.scheduleScreen}>
			<SectionList
				sections={days}
				renderItem={({ item }) => {
					<Event day={item} />;
				}}
				renderSectionHeader={({ section }) => (
					<Text style={Styles.scheduleSectionHeader}>{section.title}</Text>
				)}
				keyExtractor={({ item, index }) => item}
				stickySectionHeadersEnabled
			/>
		</View>
	);
}

function Event({ day }: { day: ScheduleEvent }) {
	return (
		<View style={Styles.eventContainer}>
			<Text style={Styles.eventName}>{day.name}</Text>
			<Text style={Styles.eventBldg}>{day.building}</Text>
			<Text style={Styles.eventStart}>{day.start}</Text>
			<Text style={Styles.eventEnd}>{day.end}</Text>
		</View>
	);
}

export default ScheduleScreen;
