const events = [

    {
        'Date': new Date(2018, 9, 30),
        'Title': 'Doctor appointment at 3:25pm.'
    },
    {
        'Date': new Date(2018, 10, 18),
        'Title': 'New Garfield movie comes out!'
    },
    {
        'Date': new Date(2018, 8, 27),
        'Title': '25 year anniversary'
    }


];




function Calendar() {
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();

    let firstYear = 2000;
    let lastYear = 2020;
    this.eventList = {};

    this.loader = function () {

        loadMonths.call(this);
        loadYears.call(this);
        createEventList.call(this, events);
        loadDays.call(this);

    };

    function loadMonths() {

        for (let i = 0; i < this.months.length; i++) {
            let doc = document.createElement("div");
            let context = this;

            doc.innerHTML = context.months[i];
            doc.classList.add("dropdown__item");

            doc.onclick = function () {
                loadNewMonth.call(context, i)
            };



            document.getElementById("months").appendChild(doc);
            document.getElementById("curMonth").onclick = function (){
                document.getElementById("years").classList.add("hidden")
                document.getElementById("months").classList.toggle("hidden");
                
            };


        }
    };

    function loadNewMonth(month) {
        
        this.month = month;
        document.getElementById("curMonth").innerHTML = this.months[this.month];
        loadDays.call(this);
    }


    function loadYears() {
        let context = this;

        for (let i = firstYear; i <= lastYear; i++) {

            let doc = document.createElement("div");
            doc.innerHTML = i;
            doc.classList.add("dropdown__item");

            doc.onclick = function() {
                loadNewYear.call(context, i)
            };
            document.getElementById("years").appendChild(doc);

            document.getElementById("curYear").onclick = function (){
                document.getElementById("months").classList.add("hidden");
                document.getElementById("years").classList.toggle("hidden");
                
            };

        }
    };

    function loadNewYear(year) {
        this.year = year;
        document.getElementById("months").classList.add("hidden");
        document.getElementById("years").classList.remove("hidden");
        document.getElementById("curYear").innerHTML = this.year;
        loadDays.call(this);

    }

    function createEventList(list) {
        if (!localStorage.getItem("EventList")) {

            for (let i = 0; i < list.length; i++) {

                let get = new Event(list[i])
                this.eventList[get.id] = get;
            }
        } else {

            //Parse localStorage
            list = JSON.parse(localStorage.getItem("EventList"));


            this.eventList = list;

        }


    }

    function loadDays() {
        let context = this;
        document.getElementById("calendarDays").innerHTML = "";

        let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
        //day of week for a first day of the month
        let firstDay = new Date(this.year, this.month, 0).getDay();
        let today = (this.today.getFullYear())*10000 + this.today.getDate() + (this.today.getMonth())*100;
        

        //empty blocks
        for (let i = 0; i <= firstDay && firstDay < 6; i++) {
            let day = document.createElement("div");
            day.classList.add("day");
            day.classList.add("blank");
            document.getElementById("calendarDays").appendChild(day);
        }


        for (let i = 0; i < daysInMonth; i++) {
            let number = i + 1;
            let day = document.createElement("div");
            let id = this.year * 10000 + this.month * 100 + number;
            day.id = id;

            day.className = "day";
            day.innerHTML = number;
            if (this.eventList[id]) {
                day.classList.add("day--event");
            }
           
            if (id==today) {
                day.classList.add("day--today");
            }
            day.onclick = function () {
                showInfo.call(context, this.id, this)

            };

            document.getElementById("calendarDays").appendChild(day);
        }
        showInfo.call(context, String(today), document.getElementById(today));
    }

    function showInfo(id, day) {
        let context = this;
        let input = document.getElementById("input");
        let output = document.getElementById("output");

        let edit = document.getElementById("edit");
        let save = document.getElementById("submit");

        document.querySelector(".day__info").classList.remove("hidden");
        input.classList.remove("hidden");
        output.classList.add("hidden");
        document.getElementById("dayDate").innerText = id.substring(0, 4) + " "  + context.months[Number(id.substring(4, 6))]+ " " + id.substring(6, 8);
        document.getElementById("dayDate").classList.remove("hidden");

        if (this.eventList[id]) {
            input.classList.add("hidden");
            output.classList.remove("hidden");

            let text = document.createElement("div");
            text.innerHTML = this.eventList[id].Title;
            output.firstElementChild.innerHTML = text.outerHTML;

            edit.onclick = function () {
                input.classList.remove("hidden");
                addInfo.call(context, id)
            };
        } else {
            save.onclick = function () {
                addInfo.call(context, id,day);
                day.classList.add("day--event");

            };
        }
    }

    function addInfo(id,d) {
        let context = this;
        let year = Number(id.substring(0, 4));
        let month = Number(id.substring(4, 6));
        let day = Number(id.substring(6, 8));
        var event = {
            "Date": new Date(year, month, day),
            "Title": document.getElementById("text").value
        }
        document.getElementById("text").value = "";
        let get = new Event(event)
        this.eventList[get.id] = get;

        //Set localStorage
        localStorage.setItem("EventList", JSON.stringify(this.eventList));
        showInfo.call(context,id, d);

    }


};


function Event(options) {
    let obj = {

    }

    for (let key in options) {
        obj[key] = options[key];
    }

    let year = obj.Date.getFullYear();
    let month = obj.Date.getMonth();
    let day = obj.Date.getDate();

    obj.id = year * 10000 + month * 100 + day;

    return obj
}



window.addEventListener('load', function () {
    var calendar = new Calendar();

    document.getElementById("curMonth").innerHTML = calendar.months[calendar.month];
    document.getElementById("curYear").innerHTML = calendar.year;
    calendar.loader();
    //Clean Storage
    localStorage.clear();


});

