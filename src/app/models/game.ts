export class Game {
    
       constructor(
            public id : number,
            public title : string, 
            public overview : Text, 
            public dateRelease : Date,
            public platform : string,
            public image : string,
            public genre : string[],
            public developer : string,
            public rating : number,
        ){

               this.id = id;
               this.title = title;
               this.overview = overview;
               this.dateRelease = dateRelease;
               this.platform = platform;
               this.image=image;
               this.genre= genre;
               this.developer = developer;
               this.rating = rating;
   
       }
   }