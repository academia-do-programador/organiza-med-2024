import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkNavegacao } from './models/link-navegacao.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class ShellComponent {
  links: LinkNavegacao[] = [
    {
      titulo: 'Dashboard',
      icone: 'home',
      rota: '/dashboard',
    },
    {
      titulo: 'Médicos',
      icone: 'people_group',
      rota: '/medicos',
    },
    {
      titulo: 'Atividades Médicas',
      icone: 'health_and_safety',
      rota: '/atividades-medicas',
      subLinks: [
        {
          titulo: 'Consultas',
          icone: 'monitor_heart',
          rota: '/atividades-medicas/consultas',
        },
        {
          titulo: 'Cirurgias',
          icone: 'emergency',
          rota: '/atividades-medicas/cirurgias',
        },
      ],
    },
  ];

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }
}
