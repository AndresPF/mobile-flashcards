import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { handleAddCardToDeck } from '../actions'
import { purple, white } from '../utils/colors'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}
	onPress = () => {
		const { id } = this.props
		const { question, answer } = this.state
		const { dispatch, navigation } = this.props
		Keyboard.dismiss()
		dispatch(handleAddCardToDeck({ key: id, card: { question, answer } }))
		this.setState(() => ({
			question: '',
			answer: '',
		}))
		navigation.goBack()
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
		const { question, answer } = this.state
		const checkDisabled = question === '' || answer === ''
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					What is the question you want to add to {title}?
				</Text>
				<TextInput
					style={styles.input}
					placeholder={'Question'}
					onChangeText={this.onChangeQuestion}
					value={question}
				/>
				<TextInput
					style={styles.input}
					placeholder={'Answer'}
					onChangeText={this.onChangeAnswer}
					value={answer}
				/>
				<TextButton
					style={[styles.button, checkDisabled && styles.disabled]}
					onPress={this.onPress}
					disabled={checkDisabled}
				>
					Add Card
				</TextButton>
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
	disabled: {
		opacity: 0.3,
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
