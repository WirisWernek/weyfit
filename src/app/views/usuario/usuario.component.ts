import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
	selector: 'app-usuario',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './usuario.component.html',
	styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit {
	user$!: Observable<User | null>;
	form: FormGroup;
	visible = false;
	constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
		this.form = this.configurarNovoFormulario();
	}

	ngOnInit(): void {
		this.authService.getUser().subscribe({
			next: (user) => {
				this.form.patchValue({
					displayName: user?.displayName,
					email: user?.email,
					photoURL: user?.photoURL,
				});
			},
		});
	}

	changeVisible() {
		console.log('oi');
		this.visible = true;
	}

	atualizar() {
		const formRaw = this.form.getRawValue();
		this.authService.updateUser({
			displayName: formRaw.displayName,
			email: formRaw.email,
			photoURL: formRaw.photoURL,
		} as UserModel);
	}

	sair() {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigateByUrl('/auth');
			},
			error: (err) => {
				console.error(err.code);
			},
		});
	}

	save() {
		console.log(this.form.value);
	}

	configurarNovoFormulario(): FormGroup {
		return this.formBuilder.group({
			displayName: ['', Validators.required],
			email: ['', Validators.required],
			photoURL: ['', Validators.required],
		});
	}
}
