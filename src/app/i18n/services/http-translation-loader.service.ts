import { Injectable, Optional } from '@angular/core'
import { HttpHeaders, HttpParams } from '@angular/common/http'
import { L10nProvider, L10nTranslationLoader } from 'angular-l10n'

import { ServerSideService } from '@app/core/services/server-side/server-side.service'
import { TransferHttpService } from '@gorniv/ngx-universal'

@Injectable()
export class HttpTranslationLoader implements L10nTranslationLoader {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(@Optional() private http: TransferHttpService, @Optional() private ssrService: ServerSideService) { }

    get(language: string, provider: L10nProvider) {
        const appUrl = this.ssrService.isServer() ? this.ssrService.getApplicationUrl() : '.'

        const assetUrl = `${appUrl}/${provider.asset}-${language}.json`
        const options = {
            headers: this.headers,
            params: new HttpParams().set('v', provider.options.version)
        }

        console.log('get', assetUrl)

        return this.http.get(assetUrl, options);
    }
}
