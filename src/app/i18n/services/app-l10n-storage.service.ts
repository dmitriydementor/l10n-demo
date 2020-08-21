import { Injectable } from '@angular/core'

import { L10nStorage, L10nLocale } from 'angular-l10n'
import { CookieService } from '@gorniv/ngx-universal'

import { STORAGE_KEYS } from '../config/storage-keys.config'

@Injectable()
export class AppL10Storage implements L10nStorage {
    constructor(private cookieService: CookieService) {
        console.log('AppL10Storage created')
    }

    read(): Promise<L10nLocale | null> {
        return new Promise((resolve) => {
            const language = this.cookieService.get(STORAGE_KEYS.LANGUAGE)
            const currency = this.cookieService.get(STORAGE_KEYS.CURRENCY)

            console.log(`read ${language} ${currency}`)

            if (!language || !currency) resolve(null)
            resolve({ language, currency })
        })
    }

    write(locale: L10nLocale): Promise<void> {
        return new Promise((resolve) => {
            this.cookieService.put(STORAGE_KEYS.LANGUAGE, locale.language, { expires: this.getExpiryDate() })
            this.cookieService.put(STORAGE_KEYS.CURRENCY, locale.currency, { expires: this.getExpiryDate() })
            console.log(`write ${locale.language} ${locale.currency}`)
            resolve()
        })
    }

    private getExpiryDate(years = 10) {
        let date = new Date()
        date.setFullYear(date.getFullYear() + years)
        return date
    }
}
