import { ExistingUser } from "./ExistingUser";

export class NewUser extends ExistingUser{

    public email = "";
    public passwordRepeat = ""

    constructor(){
        super()
    }

  public validEmail()
  {
      let pattern = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:[.]+[a-zA-Z0-9-]+)+$'
      let re = new RegExp(pattern)
      let emailTest = re.test(this.email)

      return emailTest  
  }

  public invalidEmail()
  {
    return !this.validEmail() && this.email.length != 0;
  }

  public invalidRepeat()
  {
    return this.passwordRepeat.length !=0 && 
    (this.password != this.passwordRepeat || this.password.length <8)
  }

  override areAllInputsValid()
  {
      return !this.invalidEmail() && !this.invalidName() && !this.invalidPass() && !this.invalidRepeat()&&
      this.name.length!=0 && this.email.length!=0 && this.password.length!=0
  }


}