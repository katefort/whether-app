import * as SQLite from "expo-sqlite";
import Building from "./Building";
import { WebSQLDatabase } from "expo-sqlite";
import { ScheduleEvent } from "./Constants";

// interface ScheduleDay {
// 	day_name: string;
// 	events: ScheduleEvent[];
// }

export function openDatabase() {
	// if (Platform.OS === "web") {
	// 	return {
	// 		transaction: () => {
	// 			return {
	// 				executeSql: () => {},
	// 			};
	// 		},
	// 	};
	// }

	const db = SQLite.openDatabase("ScheduleDatabase.db");
	return db;
}

export class Database {
	public db: WebSQLDatabase;
	public setWeek: Function;
	constructor(db: WebSQLDatabase, setWeek: Function) {
		this.db = db;
		this.setWeek = setWeek;
	}

	getEventsForWeek() {
		let resultWeek: Map<string, ScheduleEvent[]> = new Map();
		const days = [
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
			"sunday",
		];

		for (let day of days) {
			resultWeek.set(day, this.retrieveDay(day));
		}

		this.setWeek(resultWeek);
	}

	addEvent(
		week: Map<string, ScheduleEvent[]>,
		day: string,
		name: string,
		building: Building,
		start: Date,
		end: Date
	) {
		let newEvent: ScheduleEvent = {
			name: name,
			building: building,
			start: start,
			end: end,
		};

		let newWeek: Map<string, ScheduleEvent[]> = new Map();

		for (let day_name of Array.from(week.keys())) {
			if (day_name === day) {
				continue;
			}

			let same = week.get(day_name);
			if (same) {
				newWeek.set(day_name, same);
			}
		}

		let newEvents = week.get(day);
		if (newEvents) {
			newEvents.push(newEvent);
			newWeek.set(day, newEvents);

			// Update state in App
			this.setWeek(newWeek);
			// Replace DB entry for day with new event list
			this.storeDay(day, newEvents);
		}
	}

	removeEvent(week: Map<string, ScheduleEvent[]>, day: string, name: string) {
		let newWeek: Map<string, ScheduleEvent[]> = new Map();

		for (let day_name of Array.from(week.keys())) {
			if (day_name === day) {
				continue;
			}

			let same = week.get(day_name);
			if (same) {
				newWeek.set(day_name, same);
			}
		}

		let newEvents = week.get(day);
		if (newEvents) {
			const index = newEvents.map((event) => event.name).indexOf(day);
			if (index > -1) {
				newEvents.splice(index, 1);
			}

			// Update state in App
			this.setWeek(newWeek);
			// Replace DB entry for day with new event list
			this.storeDay(day, newEvents);
		}
	}

	storeDay(day_name: string, events: ScheduleEvent[]) {
		if (events.length == 0) {
			alert("Add some events first!");
			return;
		}

		this.db.transaction((tx) => {
			tx.executeSql(
				"insert or replace into schedules (id, day_name, events_list) values\
                    (select id from schedules where day_name = ?), ?, ?);",
				[day_name, day_name, JSON.stringify(events)]
			);

			// Debug print
			tx.executeSql("select * from schedules", [], (_, { rows }) => {
				console.log(JSON.stringify(rows));
			});
		});
	}

	retrieveDay(day_name: string) {
		let result: ScheduleEvent[] = [];

		this.db.transaction((tx) => {
			tx.executeSql(
				"select * from schedules where day_name = ?",
				[day_name],
				(_, { rows }) => {
					if (rows.length > 1) {
						console.log("More than one entry for " + day_name + " exists!!!");
					} else if (rows.length < 1) {
						console.log("No entry for " + day_name + " exists.");
					} else {
						const row = rows.item(0);
						result = JSON.parse(row[2]);
					}
				}
			);
		});

		return result;
	}
}
