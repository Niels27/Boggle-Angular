import { Component, OnInit } from '@angular/core';
import { BoggleService } from '../boggle.service';
import { ClearService } from '../clear.service';
import { Die } from '../die';
import { BoggleBoard } from '../boggleboard'



@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.css']
})
export class BoggleComponent implements OnInit {
  dice: Die[][] = [];
  id: string = '';
  letters: string = '';
  score: number = 0;
  words: string[] = [];

  async onSubmit() {
    let isValid = await this.boggleService.getIsValid(this.id, this.letters);
    if (isValid) {
      console.log(isValid);
      let receivedScore = await this.boggleService.getScore(this.letters);
      if (receivedScore > 0) {
        this.score += receivedScore;
        this.words.push(this.letters);
        console.log(this.score);
      }
    }

    this.letters = '';
    this.clearService.clear();

  }

  addLetter(letter: string) {
    this.letters = this.letters.concat(letter);
  }

  constructor(private boggleService: BoggleService, private clearService: ClearService) { }

  ngOnInit(): void {
    this.boggleService.getBoggleBoard().subscribe(
      (boggleBoard) => (this.dice = boggleBoard.dice, this.id = boggleBoard.boggleBoardId));
  };


}


