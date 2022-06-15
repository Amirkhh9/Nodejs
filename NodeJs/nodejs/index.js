const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var stop=false;
var contacts=[]
let contact={
    id:null,
    phone:null,
    firstname:null,
    lastname:null,
}










async function exeCmd(value){
    switch (value) {
        case "/help":
            console.clear()
            console.log(`
            There the detail of different command available
            /help : Display all the command available
            /stop: Quit your loved directory
            /add: Add new contact in your directory
            /list: List all the contacts you have in your loved directory
            /delete: Delete one of your contacts by specifying his ID`)
            break;
        
        case "/stop":
            console.log(`\nThank you to have use your directory !\n See you again !\n`);
            stop=true
            break

        case "/list":
            console.log("contacts list  :\n---------------------------\n");
            contacts.forEach((contact)=>{
                console.log(`ID: ${contact.id} ==> ${contact.firstname} ${contact.lastname}\nphone : ${contact.phone}`)
            });
            break;
            
        case "/delete":
            console.log("There is the instructions for delete a contact. Get the ID of the contact with the list under.\n")
            
            console.log("Now choice the ID of the contact you want to delete !\n")
            readline.question(`What is the ID of the contact ?\n`, value => {
                contacts.splice(value-1,1)
                reStart()
            });
            break

        case "/add":
            readline.question(`What is the first-name of your contact ?`+"\n",(value)=>{
                contact.firstname=value
                readline.question(`What is the family name of your contact ?`+"\n",(value)=>{
                    contact.lastname=value
                    readline.question(`What is the phone number of ${contact.firstname} ${contact.lastname} ?`+"\n",(value)=>{
                        if(value.match(/^(0[6])(?:[ _.-]?(\d{2})){4}$/)){
                            contact.phone=value
                        }
                        else{
                            console.log("Wrong phone number !")
                            contact={
                                id:null,
                                phone:null,
                                firstname:null,
                                lastname:null,
                            }
                            reStart()
                        }
                        
                        console.log(`Your contact ${contact.firstname} ${contact.lastname} have beean added succesfully to the directory !`)
                        contact.id=contacts.length+1
                        contacts.push(contact)
                        contact={
                            id:null,
                            phone:null,
                            firstname:null,
                            lastname:null,
                        }
                        reStart()
                    });
                });
            });
            
            break
        default:
            break
        }


        if(!stop){
            reStart()
        }

}

async function reStart(){
    await readline.question(`\n Enter /help to display a list of commands. 
    Otherwise just p any existing commands.\n`,async(value)=>{
        await exeCmd(value)
       });
}

async function start(){
    await readline.question(`Hey Sir, i'm your directory ! 
    Enter /hdeslp to display a list of commands. 
    Otherwise just enter any existing commands.\n`,async(value)=>{
        await exeCmd(value)
       });
        

    }

    

const main= async()=>{
    await start()
}



try{
    main()
}catch(e){
    console.log(e.message)
}