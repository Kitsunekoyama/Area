class Reaction {
    constructor(name, descr) {
        this.id = 0;
        this.name = name;
        this.descr = descr;
        this.arg = [{name: "", type: "", value: ""}];
        this.auth = "";
        this.isActivated = "true";
    }
}

class Action {
    constructor(name, descr) {
        this.id = 0;
        this.name = name;
        this.descr = descr;
        this.arg = [{name: "", type: "", value: ""}, {name: "", type: "", value: ""}, {name: "", type: "", value: ""}];
    }
    setArg(arg) {
        this.arg = arg;
    }
    print() {
        console.log("test");
    }
}
class Service {
    constructor(name, logo, color) {
        this.id = 0;
        this.name = name;
        this.logo = logo;
        this.color = color;
        this.action = [];
        this.reaction = [];
    }
}
class Relation {
    constructor(action, reaction, id) {
        this.id = id
        this.action = action;
        this.reaction = reaction;
    }
}
module.exports = {Service, Action, Reaction, Relation };
