import firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Firebase App (the core Firebase SDK) is always required and must be listed first

import 'firebase/firestore';
import 'firebase/functions';

import type { CryptoCurrencyCode } from '@bp/shared-models';
import { CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME, TURN_ON_REALTIME_CRYPTO_CURRENCY_PRICES_FB_FN, CRYPTO_CURRENCY_CODES_AND_NAMES } from '@bp/shared-models';


@Injectable({
	providedIn: 'root'
})
export class CurrencyService {

	private subject = new Subject<any>();

	listen(): Observable<any> {
		return this.subject.asObservable();
	}
	protected get _firestore(): firebase.firestore.Firestore {
		return firebase.firestore();
	}

	protected get _functions(): firebase.functions.Functions {
		return firebase.functions();
	}

	constructor() {
		firebase.initializeApp({
			apiKey: 'AIzaSyBlTgmKN7hPNG_A1EqaPyVHF668SkfFl4s',
			authDomain: 'angular-dev-test-task.firebaseapp.com',
			projectId: 'angular-dev-test-task',
			storageBucket: 'angular-dev-test-task.appspot.com',
			messagingSenderId: '978693463659',
			appId: '1:978693463659:web:7aa38253892da9c0b15b2e',
		});

		// // Example
		// this._firestore.collection(`${CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME}/BTC/prices`).onSnapshot({
		// 	next(snapshot) {
		// 		console.warn(snapshot.docChanges().map(change => ({
		// 			timestamp: change.doc.id,
		// 			...change.doc.data(),
		// 		})));
		// 	},
		// });

		// // Example
		// setTimeout(() => void this.turnOnRealtimeCryptoCurrencyPrices('BTC'), 2000);
	}
	getCurrency(currency: string, limit: number, realTime: boolean) {
		// ? check Limiter is working on latest 
		this._firestore.collection(`${CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME}/${currency}/prices`).orderBy('timestamp')
			.limitToLast(limit).onSnapshot(snapshot => {
				const price = snapshot.docChanges().map(change => ({
					timestamp: change.doc.id,
					...change.doc.data(),
				}));

				if (price)
					this.subject.next(price);
			});
		realTime ?
			setTimeout(() => void this.turnOnRealtimeCryptoCurrencyPrices(currency), 2000)
			: null;

	}
	getCurrenciesNames() {
		return CRYPTO_CURRENCY_CODES_AND_NAMES;
	}
	turnOnRealtimeCryptoCurrencyPrices(cryptoCurrencyCode: CryptoCurrencyCode): void {
		void this._functions
			.httpsCallable(<string>TURN_ON_REALTIME_CRYPTO_CURRENCY_PRICES_FB_FN)({ cryptoCurrencyCode });
	}
}
