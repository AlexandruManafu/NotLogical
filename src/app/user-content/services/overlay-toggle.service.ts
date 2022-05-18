import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayToggleService {

  constructor() { }

  private targetOverlay : string = ""
  private targetOverlaySource = new BehaviorSubject<any>(this.targetOverlay)
  public targetOverlayMessage = this.targetOverlaySource.asObservable();

  changeTargetEntry(message : any)
  {
    this.targetOverlaySource.next(message);
  }
}
