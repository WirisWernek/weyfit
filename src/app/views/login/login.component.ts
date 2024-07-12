import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	visible = false;

	constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService) {}

	ngOnInit(): void {
		this.visible = false;
		this.form = this.formBuilder.group({
			email: new FormControl('', Validators.minLength(3)),
			password: new FormControl('', Validators.minLength(3)),
		});
	}

	logar() {
		const rawForm = this.form.getRawValue();
		const erros = this._validate(rawForm.email, rawForm.password);
		if(erros.length > 0){
			this.alertService.showError(erros[0],erros[1])
			return;
		}
		this.authService.login(rawForm.email, rawForm.password).subscribe({
			next: () => {
				this.router.navigateByUrl('/cliente');
			},
			error: (err) => {
				console.error(err.code);
				this.alertService.showError("Usuário inválido ou não encontrado!");
			},
		});
	}
	private _validate(email: string, senha: string) {
		const errors: string[] = [];

		if (email === '' || email.trim() == '') {
			errors.push('Email inválido ou não informado!');
		}

		if (senha === '' || senha.trim() == '') {
			errors.push('Senha inválida ou não informada!');
		}
		return errors;
	}

	changeVisibility() {
		this.visible = !this.visible;
	}
}

