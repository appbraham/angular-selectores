import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-selector-pages',
  templateUrl: './selector-pages.component.html',
})
export class SelectorPagesComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesServices: CountryService,
  ) { }

  ngOnInit(): void {
    this.onRegionChange();
  }

  get regions(): Region[] {
    return this.countriesServices.regions
  }

  onRegionChange(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        switchMap( region => this.countriesServices.getCountriesByRegion( region ) )
      )
      .subscribe(region => console.log({ region }));
  }

}
