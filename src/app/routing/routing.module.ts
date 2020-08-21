import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@app/home-page/home-page.module').then(m => m.HomePageModule),
    },
    {
        path: '**',
        loadChildren: () => import('@app/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule),
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled',
        scrollPositionRestoration: 'top',
    })],
    exports: [RouterModule]
})
export class RoutingModule { }
