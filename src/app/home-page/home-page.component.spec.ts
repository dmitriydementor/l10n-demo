import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { MetaModule } from '@ngx-meta/core';
import { LocalizationModule, L10nLoader } from 'angular-l10n';
import { of } from 'rxjs';

import { l10nConfig } from '@app/configs/l10n.config';
import { SharedModule } from '@modules/shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { ProjectService } from '@services/project/project.service';
import { ReviewService } from '@services/review/review.service';

import * as projects from '@app/../assets/data/project-info.json';
import * as reviews from '@app/../assets/data/review.json';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let l10nLoader: L10nLoader;

    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjects']);
    projectServiceSpy.getProjects.and.returnValue(of(projects.default.projects));

    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviews']);
    reviewServiceSpy.getReviews.and.returnValue(of(reviews.default.reviews));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, LocalizationModule.forRoot(l10nConfig), SharedModule, HttpClientModule, MetaModule.forRoot()],
            declarations: [HomePageComponent],
            providers: [
                { provide: ProjectService, useValue: projectServiceSpy },
                { provide: ReviewService, useValue: reviewServiceSpy },
            ]
        }).compileComponents();
    }));

    beforeEach((done: any) => {
        l10nLoader = TestBed.get(L10nLoader);
        l10nLoader.load().then(() => done());
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
