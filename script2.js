let isSpheres = false;
let isSphere = false;
let txt = "";
let worldCnt = 1;
let lastColumn = 0;
let row = 2;

function formatage(textFilePath) { //set a variable
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
                    part0 = line[0];
                    part1 = line[1];

                    try {
                        part0 = part0.trimStart();
                        part0 = part0.trimEnd();
                    } catch (error) {
                        
                    }
                    try {
                        part1 = part1.trimStart();
                        part1 = part1.trimEnd();
                    } catch (error) {
                        
                    }
                    if(!part0.startsWith("Spheres") && part0.startsWith("players")){
                        worldCnt = part1; // Define how many worlds
                    }
                    if(part0.startsWith("Spheres")){
                        isSpheres = true;
                    }
                    if(part0.startsWith("=============")){
                        isSpheres = false;
                    }
                    if(isSpheres){
                        //console.log(part0)
                        //console.log(part1)
                        //console.log("")
                        //console.log(part0)
                        if(typeof part0 == 'undefined'){
                            txt = txt+"}";
                        }
                        else if(part0.startsWith("Sphere ") && !part0.startsWith("Sphere 0") && txt.slice(-3) == ",],"){
                            txt = txt.slice(0,-3)
                            part0 = part0.split(" ");
                            txt = txt+"]},{\""+part0[0]+"\" : [";
                        }
                        else if(part0.startsWith("Event")){
                            continue;
                        }
                        else if(!part0){
                            txt = txt+"],";
                        }
                        else if(typeof part1 == 'undefined' && isSphere){
                            part0 = part0.split(" ");
                            txt = txt+"\""+part0[0]+"\" : [";
                        }
                        else if(typeof part1 == 'undefined'){
                            part0 = part0.replace(" ","");
                            txt = txt+"\""+part0+"\" : [{";
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

                            txt = txt+"{\"world\":\""+part0where[0]+"\","; // Quel monde ?
                            txt = txt+"\"where\":\""+part0where[1]+"\","; // Où ?
                            txt = txt+"\"who\":\""+part1what[0]+"\","; // Qui ?
                            if(part1what[1].startsWith("Boss")){
                                txt = txt+"\"what\":\"Boss Key\"},"; // Quoi ?
                            }
                            else if(part1what[1].startsWith("Silver")){
                                txt = txt+"\"what\":\"Silver Rupee\"},"; // Quoi ?
                            }
                            else{
                                txt = txt+"\"what\":\""+part1what[1]+"\"},"; // Quoi ?
                            }
                            
                        }

                        
                    }
                    

                }

              }
           }
     }
     rawFile.send(null);
}

function generation() {
    
    txt = txt+"{";
    
    formatage("OoTMM-Spoiler-H0uaUKSo.txt"); // call function and pass relative path of text file here
    
    txt = txt.slice(0,-1);
    txt = txt+"}]}";
    txt = txt.replace("{\"Sphere\" : [],","{\"Sphere\" : []},{")
    //document.write(txt)
    const obj = JSON.parse(txt);
    
    
    for (let i = 0; i < obj.Spheres.length; i++) {
        document.write("<div class=\"test\" id=\"sphere"+i+"\" style=\"grid-template-columns: repeat(40vh);\"><div class=\"surTete\" style=\" grid-column: 1/"+(worldCnt+1)+"\">Sphere N°"+i+"</div>")
        for (let k = 0; k < worldCnt; k++) {document.write("<div class=\"enTete\" style=\"grid-row: 2; grid-column: "+(k+1)+"\">Monde "+(k+1)+"</div>")}
        for (let j = 0; j < obj.Spheres[i].Sphere.length; j++) {
            if(lastColumn !== obj.Spheres[i].Sphere[j].world.split(" ")[1]){row = 3;}
            document.write("<div class=\"container\" style=\"grid-row: "+row+"; grid-column: "+obj.Spheres[i].Sphere[j].world.split(" ")[1]+"\"><div class=\"filterPlayer\"><img class=\" "+obj.Spheres[i].Sphere[j].who.charAt(0)+obj.Spheres[i].Sphere[j].who.charAt(obj.Spheres[i].Sphere[j].who.length-1)+"\" src=\"img/"+obj.Spheres[i].Sphere[j].who.charAt(0)+obj.Spheres[i].Sphere[j].who.charAt(obj.Spheres[i].Sphere[j].who.length-1)+".png\"></div><div class=\"img-container\"><div class=\"overlay\">"+obj.Spheres[i].Sphere[j].where+"</div><img src=\"sprite/"+obj.Spheres[i].Sphere[j].what.replace('%20',' ')+".png\"></div></div>");
            row++;
            lastColumn = obj.Spheres[i].Sphere[j].world.split(" ")[1];
        }
        document.write("</div>")
    }
    
    let poule = document.getElementsByClassName("test")
    
    for (let i = 0; i < poule.length; i++) {
        poule[i].addEventListener("click", function(e) {
            dinde = this.getElementsByClassName("container")
            for (let j = 0; j < dinde.length; j++) {
                if(dinde[j].style.display == "block"){
                    dinde[j].style.display = "none";
                }
                else{
                    dinde[j].style.display = "block";
                }
            }
            dinde = this.getElementsByClassName("enTete")
            for (let j = 0; j < dinde.length; j++) {
                if(dinde[j].style.display == "block"){
                    dinde[j].style.display = "none";
                }
                else{
                    dinde[j].style.display = "block";
                }
            }
            
        });
    }
}

generation();


    
