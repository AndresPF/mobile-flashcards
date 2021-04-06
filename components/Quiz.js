import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Animated } from 'react-native'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { white, black, red, green, gray } from '../utils/colors'
import { HeaderBackButton } from '@react-navigation/stack'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
	state = {
		fadeAnimation: new Animated.Value(0),
	}
	componentDidMount() {
		const { id, cards, index, navigation } = this.props
		const card = cards[index]
		if (card === undefined && cards.length !== 0) {
			clearLocalNotification().then(setLocalNotification)
			navigation.setOptions({
				headerLeft: () => (
					<HeaderBackButton
						onPress={() => navigation.navigate('DeckDetail', { id })}
						tintColor={white}
					/>
				),
				headerRight: () => (
					<TextButton
						onPress={() =>
							navigation.push('Quiz', { id, index: 0, cards, correct: 0 })
						}
						style={styles.headerButton}
					>
						Start again
					</TextButton>
				),
			})
		}
		if (index === 0) {
			navigation.setOptions({
				headerLeft: () => (
					<HeaderBackButton
						onPress={() => navigation.navigate('DeckDetail', { id })}
						tintColor={white}
					/>
				),
			})
		}
	}

	showAnswer = () => {
		const { fadeAnimation } = this.state
		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start()
	}

	checkAnswer = (check) => {
		const { id, index, cards, navigation } = this.props
		let { correct } = this.props
		if (check) {
			correct += 1
		}
		navigation.push('Quiz', { id, index: index + 1, cards, correct })
	}

	render() {
		const { fadeAnimation } = this.state
		const { id, index, cards, correct } = this.props
		const card = cards[index]
		if (cards.length === 0) {
			return (
				<View style={[styles.container, { alignItems: 'center' }]}>
					<Ionicons name='sad-outline' size={60} color={black} />
					<Text style={styles.title}>There is no available questions</Text>
					<Text>Add some cards to this deck to start a quiz</Text>
				</View>
			)
		}
		if (card === undefined) {
			return (
				<View style={styles.container}>
					<Text style={styles.title}>Final Score</Text>
					<Text style={styles.answer}>
						{((correct * 100) / cards.length).toFixed()}%
					</Text>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{card.question}</Text>
				<Animated.Text
					style={[styles.answer, styles.box, { opacity: fadeAnimation }]}
				>
					{card.answer}
				</Animated.Text>
				<TextButton onPress={this.showAnswer}>Show Answer</TextButton>
				<View style={{ marginTop: 50 }}>
					<TextButton
						style={[styles.button, styles.buttonGreen]}
						onPress={() => this.checkAnswer(true)}
					>
						Correct
					</TextButton>
					<TextButton
						style={[styles.button, styles.buttonRed]}
						onPress={() => this.checkAnswer(false)}
					>
						Incorrect
					</TextButton>
				</View>
				<Text style={styles.remaining}>
					{cards.length - index - 1} questions remaining
				</Text>
			</View>
		)
	}
}

function mapStateToProps(decks, { route }) {
	const { id, index, cards, correct } = route.params

	return {
		id,
		index,
		cards,
		correct,
	}
}

const styles = StyleSheet.create({
	headerButton: {
		padding: 5,
		color: white,
	},
	container: {
		flex: 1,
		padding: 30,
		paddingTop: 100,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
	},
	title: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 10,
	},
	answer: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 30,
	},
	box: {
		padding: 10,
		borderWidth: 1,
		borderColor: gray,
	},
	button: {
		marginTop: 5,
		marginBottom: 5,
		padding: 10,
		fontWeight: '600',
		fontSize: 18,
		borderRadius: 8,
	},
	buttonRed: {
		backgroundColor: red,
		color: white,
	},
	buttonGreen: {
		backgroundColor: green,
		color: white,
	},
	remaining: {
		marginTop: 'auto',
		textAlign: 'center',
	},
})

export default connect(mapStateToProps)(Quiz)
