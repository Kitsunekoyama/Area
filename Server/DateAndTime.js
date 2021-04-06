const {Service, Action, Reaction} = require("./General");

class EveryDayAt extends Action {
    constructor() {
        super("EveryDayAt", "Trigger every day at x hours and y min");
        this.arg = [{id: 0, name: "hours", type: "id", value: ""}, {id: 1, name: "minutes", type: "id", value: ""}]
    }
    activate(callback) {
        //console.log("test= " + arg[0].value);
        const currentDate = new Date();
        var targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.arg[0].value, this.arg[1].value, 0);
        if (currentDate >= targetDate) {
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, this.arg[0].value, this.arg[1].value, 0);
            console.log(targetDate);
        }
        setTimeout(function() {
            try {
                callback.activate();
                setInterval(callback.activate(), 86400000);
            } catch(e) {}
        }, targetDate - currentDate);
    }
}

class EveryYearAt extends Action {
    constructor() {
        super("EveryYearAt", "Trigger every year at x day and x month");
        this.arg = [{id: 0, name: "day", type: "id", value: ""}, {id: 1, name: "month", type: "id", value: ""}]
    }
    checkDate(target, callback) {
        if (target <= 0) {
            callback.activate()
            var currentDate = new Date();
            target = new Date(currentDate.getFullYear()+1, currentDate.getMonth(), currentDate.getDate(), 0, 0, 0) - currentDate
        }
        setInterval(this.checkDate.bind(this, target-86400000, callback), 86400000);

    }
    activate(callback) {
        var currentDate = new Date();
        var targetDate = new Date(currentDate.getFullYear(), this.arg[1].value-1, this.arg[0].value, 0, 0, 0);
        
        if ((currentDate - targetDate) <= 86400000 && (currentDate - targetDate) >= 0) {
            console.log("today");
            currentDate = new Date();
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
            this.checkDate(targetDate - currentDate, callback)
        } else {
            if (targetDate < currentDate)
                targetDate = new Date(currentDate.getFullYear()+1, this.arg[1].value-1, this.arg[0].value, 0, 0, 0);
            this.checkDate(targetDate - currentDate, callback);

        }
    }

}
class DateTime extends Service {
    constructor() {
        super("DateTime", "https://assets.ifttt.com/images/channels/3/icons/monochrome_large.png", "#333333");
        this.action = [new EveryDayAt, new EveryYearAt];
        this.reaction = [];
    }
}
module.exports = {DateTime, EveryDayAt, EveryYearAt};
//module.exports
