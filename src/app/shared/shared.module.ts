import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { L10nTranslationModule } from 'angular-l10n';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,


        L10nTranslationModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        L10nTranslationModule,
    ]
})
export class SharedModule { }
