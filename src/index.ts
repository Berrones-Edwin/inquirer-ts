// Modules
import inquirer from "inquirer";
// Models
import { TaskCollection } from "./models/TaskCollection";
import { JsonTaskCollection } from "./models/JsonTaskCollection";
// Enums
import { Commands } from "./enums/Commands.enum";
import { tasks } from "./exampleData";


let showCompleted: boolean = true;

const collection = new JsonTaskCollection(
    'Edwin',
    tasks
);

function displayTaskList(): void {
    console.log(`${collection.username}'s Tasks` + `(${collection.getTaskCounts().incomplete}) task to do`);
    collection.getTaskItems(showCompleted).forEach(item => item.printDetails());
}

async function promptAdd(): Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter Task"
    });

    if (answers["add"] !== "")
        collection.addTask(answers["add"]);
    promptUser();
}

async function promptComplete(): Promise<void> {
    console.clear();

    const answers = await inquirer.prompt({
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
    let completedTasks = answers["complete"] as number[];

    // marcar como true / false
    collection.getTaskItems(true)
        .forEach(item => collection.markComplete(
            item.id,
            completedTasks.find(id => id === item.id) != undefined
        ));

    promptUser();



}

async function promptUser() {

    console.clear();
    displayTaskList();

    const answers = await inquirer.prompt({
        type: 'list',
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
    });


    switch (answers["command"]) {

        case Commands.Add:
            promptAdd();
            break;

        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
        case Commands.Complete:
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


