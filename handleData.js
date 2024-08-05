import colors from "colors";
import fs from "fs";

/*
Arguments in handleData:
type - number (1 - add, 2 - remove, 3 - list)
title - string or null
*/

const handleData = (type, title) => {
    const data = fs.readFileSync('datadb.json');
    
    let tasks = JSON.parse(data); 

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
            
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            const id = tasks.length + 1;
            tasks.push({id: id, title: title})

            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync("datadb.json", dataJSON);
            console.log(`Dodałeś zadanie: ${title} do listy`.white.bgGreen);

            break;

        case 2:
            console.log(tasks)
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            console.log(tasks)
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            console.log(tasks)
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

export default handleData;