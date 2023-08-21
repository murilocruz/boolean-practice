import { Exercise } from "./expression-exercise.js";
const rootNode = document.getElementById("root");
if(!rootNode) throw new Error("could not find root node");



const e1 = new Exercise("Should I travel now?",["isRaining", "isCold", "isWeekend"], () => true);
e1.render(rootNode);


const e2 = new Exercise("Ready for more exercises?",["doneAllExercises", "amTired"], () => true);
e2.render(rootNode);
