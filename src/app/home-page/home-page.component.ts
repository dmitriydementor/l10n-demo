import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MetaService } from '@ngx-meta/core';

import { CookieService } from '@gorniv/ngx-universal'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    public nowDate: Date;

    constructor(
        private metaService: MetaService,
        private cookieService: CookieService,
    ) { }

    ngOnInit() {
        this.metaService.setTitle('Web developer');

        console.log('test cookie', this.cookieService.get('test'))
    }
}
