import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResearchComponent } from './research.component';

const routes: Routes = [
    {
        path: '',
        component: ResearchComponent,
        children: [
            {
                path: 'product',
                loadChildren: 'app/home/research/products/products.module#ProductsModule'
            }, {
                path: '',
                pathMatch: 'full',
                redirectTo: 'product'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResearchRoutingModule {
}
