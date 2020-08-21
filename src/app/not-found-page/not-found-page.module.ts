import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { NotFoundPageComponent } from './not-found-page.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: NotFoundPageComponent,
            },
        ]),
    ],
    declarations: [NotFoundPageComponent],
    exports: [NotFoundPageComponent],
})
export class NotFoundPageModule {}
