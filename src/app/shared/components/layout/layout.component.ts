import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent extends TitleStrategy {
	constructor(private offcanvasService: NgbOffcanvas, public readonly title: Title, private router: Router) {
		super();
	}

	open() {
		const offcanvasRef = this.offcanvasService.open(SidebarComponent, { backdropClass: 'bg-secondary', panelClass: 'sidebar-size' });
		offcanvasRef.componentInstance.name = 'World';
	}

	override updateTitle(routerState: RouterStateSnapshot) {
		const title = this.buildTitle(routerState);
		if (title !== undefined) {
			this.title.setTitle(`Weyfit | ${title}`);
		}
	}
}
