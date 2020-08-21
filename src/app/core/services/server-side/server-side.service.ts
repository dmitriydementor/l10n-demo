import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable({
    providedIn: 'root'
})
export class ServerSideService {
    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: object) { }

    public getApplicationUrl(): string {
        let url = '';
        if (this.isServer()) {
            const request = this.injector.get(REQUEST);
            url = request.protocol + '://' + request.get('host');
        } else {
            const location = window.location;
            url = location.origin;
        }

        return url;
    }

    public isServer(): boolean {
        return !isPlatformBrowser(this.platformId);
    }
}
