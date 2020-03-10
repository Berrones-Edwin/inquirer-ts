"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const inquirer_1 = __importDefault(require("inquirer"));
const JsonTaskCollection_1 = require("./models/JsonTaskCollection");
// Enums
const Commands_enum_1 = require("./enums/Commands.enum");
const exampleData_1 = require("./exampleData");
let showCompleted = true;
const collection = new JsonTaskCollection_1.JsonTaskCollection('Edwin', exampleData_1.tasks);
function displayTaskList() {
    console.log(`${collection.username}'s Tasks` + `(${collection.getTaskCounts().incomplete}) task to do`);
    collection.getTaskItems(showCompleted).forEach(item => item.printDetails());
}
async function promptAdd() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: "input",
        name: "add",
        message: "Enter Task"
    });
    if (answers["add"] !== "")
        collection.addTask(answers["add"]);
    promptUser();
}
async function promptComplete() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark task complete",
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    //arreglo de id
    let completedTasks = answers["complete"];
    // marcar como true / false
    collection.getTaskItems(true)
        .forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
    promptUser();
}
async function promptUser() {
    console.clear();
    displayTaskList();
    const answers = await inquirer_1.default.prompt({
        type: 'list',
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands_enum_1.Commands)
    });
    switch (answers["command"]) {
        case Commands_enum_1.Commands.Add:
            promptAdd();
            break;
        case Commands_enum_1.Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands_enum_1.Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
        case Commands_enum_1.Commands.Complete:
            if (collection.getTaskCounts().incomplete > 0)
                promptComplete();
            else
                promptUser();
            break;
        default:
            break;
    }
}
promptUser();
