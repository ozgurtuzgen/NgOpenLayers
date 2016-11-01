import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { STMCityListComponent } from './city-list.component';

import { CityService } from './city.service';
import { CityList } from "./mock-city-list"
import { City } from './city';

import { By } from '@angular/platform-browser';

let comp: STMCityListComponent;
let fixture: ComponentFixture<STMCityListComponent>;
let de: DebugElement; // debug edilen element
let el: HTMLElement; // karsilastirilacak gercek element

beforeEach(() => {

    TestBed.configureTestingModule({
        declarations: [STMCityListComponent]
    });

    fixture = TestBed.createComponent(STMCityListComponent);
    comp = fixture.componentInstance;


    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
});

describe('City list component', () => {
    it('should have basic true test', () => {
        expect(true).toEqual(true);
    });

    it('should contain list title as İller', () => {
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).toContain("İller");
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });
});