import { Component, OnInit } from '@angular/core';
import { Contactus } from '../models/contactus';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactusform: FormGroup;

  formError = {
    name: '',
    email: '',
    phone: '',
    comment: ''
  }
  validationMessages = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required', email: 'Invalid email' },
    phone: { required: 'Phone is required', maxlength: 'Phone no should be of 10 digits' },
    comment: { required: 'Comment is required' },
    addresses : {city : 'City is required'}
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

  }
  ngAfterViewInit() {
    this.contactusform.valueChanges.subscribe((data) => {
        this.validateForm();
    })
  }
  buildForm() {
    this.contactusform = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [null, [Validators.required, Validators.maxLength(10)]],
        comment: ['', [Validators.required]],
        addresses: this.fb.array([
          this.fb.group({
            city: ['', [Validators.required]],
          })
        ])
      },

    )
  }

  validateForm() {
    for (let formfield in this.formError) {
      this.formError[formfield] = '';
      let input = this.contactusform.get(formfield);
      if (input.invalid && (input.touched || input.dirty)) {
        for (let error in input.errors) {
          console.log(input.errors);
          this.formError[formfield] = this.validationMessages[formfield][error];
        }
      }
    }

  }
  contactus(form) {
    if (form.valid) {
      console.log(form);
    } else {

    }
  }
  addMoreCity() {
    let addresses = <FormArray>this.contactusform.get('addresses');
    addresses.push(this.fb.group({
      city: ['', [Validators.required]],
    }))
    console.log(this.contactusform.controls.addresses);
  }
  deleteCity(index) {
    let addresses = <FormArray>this.contactusform.get('addresses');
    addresses.removeAt(index);
  }
}
