import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { newEvent, click } from '../testing';
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
let deOneCity: DebugElement; // debug edilen element
let elTitle: HTMLElement; // karsilastirilacak gercek element
let elCityList: HTMLElement; // karsilastirilacak gercek element
let elOneCity: HTMLElement; // karsilastirilacak gercek element

let cityService: CityService;

let spy: jasmine.Spy;
let cityRows: HTMLLIElement[];


// html ve css lerin derlenmesi icin ilk basta compileComponents araciligi ile derlenmesi saglaniyor.
beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [STMCityListComponent],
        providers: [CityService]
    }).compileComponents();
}));


beforeEach(() => {

    fixture = TestBed.createComponent(STMCityListComponent);
    comp = fixture.componentInstance;

    //service injection
    cityService = fixture.debugElement.injector.get(CityService);

    spy = spyOn(cityService, 'getCityList').and.returnValue(Promise.resolve(CityList));

    deCityList = fixture.debugElement.query(By.css('.illerClass'));
    elCityList = deCityList.nativeElement;

    deTitle = fixture.debugElement.query(By.css('h2'));
    elTitle = deTitle.nativeElement;

    // deOneCity = fixture.debugElement.queryAll(By.css('.ilClass'))[0];
    // elOneCity = deOneCity.nativeElement;
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

        fixture.whenStable().then(() => { // wait for async 
            fixture.detectChanges();        // update view
            expect(elCityList.children.length).toBe(3);
            // expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
        });
    }));

    it('should show city list after getCityList promise (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for async getCityList
        fixture.detectChanges(); // update view with city list
        expect(elCityList.children.length).toBe(3);
    }));

    it('should show quote after getCityList promise (done)', done => {
        fixture.detectChanges();

        // get the spy promise and wait for it to resolve
        spy.calls.mostRecent().returnValue.then(() => {
            fixture.detectChanges(); // update view 
            expect(elCityList.children.length).toBe(3);
            done();
        });
    });

    it('should raise select event when clicked', () => {
        var liElement: HTMLElement;
        comp = fixture.componentInstance;

        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async 
            fixture.detectChanges();        // update view  

            liElement = fixture.debugElement.query(By.css('li')).nativeElement;

            let selectedCity: City;
            comp.onSelectedCityChanged.subscribe((city: City) => selectedCity = city);

            //liElement.click(); bu sekilde de oluyor.
            liElement.dispatchEvent(newEvent('click'));

            expect(selectedCity.name).toContain('Ankara');
        });
    });

    it('should raise select event when clicked(triggerEventHandler)', async(() => {
        // console da hata atiyor ama test calisiyor: Promise rejection: Attempt to use a destroyed view: detectChanges
        var liElement: DebugElement;
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async 
            fixture.detectChanges();

            liElement = fixture.debugElement.query(By.css('li'));

            let selectedCity: City;
            comp.onSelectedCityChanged.subscribe((city: City) => selectedCity = city);

            // liElement.triggerEventHandler('click', null);
            click(liElement);

            expect(selectedCity.name).toContain('Ankara');
        });
    }));
});