export class User {

    constructor(
      public username: string,
      private _token: String,
      public password?:string,
      public email?: string,
    ) {  }

    get token(){
      return this._token;
    }
  
  }