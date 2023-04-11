import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  timerOn: boolean = false;
  dice: Die[][] = [];
  id: string = '';
  letters: string = '';
  score: number = 0;
  scores: string[] = [];
  playerName: string | null = "";
  gameTime: number = 10; //should be 180
  intervalId: NodeJS.Timer | undefined;
  @ViewChild('board') board!: ElementRef;

  async onStart() {

    //when player presses start during a game, quickly restart with a new board
    //useful for when the player hates the current board
    if (this.timerOn) {
      this.restartGame()
    }
    //starts a new game timer
    else {
      this.startTimer(this.gameTime)
    }
    //get the board id and new dice with letters
    this.boggleService.getBoggleBoard().subscribe(
      (boggleBoard) => (this.dice = boggleBoard.dice, this.id = boggleBoard.boggleBoardId));

  }
  //reset button to clear player input, useful for misclicks
  async onReset() {
    console.log("reset");
    this.letters = '';
    this.clearService.clear();
  }
  //submit button to validate the word and give it a score if valid or a popup if not
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
    } else { alert("Word not valid!") }
    //clear playerinput 
    this.letters = '';
    this.clearService.clear();
  }

  //add every letter together to create a word
  addLetter(letter: string) {
    this.letters = this.letters.concat(letter);
  }

  constructor(private boggleService: BoggleService, private clearService: ClearService) { }

  ngOnInit(): void {

  };
  //countdown timer minutes and seconds
  startTimer(totalSeconds: number) {

    this.intervalId = setInterval(() => {

      //if timer runs out, clear the timer and end the game
      if (totalSeconds === 0) {

        this.timerOn = false;
        clearInterval(this.intervalId);
        this.endGame()

      } else {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        totalSeconds--;
        this.timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.timerOn = true;
      }
    }, 1000);
  }

  //handles the post game
  endGame() {

    //ask player name and post their score
    alert('Time is up!')
    this.playerName = prompt("Please enter your name");
    if (this.playerName?.length===0) { this.playerName = "anonymous" }
    this.scores.push(this.playerName + " scored: " + this.score.toString());

    //reset all the stuff
    this.clearService.clear();
    this.timer = '3:00';
    this.letters = '';
    this.words = [];
    this.score = 0;
    this.dice = [];

  }

//quick restart of a game 
  restartGame() {

    this.timerOn = false;
    clearInterval(this.intervalId);
    this.clearService.clear();
    this.timer = '3:00';
    this.letters = '';
    this.words = [];
    this.score = 0;
    this.dice = [];
    this.startTimer(this.gameTime);
  }
}


