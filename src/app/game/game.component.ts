import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  name!: string;
  animal!: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if(!this.pickCardAnimation){
    this.currentCard = this.game.stack.pop()!;//take the last card of the array and delete it in the array
    this.pickCardAnimation = true;    
    setTimeout(()=>{
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    },1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed', name);
      this.game.players.push(name);
    });
  }  
 
}
