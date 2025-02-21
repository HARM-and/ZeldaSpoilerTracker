let isSpheres = false;
let isSphere = false;

function readTextFile(textFilePath) { //set a variable
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", textFilePath, false); //user variable here
    let fileNameArray= [];//defined array here for now
    rawFile.onreadystatechange = function (){
          if(rawFile.readyState === 4)
          {
             if(rawFile.status === 200 || rawFile.status == 0)
             {
                 var allText = rawFile.responseText;
                 //console.log(allText); //check in broswer console

                 fileNameArray = allText.split('\n'); //split by line break and add to array

                for (let i = 0; i < fileNameArray.length; i++) {
                    let line = fileNameArray[i].split(": ");
                    part0 = line[0]
                    part1 = line[1]

                    


                    try {
                        part0 = part0.trimStart();
                    } catch (error) {
                        
                    }
                    try {
                        part1 = part1.trimStart();
                    } catch (error) {
                        
                    }

                    if(part0 == "Spheres"){
                        isSpheres = true
                    }
                    if(part0 == "==========================================================================="){
                        isSpheres = false
                    }
                    if(isSpheres){
                        console.log(part0)
                        console.log(part1)
                        console.log("")
                        //console.log(part0)
                        if(typeof part0 == 'undefined'){
                            document.write("}<br>");
                        }
                        else if(part0.startsWith("Event")){
                            continue;
                        }
                        else if(!part0){
                            document.write("],<br>");
                        }
                        else if(typeof part1 == 'undefined' && isSphere){
                            document.write(part0+" : [<br>");
                        }
                        else if(typeof part1 == 'undefined'){
                            document.write(part0+" : {<br>");
                            isSphere = true;
                        }
                        else{
                            part0 = part0.replace("Location - ","");
                            part0 = part0.replace("OOT","OOT@");
                            part1 = part1.replace("Player ","Player")
                            part1who = part1.split(" ", 1);
                            part1 = part1.replace(part1who[0]+" ",part1who[0]+"@")
                            part1what = part1.split("@");
                            part0where = part0.split("@");
                            part1what[0] = part1what[0].replace("Player","Player ")

                            document.write("{\"world\":\""+part0where[0]+"\",<br>"); // Quel monde ?
                            document.write("\"where\":\""+part0where[1]+"\",<br>"); // Où ?
                            document.write("\"who\":\""+part1what[0]+"\",<br>"); // Qui ?
                            document.write("\"what\":\""+part1what[1]+"\"},<br>"); // Quoi ?
                        }

                        
                    }

                }

              }
           }
     }
     rawFile.send(null);
}

document.write("{<br>");
readTextFile('spoiler.txt'); // call function and pass relative path of text file here
document.write("}}");