import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Die } from '../die'
import { Subscription } from 'rxjs'
import { ClearService } from '../clear.service'; 

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {

  @Input() die!: Die;
  @Output() letterClickEvent = new EventEmitter<string>();
  selected: boolean = false;
  subscription: Subscription;


  sendLetter(letter: string) {
    if (this.selected == false) {
      this.letterClickEvent.emit(letter);
      this.selected = true;
    }
  }

  constructor(private clearService: ClearService) { 
    this.subscription = this.clearService.onClear()
    .subscribe((value) => (this.selected = value))
  }

  ngOnInit(): void {
  }

}
