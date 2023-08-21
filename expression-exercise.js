export class Exercise {
    title;
    varNames;
    correctExpression;
    input = document.createElement("input");
    answer = document.createElement("p");
    vars = [];
    constructor(title, varNames, correctExpression) {
        this.title = title;
        this.varNames = varNames;
        this.correctExpression = correctExpression;
        for (const v of varNames) {
            this.vars.push({ name: v, value: false });
        }
    }
    render(rootNode) {
        const exerciseNode = document.createElement("div");
        const buttonSet = document.createElement("div");
        buttonSet.classList.add("buttonSet");
        for (const vr of this.varNames) {
            const btn = document.createElement("button");
            btn.classList.add("toggle");
            btn.dataset.value = "false";
            btn.textContent = vr;
            btn.addEventListener("click", (e) => {
                const vr = this.vars.find(v => v.name === e.target.textContent);
                if (vr)
                    vr.value = !vr.value;
                e.target.dataset.value = (!(e.target.dataset.value === "true")).toString();
                this.updateValues();
            });
            buttonSet.appendChild(btn);
        }
        exerciseNode.appendChild(buttonSet);
        const p = document.createElement("p");
        p.textContent = this.title;
        exerciseNode.appendChild(p);
        this.input.type = "text";
        this.input.spellcheck = false;
        this.input.addEventListener("input", () => this.updateValues());
        exerciseNode.appendChild(this.input);
        this.answer.classList.add("answer");
        exerciseNode.appendChild(this.answer);
        rootNode.appendChild(exerciseNode);
    }
    checkExpression(exp, vars = []) {
        if (!exp) {
            return "";
        }
        try {
            const varsDeclarations = vars.map((v) => `const ${v.name} = ${v.value};`).join("");
            const script = `"use strict";${varsDeclarations}${exp};`;
            return eval(script);
        }
        catch (e) {
            return "Error";
        }
    }
    updateValues() {
        const ans = this.checkExpression(this.input.value, this.vars);
        if (ans === true) {
            this.answer.classList.remove("false");
            this.answer.classList.remove("error");
            this.answer.classList.add("true");
            this.answer.textContent = "true";
        }
        else if (ans === false) {
            this.answer.classList.remove("true");
            this.answer.classList.remove("error");
            this.answer.classList.add("false");
            this.answer.textContent = "false";
        }
        else {
            this.answer.classList.remove("true");
            this.answer.classList.remove("false");
            this.answer.classList.add("error");
            this.answer.textContent = "error";
        }
    }
}
//# sourceMappingURL=expression-exercise.js.map