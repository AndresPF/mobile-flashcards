import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from "./TextButton"

class AddDeck extends Component {
	state = {
		text: ''
	}
	onPress = () => {

	}
	onChange = (target) => {
		this.setState(({
			text: target.text
		}))
	}
	render() {
		return (
			<View>
				<Text>What is the title of the new deck?</Text>
				<TextInput placeholder={'Deck Title'} onchange={(e.currentTarget) => this.onChange} />
				<TextButton>Add Deck</TextButton>
			</View>
		)
	}
}

export default AddDeck
