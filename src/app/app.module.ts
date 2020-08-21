import { NgModule } from '@angular/core'
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser'

import { RoutingModule } from '@app/routing/routing.module';
import { CoreModule } from '@app/core/core.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'web-developer' }),
        BrowserTransferStateModule,
        RoutingModule,
        CoreModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
