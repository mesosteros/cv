import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    imports: [
        NavigationComponent,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {}
