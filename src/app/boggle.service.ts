import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoggleBoard } from './boggleboard'
import { firstValueFrom } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
//allows angluar to inject this class into other components as a dependancy
@Injectable({
  providedIn: 'root'
})
export class BoggleService {

  private boardUrl = "https://localhost:5000/api/Boggle/GetBoggleBoard"
  private isValidUrl = "https://localhost:5000/api/Boggle/IsValidWord"
  private scoreUrl = "https://localhost:5000/api/Boggle/ScoreWord"
  constructor(private http: HttpClient) { }


  getBoggleBoard(): Observable<BoggleBoard> {
    return this.http.get<BoggleBoard>(this.boardUrl);
  }

  getIsValid(id: string, word: string): Promise<boolean> {
    return firstValueFrom(this.http.get<boolean>(this.isValidUrl + "/" + id + "/" + word));
  }

  getScore(word: string): Promise<number> {
    return firstValueFrom(this.http.get<number>(this.scoreUrl + "/" + word));
  }
}
