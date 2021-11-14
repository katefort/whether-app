import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Linking } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Menu, Button, Divider } from "react-native-paper";
import { colorPrimary, colorSecondary } from "./Constants";
import Styles from "./Styles";

function HomeScreen({ navigation }: { navigation: any }) {
	return (
		<View style={Styles.homeScreen}>
			<View style={Styles.body}>
				<Text>reeee</Text>
			</View>
			<Tab navigation={navigation}></Tab>
			<StatusBar style="auto" />
		</View>
	);
}

function Tab({ navigation }: { navigation: any }) {
	const [menuVisible, setMenuVisible] = useState(false);

	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	return (
		<View style={Styles.tabContainer}>
			<View style={Styles.tabIcons}>
				<Ionicons
					name="cloud-outline"
					size={48}
					color={colorSecondary}
				></Ionicons>
				<Menu
					contentStyle={Styles.menuPopout}
					visible={menuVisible}
					onDismiss={closeMenu}
					anchor={
						<Button style={Styles.menuIcon} onPress={openMenu}>
							<Entypo name="menu" size={48} color={colorSecondary}></Entypo>
						</Button>
					}
				>
					<Menu.Item
						title="Schedule"
						style={Styles.hamburgerButton}
						onPress={() => {
							navigation.navigate("Schedule");
							closeMenu();
						}}
					></Menu.Item>
					<Divider />
					<Menu.Item
						title="How To"
						style={Styles.hamburgerButton}
						onPress={() => {
							navigation.navigate("How To");
							closeMenu();
						}}
					>
						<Text style={Styles.hamburgerButtonText}>How to</Text>
					</Menu.Item>
					<Menu.Item
						title="GitHub"
						style={Styles.hamburgerButton}
						onPress={() => {
							Linking.openURL("https://github.com/katefort/whether-app");
							closeMenu();
						}}
					></Menu.Item>
				</Menu>
			</View>
		</View>
	);
}

export default HomeScreen;
