import parseArgs from "minimist";
import colors from "colors";
import fs from "fs";

const command = parseArgs(process.argv.slice(2,3));

delete command._;

const handleCommand = ({add, remove, list}) => {

    if (add) {
        if (typeof add !== "string") {
            return console.log("Wpisz nazwę zadania (musi być to tekst!)".red);
        } else if (add.length < 7) {
            return console.log("Nazwa zadania musi być dłuższa niż 6 znaków!".red);
        }
        handleData(1, add);
    } else if (remove) {
        if (typeof remove !== "string" || remove.length < 7) {
            return console.log("Wpisz nazwę swojego zadania. Nazwa musi być tekstem i dłuższa niż 6 znaków!".red)
        }
        handleData(2, remove);
    } else if (list || list === "") {
        handleData(3, null);
    } else {
        console.log('Nie rozumiem polecenia. Użyj komendy --add="nazwa zadania", --remove="nazwa zadania", lub opcji --list.'.red);
    }
}

/*
Arguments in handleData:
type - number (1 - add, 2 - remove, 3 - list)
title - string or null
*/

const handleData = (type, title) => {
    const data = fs.readFileSync('datadb.json');
    
    const tasks = JSON.parse(data); 

    if (type === 1 || type === 2) {
        const ifExists = tasks.find(task => task.title === title) ? true : false;
        if (type === 1 && ifExists) {
            return console.log("Takie zadanie już istnieje na liście!".red);
        } else if (type === 2 && !ifExists) {
            return console.log("Nie mogę usunąć nieistniejącego zadania!".red);
        }
    }

    let dataJSON = "";

    switch(type) {
        case 1:
            const id = tasks.length + 1;
            tasks.push({id: id, title: title})

            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync("datadb.json", dataJSON);
            console.log(`Dodałeś zadanie: ${title} do listy`.white.bgGreen);

            break;

        case 2:
            
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            console.log(tasks);
            
            dataJSON = JSON.stringify(tasks);
            fs.writeFile("datadb.json", dataJSON, "utf8", (err) => {
                if (err) throw err;
                console.log(`Zadanie ${title} zostało usunięte`.white.bgGreen)
            })
            break;

        case 3:
            console.log(`Masz ${tasks.length} zadań do zrobionia. Zadania na liście to:`);
            
            if (tasks.length) {
                tasks.forEach((task, index) => {
                    if (index / 2) return console.log(task.title.green);
                    return console.log(task.title.yellow);
                })
            }
            break;
    }
}

handleCommand(command)

