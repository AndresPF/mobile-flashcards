import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { handleNewDeck } from '../actions'
import { purple, white } from '../utils/colors'

class AddDeck extends Component {
	state = {
		text: '',
	}
	onPress = () => {
		const { text } = this.state
		const { dispatch, navigation } = this.props
		Keyboard.dismiss()
		dispatch(handleNewDeck(text)).then(() => {
			navigation.navigate('DeckDetail', { id: text })
			this.setState(() => ({
				text: '',
			}))
		})
	}
	onChange = (e) => {
		this.setState(() => ({
			text: e,
		}))
	}
	render() {
		const { text } = this.state
		const checkDisabled = text === ''
		return (
			<View style={styles.container}>
				<Text style={styles.title}>What is the title of the new deck?</Text>
				<TextInput
					style={styles.input}
					placeholder={'Deck Title'}
					onChangeText={this.onChange}
					value={text}
				/>
				<TextButton
					style={[styles.button, checkDisabled && styles.disabled]}
					onPress={this.onPress}
					disabled={checkDisabled}
				>
					Add Deck
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

export default connect()(AddDeck)
