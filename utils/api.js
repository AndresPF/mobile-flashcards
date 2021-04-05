import AsyncStorage from '@react-native-async-storage/async-storage'
import { CARDS_STORAGE_KEY } from './helpers'

export function getDecks() {
	return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}

export function uploadDecks(decks) {
	return AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(decks))
}

function getDeck(key) {
	return (
		AsyncStorage.getItem(CARDS_STORAGE_KEY),
		then((results) => {
			const data = JSON.parse(results)
			return data[key].questions
		})
	)
}

export function addNewDeck(deck) {
	return AsyncStorage.mergeItem(
		CARDS_STORAGE_KEY,
		JSON.stringify({
			[deck.title]: deck,
		})
	)
}

export function removeDeck(key) {
	return AsyncStorage.getItem(CARDS_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results)
		data[key] = undefined
		delete data[key]
		AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))
	})
}

export function addCardToDeck({ key, card }) {
	return getDeck(key).then((questions) => {
		return AsyncStorage.mergeItem(
			CARDS_STORAGE_KEY,
			JSON.stringify({
				[key]: {
					questions: questions.concat([
						{
							question: card.question,
							answer: card.answer,
						},
					]),
				},
			})
		)
	})
}
