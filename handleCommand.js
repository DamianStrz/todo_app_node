import handleData from "./handleData.js";

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

export default handleCommand;