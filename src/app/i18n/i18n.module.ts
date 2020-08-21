import { NgModule, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n'

import { l10nConfig } from './config/l10n.config'
import { L10nConfigLoader, initLocalization } from './services/l10n-config-loader.service'
import { HttpTranslationLoader } from './services/http-translation-loader.service'
import { CookieService } from '@gorniv/ngx-universal'
import { AppL10Storage } from './services/app-l10n-storage.service'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        L10nTranslationModule.forRoot(l10nConfig, {
            translationLoader: HttpTranslationLoader,
            storage: AppL10Storage,
        }),
        L10nIntlModule,
    ],
    providers: [
        CookieService,
        L10nConfigLoader,
        {
            provide: APP_INITIALIZER,
            useFactory: initLocalization,
            deps: [L10nConfigLoader],
            multi: true,
        },
    ],
})
export class I18nModule {}
