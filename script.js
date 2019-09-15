function fizzbuzz (){
    var fizz = "fizz";
    var buzz = "buzz";

    for(var i=0; i<100; i++){
        if(i %3 === 0 && i%5 !==0){
            console.log(i + ": " + fizz);
        } 

        if(i %5 === 0 && i%3 !==0){
            console.log(i + ": " + buzz);
        }

        if(i %3 ===0 && i%5 ===0){
            console.log(i + ": " + fizz + buzz);
        }

    }


}