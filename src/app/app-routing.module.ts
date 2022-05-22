import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'firebase',
        loadChildren: () =>
            import('./pages/firebase/firebase.module').then(
                (m) => m.FirebasePageModule
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
