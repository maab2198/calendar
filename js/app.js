// var calendar = {
//     month: {
//     "September":31,
//     "October":30,
//     "November":31,
//     },
//     current: "September",
//     weekdays: [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ]
// }
var date = new Date();
var m = date.getMonth();
var y = date.getFullYear();

var calendar = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    firstYear: 2000,
    lastYear: 2020,
    today: new Date(),
    month:m,
    year:y,
    loadMonths: function()
    {
        for(var i = 0; i < this.months.length; i++)
        {
            var doc = document.createElement("div");
            doc.innerHTML = this.months[i];
            doc.classList.add("dropdown-item");

            doc.onclick = (function () {
                var selectedMonth = i;
                return function ()
                {
                    this.month = selectedMonth;
                    console.log(this.months[selectedMonth]);
                    document.getElementById("curMonth").innerHTML = this.months[this.month];
                    loadCalendarDays();
                    return this.month;
                }
            })();

            document.getElementById("months").appendChild(doc);
        }
    },

    loadYears: function(){

       for(let i = this.firstYear; i <= this.lastYear; i++)
       {
    
        let doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function(){
            var selectedYear = i;
            return function(){
                this.year = selectedYear;
                document.getElementById("curYear").innerHTML = this.year;
                loadCalendarDays();
                return this.year;
                }
        })();
        document.getElementById("years").appendChild(doc);
    }
        
    },


    loadDays: function()
    {
        document.getElementById("calendarDays").innerHTML = "";

        var tmpDate = new Date(this.year, this.month, 0);
        var num = this.daysInMonth(this.month, this.year);
        var dayofweek = tmpDate.getDay(); 

          // create day prefixes
          for(var i = 0; i <= dayofweek; i++)
          {
              var d = document.createElement("div");
              d.classList.add("day");
              d.classList.add("blank");
              document.getElementById("calendarDays").appendChild(d);
          }

          {
            var tmp = i + 1;
            var d = document.createElement("div");
            d.id = "calendarday_" + i;
            d.className = "day";
            d.innerHTML = tmp;
            document.getElementById("calendarDays").appendChild(d);
        }

        var clear = document.createElement("div");
        clear.className = "clear";
        document.getElementById("calendarDays").appendChild(clear);
    },

    loader:function() {
        this.loadMonths();
        this.loadYears();
        this.loadDays();
    },


    daysInMonth:function(ye,mon)
    {
        var d = new Date(ye, mon+1, 0);
        return d.getDate();
    },
};


window.addEventListener('load', function () {

    document.getElementById("curMonth").innerHTML = calendar.months[m];
    document.getElementById("curYear").innerHTML = y;
    calendar.loader();
    

});

console.log(calendar.months[m])