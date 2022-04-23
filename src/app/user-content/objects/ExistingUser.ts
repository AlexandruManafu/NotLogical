export class ExistingUser{

    public name = "";
    public password = "";
    constructor(){}

    public invalidName()
    {
      return this.name.length < 4 && this.name.length != 0 
    }

    public invalidPass()
    {
      return this.password.length < 8 && this.password.length != 0;
    }

    public areAllInputsValid()
    {
      return !this.invalidName() && !this.invalidPass() &&
      this.name.length!=0 && this.password.length!=0
    } 
  
}