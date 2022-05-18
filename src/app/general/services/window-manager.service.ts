import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {

  selfLocation = "http://localhost:4200"

  constructor() { }

  public openNewWindow(routeName : string)
  {
    //window.open(this.selfLocation + "/" + routeName, "_blank");
    window.open(this.selfLocation + "/" + routeName, '_blank', 'location=yes,height=400,width=600,scrollbars=yes,status=yes');
  }
}
