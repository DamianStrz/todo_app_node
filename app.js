import parseArgs from "minimist";
import colors from "colors";

const command = parseArgs(process.argv.slice(2,3));

delete command._;

const handleCommand = ({add, remove, list}) => {
    console.log(add, remove, list);

    if (add) {
        if (typeof add !== "string") {
            return console.log("Wpisz nazwę zadania (musi być to tekst!)".red);
        } else if (add.length < 7) {
            return console.log("Nazwa zadania musi być dłuższa niż 6 znaków!".red);
        }
        handleData();
    } else if (remove) {
        if (typeof remove !== "strin" || remove.length < 7) {
            return console.log("Wpisz nazwę swojego zadania. Nazwa musi być tekstem i dłuższa niż 6 znaków!".red)
        }
        handleData();
    } else if (list || list === "") {
        handleData();
    } else {
        console.log('Nie rozumiem polecenia. Użyj komendy --add="nazwa zadania", --remove="nazwa zadania", lub opcji --list.');
    }
}

const handleData = () => {

}

handleCommand(command)

