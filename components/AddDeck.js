import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { handleNewDeck } from '../actions'
import { purple, white, red } from '../utils/colors'

class AddDeck extends Component {
	state = {
		text: '',
		error: false,
	}
	onPress = () => {
		const { text } = this.state

		if (text === '') {
			this.setState(() => ({
				error: true,
			}))
		} else {
			const { dispatch, navigation } = this.props

			Keyboard.dismiss()
			dispatch(handleNewDeck(text)).then(() => {
				navigation.navigate('DeckDetail', { id: text })
				this.setState(() => ({
					text: '',
					error: false,
				}))
			})
		}
	}
	onChange = (e) => {
		this.setState(() => ({
			text: e,
		}))
	}
	render() {
		const { text, error } = this.state
		return (
			<View style={styles.container}>
				<Text style={styles.title}>What is the title of the new deck?</Text>
				<TextInput
					style={[styles.input, error && styles.error]}
					placeholder={'Deck Title'}
					onChangeText={this.onChange}
					value={text}
				/>
				<TextButton style={styles.button} onPress={this.onPress}>
					Add Deck
				</TextButton>
				{error && <Text style={styles.warning}>Title cannot be empty</Text>}
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

export default connect()(AddDeck)
