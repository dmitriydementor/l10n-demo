import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MetaModule } from '@ngx-meta/core';
import { CookieModule } from '@gorniv/ngx-universal';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-universal';
import { NguCarouselModule } from '@ngu/carousel';

import { SharedModule } from '@app/shared/shared.module';
import { I18nModule } from '@app/i18n/i18n.module';

@NgModule({
    imports: [
        CommonModule,

        MetaModule.forRoot(),
        CookieModule.forRoot(),
        TransferHttpModule,
        HttpClientModule,
        NguCarouselModule,

        I18nModule,
        SharedModule,
    ],
    providers: [TransferHttpService],
})
export class CoreModule { }
