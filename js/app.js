function Calendar () {
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();    

    let firstYear = 2000;
    let lastYear = 2020;
    
    this.loader = function() {
        loadMonths.call(this);
        loadYears.call(this);
        loadDays.call(this);
    };
    
    function loadMonths()
    { 
        for(let i = 0; i < this.months.length; i++)
        {
            let doc = document.createElement("div");
            let context = this;
            
            doc.innerHTML = context.months[i];
            doc.classList.add("dropdown-item");

            doc.onclick = function (){
                loadNewMonth.call(context,i)
            };

            document.getElementById("months").appendChild(doc);
        }
    };

    function loadNewMonth(month) {
        
            this.month = month;
           

            document.getElementById("curMonth").innerHTML = this.months[this.month];
            loadDays.call(this);
        }
    

    function loadYears (){

       for(let i = firstYear; i <= lastYear; i++)
       {
    
        let doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");
        let context = this;

        doc.onclick = function(){
            loadNewYear.call(context,i)
        };
        document.getElementById("years").appendChild(doc);
        }
    };

    function loadNewYear(year) {
        this.year= year;
        document.getElementById("curYear").innerHTML = this.year;
        loadDays.call(this);        

    }    



    function loadDays()
    {
        document.getElementById("calendarDays").innerHTML = "";
     
        let daysInMonth = new Date(this.year, this.month+1, 0).getDate();
        //day of week for a first day of the month
        let firstDay = new Date(this.year, this.month, 0).getDay(); 
      
     
        for(let i = 0; i <= firstDay && firstDay < 6; i++)
          {
              let day = document.createElement("div");
              day.classList.add("day");
              day.classList.add("blank");
              document.getElementById("calendarDays").appendChild(d);
          }
        

          for (let i = 0; i < daysInMonth; i++) {
            let number = i + 1;
            let day = document.createElement("div");
            day.id = "day" + number;
            day.className = "day";
            day.innerHTML = number;
            document.getElementById("calendarDays").appendChild(day);
        }
    };


};



var calendar = new Calendar();



window.addEventListener('load', function () {
  
    document.getElementById("curMonth").innerHTML = calendar.months[calendar.month];
    document.getElementById("curYear").innerHTML = calendar.year;
    calendar.loader();
    

});