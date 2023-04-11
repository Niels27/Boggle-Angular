import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClearService } from '../clear.service';
import { Subscription } from 'rxjs'
import { Die } from '../die'

@Component({

  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css'],
  selector: 'app-die',
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
