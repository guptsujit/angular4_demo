import { Component, OnInit,SimpleChanges,OnChanges,Input,DoCheck } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit,OnChanges,DoCheck {
  @Input()companyName : string;
  @Input()profile : string;
  constructor() { }

  ngOnInit() {

  }
  ngDoCheck(){
    console.log(this); 
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    for(let value in changes){
      let change = changes[value];
     let previous = change['previousValue'];
     let current = change['currentValue'];
     console.log(previous);
    }
   // this.lastname = 'Angular6 Child';
  }
}
