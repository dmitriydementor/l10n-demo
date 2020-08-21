import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { LocalizationModule, L10nLoader } from 'angular-l10n';

import { l10nConfig } from '@app/configs/l10n.config';
import { SharedModule } from '@modules/shared/shared.module';
import { NotFoundPageComponent } from './not-found-page.component';

describe('HomePageComponent', () => {
    let component: NotFoundPageComponent;
    let fixture: ComponentFixture<NotFoundPageComponent>;
    let l10nLoader: L10nLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule, LocalizationModule.forRoot(l10nConfig), HttpClientModule],
            declarations: [NotFoundPageComponent],
        }).compileComponents();
    }));

    beforeEach((done: any) => {
        l10nLoader = TestBed.get(L10nLoader);
        l10nLoader.load().then(() => done());
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
