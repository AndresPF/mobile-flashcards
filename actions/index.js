import { getDecks, uploadDecks, addNewDeck, removeDeck } from '../utils/api'
import { dummyDecks, formatDeck } from '../utils/helpers'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck,
	}
}

export function addCardToDeck({ card, key }) {
	return {
		type: ADD_CARD_TO_DECK,
		card,
		key,
	}
}

export function deleteDeck(id) {
	return {
		type: DELETE_DECK,
		id,
	}
}

export function handleReceiveDecks() {
	return (dispatch) => {
		return getDecks().then((results) => {
			let decks = JSON.parse(results)
			if (decks === null || Object.keys(decks).length === 0) {
				decks = dummyDecks()
				uploadDecks(decks)
			}
			dispatch(receiveDecks(decks))
		})
	}
}

export function handleNewDeck(title) {
	return (dispatch) => {
		const deck = formatDeck(title)
		return addNewDeck(deck).then(() => {
			dispatch(addDeck(deck))
		})
	}
}

export function handleDeleteDeck(id) {
	return (dispatch) => {
		return removeDeck(id).then(() => {
			dispatch(deleteDeck(id))
		})
	}
}
