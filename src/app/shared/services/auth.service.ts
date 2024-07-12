import { Injectable, signal } from '@angular/core';
import {
	Auth,
	EmailAuthProvider,
	User,
	createUserWithEmailAndPassword,
	getAuth,
	inMemoryPersistence,
	sendPasswordResetEmail,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithRedirect,
	signOut,
	updateProfile,
	user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserModel } from '../../models/user.model';


@Injectable({
	providedIn: 'root',
})
export class AuthService {
	user$!: Observable<User | null>;
	currentUserSig = signal<UserModel | null | undefined>(undefined);
	constructor(private firebaseAuth: Auth) {
		this.user$ = user(firebaseAuth);
	}

	getUser() {
		return this.user$;
	}

	register(email: string, username: string, password: string): Observable<void> {
		const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((response) => {
			updateProfile(response.user, { displayName: username });
		});
		return from(promise);
	}

	login(email: string, password: string): Observable<void> {
		const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {
			const auth = getAuth();
			setPersistence(auth, inMemoryPersistence)
				.then(() => {
					const provider = new EmailAuthProvider();
					return signInWithRedirect(auth, provider);
				})
				.catch((error) => {
					console.error(error.code, error.message);
				});
		});
		return from(promise);
	}

	updateUser(usuario: UserModel) {
		this.user$.subscribe({
			next: (value) => {
				if (value !== null) {
					updateProfile(value, { photoURL: usuario.photoURL, displayName: usuario.displayName });
				}
			},
		});
	}

	resetPassword(email: string): Observable<void> {
		const promise = sendPasswordResetEmail(this.firebaseAuth, email).then(() => {});
		return from(promise);
	}

	logout(): Observable<void> {
		const promise = signOut(this.firebaseAuth);
		return from(promise);
	}
}
