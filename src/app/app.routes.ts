import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GraphPageComponent } from './components/graph-page/graph-page.component';
import { DataPageComponent } from './components/data-page/data-page.component';

export const routes: Routes = [
    { path: '', title: 'Acceuil - FlairX', component: HomePageComponent },
    { path: 'charts', title: 'Graphiques - FlairX', component: GraphPageComponent },
    { path: 'data', title: 'Données - FlairX', component: DataPageComponent },
];
