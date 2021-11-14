import { View, Button, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Styles from "./Styles";
import { colorSecondary } from "./Constants";
function HowToScreen({ navigation }: { navigation: any }) {
	// Ton of text explaining how to use app
	return (
		<View style={Styles.howToScreen}>
			<Button style={Styles.menuIcon} onPress={navigation.goBack()}>
				<Entypo
					name="circle-with-cross"
					size={48}
					color={colorSecondary}
				></Entypo>
			</Button>
			<Text style={Styles.h1}>{`Who is this app for?`}</Text>
			<Text>
				Whether is for University of Central Florida students who struggle to
				time their travel between classes. This should lead to less-soggy shoes,
				and users of wheel-based forms of transportation may benefit from a
				safer commute!
			</Text>
			<Text>
				<Text style={Styles.h1}>How do I use Whether?</Text>
				'The main screen will show your schedule, displayed as events in orange
				bubbles.
				<Text style={Styles.h1}> What's with the green bubbles?</Text>
				The time range that you can leave so you can get to class in time is
				shown in light green.\n The best travel times are shown in darker green.
				(These are times that Whether determines'
			</Text>
		</View>
	);
}

export default HowToScreen;
