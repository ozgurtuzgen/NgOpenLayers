import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { STMCityListComponent } from './city-list.component';

import { CityService } from './city.service';
import { CityList } from "./mock-city-list"
import { City } from './city';

import { By } from '@angular/platform-browser';

let comp: STMCityListComponent;
let fixture: ComponentFixture<STMCityListComponent>;
let deTitle: DebugElement; // debug edilen element
let deCityList: DebugElement; // debug edilen element
let elTitle: HTMLElement; // karsilastirilacak gercek element
let elCityList: HTMLElement; // karsilastirilacak gercek element

let cityService: CityService;

let spy: jasmine.Spy;


beforeEach(() => {

    TestBed.configureTestingModule({
        declarations: [STMCityListComponent],
        providers: [CityService]
    });

    fixture = TestBed.createComponent(STMCityListComponent);
    comp = fixture.componentInstance;

    //service injection
    cityService = fixture.debugElement.injector.get(CityService);

    spy = spyOn(cityService, 'getCityList').and.returnValue(Promise.resolve(CityList));

    deCityList = fixture.debugElement.query(By.css('.illerClass'));
    elCityList = deCityList.nativeElement;

    deTitle = fixture.debugElement.query(By.css('h2'));
    elTitle = deTitle.nativeElement;
});

describe('City list component', () => {
    it('should have basic true test', () => {
        expect(true).toEqual(true);
    });

    it('should contain list title as İller', () => {
        fixture.detectChanges();
        const content = elTitle.textContent;
        expect(content).toContain("İller");
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(elTitle.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(elTitle.textContent).toContain('Test Title');
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
        expect(elTitle.textContent).toEqual('');
    });

    it('should not show city list before OnInit', () => {
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });

    it('should still not show city list after component initialized', () => {
        fixture.detectChanges();
        // getQuote service is async => still has not returned with city list        
        expect(spy.calls.any()).toBe(true, 'getQuote called');
    });

    it('should show city list after getCityList promise (async)', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();        // update view with quote
            expect(elCityList.children.length).toBe(3);
        });
    }));

    it('should show city list after getCityList promise (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for async getCityList
        fixture.detectChanges(); // update view with vity list
        expect(elCityList.children.length).toBe(3);
    }));

    it('should show quote after getCityList promise (done)', done => {
        fixture.detectChanges();

        // get the spy promise and wait for it to resolve
        spy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges(); // update view with quote
        expect(elCityList.children.length).toBe(3);
        done();
        });
    });
});