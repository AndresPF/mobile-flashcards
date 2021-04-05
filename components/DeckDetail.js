import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white, red } from '../utils/colors'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { handleDeleteDeck } from '../actions'

class DeckDetail extends Component {
	componentDidMount() {
		const { setOptions } = this.props.navigation
		const { title } = this.props

		setOptions({
			title,
		})
	}

	addCard = () => {}

	startQuiz = () => {}

	deleteDeck = () => {
		const { id, navigation, dispatch } = this.props
		dispatch(handleDeleteDeck(id))
		navigation.navigate('Decks')
	}

	render() {
		const { title, cards, checkDisabled } = this.props
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<Text style={{ textAlign: 'center' }}>{cards} Cards</Text>
				<TextButton
					style={[styles.button, styles.lightButton]}
					onPress={this.onPress}
				>
					Add Card
				</TextButton>
				<TextButton style={styles.button} onPress={this.onPress}>
					Start Quiz
				</TextButton>
				<TextButton style={styles.redButton} onPress={this.deleteDeck}>
					Delete Deck
				</TextButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
		paddingTop: 100,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 26,
		fontWeight: '700',
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		fontWeight: '600',
		fontSize: 18,
		backgroundColor: purple,
		color: white,
		borderRadius: 8,
	},
	lightButton: {
		marginTop: 50,
		backgroundColor: white,
		color: purple,
		borderColor: purple,
		borderWidth: 1,
	},
	redButton: { fontWeight: '600', fontSize: 18, color: red, padding: 10 },
	disabled: {
		opacity: 0.3,
	},
})

function mapStateToProps(decks, { route }) {
	const id = route.params.id
	return {
		id,
		title: decks[id]?.title,
		cards: decks[id]?.questions ? decks[id].questions.length : 0,
		checkDisabled: decks[id]?.questions.length === 0,
	}
}

export default connect(mapStateToProps)(DeckDetail)
