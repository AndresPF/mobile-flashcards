import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { handleDeleteDeck } from '../actions'
import { HeaderBackButton } from '@react-navigation/stack'

class DeckDetail extends Component {
	componentDidMount() {
		const { navigation } = this.props
		const { title } = this.props

		navigation.setOptions({
			title,
			headerLeft: () => (
				<HeaderBackButton
					onPress={() => navigation.navigate('Decks')}
					tintColor={white}
				/>
			),
		})
	}

	shouldComponentUpdate() {
		const { title } = this.props
		return title !== undefined
	}

	addCard = () => {
		const { id, title, navigation } = this.props
		navigation.push('Add Card', { id, title })
	}

	startQuiz = () => {
		const { id, cards, navigation } = this.props
		navigation.push('Quiz', { id, index: 0, correct: 0, cards })
		clearLocalNotification().then(setLocalNotification)
	}

	deleteDeck = () => {
		const { id, navigation, dispatch } = this.props
		navigation.navigate('Decks')
		dispatch(handleDeleteDeck(id))
	}

	render() {
		const { title, cards, checkDisabled } = this.props
		const len = cards ? cards.length : 0
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<Text style={{ textAlign: 'center' }}>{len} Cards</Text>
				<TextButton
					style={[styles.button, styles.lightButton]}
					onPress={this.addCard}
				>
					Add Card
				</TextButton>
				<TextButton style={styles.button} onPress={this.startQuiz}>
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
		cards: decks[id]?.questions,
		checkDisabled: decks[id]?.questions.length === 0,
	}
}

export default connect(mapStateToProps)(DeckDetail)
