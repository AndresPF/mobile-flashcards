import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
export const CARDS_STORAGE_KEY = 'MobileFlashcards:decks'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function formatDeck(title) {
	return {
		title,
		questions: [],
	}
}

export function dummyDecks() {
	return {
		React: {
			title: 'React',
			questions: [
				{
					question: 'What is React?',
					answer: 'A library for managing user interfaces',
				},
				{
					question: 'Where do you make Ajax requests in React?',
					answer: 'The componentDidMount lifecycle event',
				},
			],
		},
		JavaScript: {
			title: 'JavaScript',
			questions: [
				{
					question: 'What is a closure?',
					answer:
						'The combination of a function and the lexical environment within which that function was declared.',
				},
			],
		},
	}
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync()
	)
}

function createNotification() {
	return {
		title: 'Take a Quiz!',
		body: "don't forget to study, take a quiz today!",
		sound: true,
		priority: Notifications.AndroidNotificationPriority.HIGH,
		sticky: false,
		vibrate: true,
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync()

						Notifications.scheduleNotificationAsync({
							content: createNotification(),
							trigger: {
								hour: 20,
								minute: 0,
								repeats: true,
							},
						})

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}
				})
			}
		})
}
