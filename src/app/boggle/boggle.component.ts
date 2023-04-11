import { Component, OnInit } from '@angular/core';
import { BoggleService } from '../boggle.service';
import { ClearService } from '../clear.service';
import { Die } from '../die';
import { BoggleBoard } from '../boggleboard'




@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.css'],
 
})
export class BoggleComponent implements OnInit {
  words: string[] = [];
  timer: string = '3:00';
  timerOn: boolean=false;
  dice: Die[][] = [];
  id: string = '';
  letters: string = '';
  score: number = 0;
  scores: string[] = [];
  playerName : string|null="";

  async onStart() {
    this.boggleService.getBoggleBoard().subscribe(
      (boggleBoard) => (this.dice = boggleBoard.dice, this.id = boggleBoard.boggleBoardId));
    this.startTimer(10)
  }
  async onReset() {
    console.log("reset");
    this.letters = '';
    this.clearService.clear();
  }
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
    }else{alert("Word not valid!")}
    this.letters = '';
    this.clearService.clear();
  }


  addLetter(letter: string) {
    this.letters = this.letters.concat(letter);
  }

  constructor(private boggleService: BoggleService, private clearService: ClearService) { }

  ngOnInit(): void {

  };

  startTimer(totalSeconds: number) {
    this.timerOn = true;
    const countdown = setInterval(() => {
     
      if (totalSeconds === 0) {
        if (this.timerOn) {
          alert('Time is up!')
          this.playerName = prompt("Please enter your name");
          if(this.playerName==null||undefined){this.playerName="anonymous"}
          this.timerOn = false;
          this.letters = '';
          this.scores.push(this.playerName+" scored: "+this.score.toString());
          this.clearService.clear();
        }
        clearInterval(countdown);
      } else {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        totalSeconds--;
        this.timer=`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }, 1000);
  }

}


