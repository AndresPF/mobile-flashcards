import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { handleAddCardToDeck } from '../actions'
import { purple, white, red } from '../utils/colors'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		error: false,
	}
	onPress = () => {
		const { question, answer } = this.state

		if (question === '' || answer === '') {
			this.setState(() => ({
				error: true,
			}))
		} else {
			const { id, dispatch, navigation } = this.props

			Keyboard.dismiss()
			dispatch(handleAddCardToDeck({ key: id, card: { question, answer } }))
			this.setState(() => ({
				question: '',
				answer: '',
				error: false,
			}))
			navigation.goBack()
		}
	}
	onChangeQuestion = (e) => {
		this.setState(() => ({
			question: e,
		}))
	}
	onChangeAnswer = (e) => {
		this.setState(() => ({
			answer: e,
		}))
	}
	render() {
		const { title } = this.props
		const { question, answer, error } = this.state

		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					What is the question you want to add to {title}?
				</Text>
				<TextInput
					style={[styles.input, error && question === '' && styles.error]}
					placeholder={'Question'}
					onChangeText={this.onChangeQuestion}
					value={question}
				/>
				<TextInput
					style={[styles.input, error && answer === '' && styles.error]}
					placeholder={'Answer'}
					onChangeText={this.onChangeAnswer}
					value={answer}
				/>
				<TextButton style={styles.button} onPress={this.onPress}>
					Add Card
				</TextButton>
				{error && (
					<Text style={styles.warning}>
						Question and Answer cannot be empty
					</Text>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 40,
		paddingTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: '700',
		fontSize: 30,
		textAlign: 'center',
	},
	input: {
		backgroundColor: white,
		borderWidth: 1,
		width: '100%',
		marginTop: 25,
		marginBottom: 10,
		borderRadius: 8,
		padding: 5,
		borderColor: purple,
	},
	button: {
		padding: 10,
		fontWeight: '600',
		fontSize: 18,
		backgroundColor: purple,
		color: white,
		borderRadius: 8,
	},
	warning: {
		marginTop: 10,
		color: red,
		fontWeight: '600',
	},
	error: {
		borderColor: red,
	},
})

function mapStateToProps(decks, { route }) {
	const { id, title } = route.params
	return {
		id,
		title,
	}
}

export default connect(mapStateToProps)(AddCard)
