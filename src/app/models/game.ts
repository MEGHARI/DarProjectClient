export class Game {
    
       constructor(
            public id : number,
            public title : string, 
            public overview : Text, 
            public dateRelease : any,
            public platform : number[],
            public image : Object,
        ){}
   }