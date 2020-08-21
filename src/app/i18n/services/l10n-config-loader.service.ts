import { Injectable, Inject } from '@angular/core'
import { L10nConfig, L10nLoader, L10N_CONFIG } from 'angular-l10n'
import { AppSettingsConfig } from '@app/configs/app-settings.config'
import { CookieService } from '@gorniv/ngx-universal'
import { STORAGE_KEYS } from '../config/storage-keys.config'

@Injectable()
export class L10nConfigLoader {
    constructor(
        @Inject(L10N_CONFIG) private config: L10nConfig,
        private cookieService: CookieService,
        private l10nLoader: L10nLoader
    ) {}

    public load(): Promise<any> {
        const language = this.cookieService.get(STORAGE_KEYS.LANGUAGE) || AppSettingsConfig.default_locale.language
        const currency = this.cookieService.get(STORAGE_KEYS.LANGUAGE) || AppSettingsConfig.default_locale.currency

        if (language) {
            this.config.defaultLocale.language = language
        }

        if (currency) {
            this.config.defaultLocale.currency = currency
        }

        return this.l10nLoader.init();
    }
}

export function initLocalization(localizationConfig: L10nConfigLoader): () => Promise<any> {
    return () => localizationConfig.load();
}
