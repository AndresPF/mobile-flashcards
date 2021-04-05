import React, { Component } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { handleReceiveDecks } from "../actions"
import { connect } from "react-redux"
import TextButton from "./TextButton"

function Deck({ deck, onPress }) {
	return (
		<TextButton style={styles.listButton} onPress={onPress}>
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text>{deck.questions.length} Cards</Text>
			</View>
		</TextButton>
	)
}

class Decks extends Component {
	componentDidMount() {
		this.props.dispatch(handleReceiveDecks())
	}
	render() {
		const { decks } = this.props
		return (
			<View>
				<FlatList
					data={Object.keys(decks)}
					renderItem={({ item }) => <Deck deck={decks[item]} />}
					keyExtractor={(item) => item}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	listButton: {
		borderBottomWidth: 1,
		padding: 10,
		paddingTop: 20,
		paddingBottom: 20,
	},
	title: {
		fontSize: 26,
		fontWeight: "700",
	},
})

function mapStateToProps(decks) {
	return {
		decks,
	}
}

export default connect(mapStateToProps)(Decks)
