import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks,
			}

		case ADD_DECK:
			const { deck } = action
			return {
				...state,
				[deck.title]: deck,
			}

		case ADD_CARD_TO_DECK:
			const { card, key } = action
			return {
				...state,
				[key]: {
					...state[key],
					questions: state[key].questions.concat([card]),
				},
			}

		default:
			return state
	}
}

export default decks
