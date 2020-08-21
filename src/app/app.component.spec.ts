import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { L10nTranslationModule, L10nLoader } from 'angular-l10n';

import { l10nConfig } from '@app/modules/i18n/config/l10n.config';
import { SharedModule } from '@modules/shared/shared.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let l10nLoader: L10nLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule, L10nTranslationModule.forRoot(l10nConfig), HttpClientModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    beforeEach((done: any) => {
        l10nLoader = TestBed.get(L10nLoader);
        l10nLoader.load().then(() => done());
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
});
