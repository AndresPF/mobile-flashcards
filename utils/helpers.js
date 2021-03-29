export const CARDS_STORAGE_KEY = 'MobileFlashcards:decks'

export function formatDeck(title) {
	return {
		title,
		questions: [],
	}
}
