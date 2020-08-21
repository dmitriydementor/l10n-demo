import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePageComponent,
            },
        ]),
    ],
    exports: [HomePageComponent],
})
export class HomePageModule { }
