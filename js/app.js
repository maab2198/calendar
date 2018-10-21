function Calendar () {
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();    

    let firstYear = 2000;
    let lastYear = 2020;
    this.eventList = {};
    
    this.loader = function() {

        loadMonths.call(this);
        loadYears.call(this);
        createEventList.call(this,events);
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
        let context = this;
        document.getElementById("calendarDays").innerHTML = "";
     
        let daysInMonth = new Date(this.year, this.month+1, 0).getDate();
        //day of week for a first day of the month
        let firstDay = new Date(this.year, this.month, 0).getDay(); 
      
     
        for(let i = 0; i <= firstDay && firstDay < 6; i++)
          {
              let day = document.createElement("div");
              day.classList.add("day");
              day.classList.add("blank");
              document.getElementById("calendarDays").appendChild(day);
          }
          

          for (let i = 0; i < daysInMonth; i++) {
            let number = i + 1;
            let day = document.createElement("div");
            var id = this.year*10000 + this.month*100+ number;
            day.id = id;
           
            day.className = "day";
            day.innerHTML = number;
            if(this.eventList[id]){
                day.style="color:red";
            }
            day.onclick = function(){
                showInfo.call(context,this.id)
            };    
            document.getElementById("calendarDays").appendChild(day);    
        

        }
    }

    function showInfo(id){
        var block =  document.getElementById("info");
        
        if(this.eventList[id])
            {
                var text = document.createElement("div")
                text.innerHTML = this.eventList[id].Date + " " + this.eventList[id].Title;
                //console.log((document.getElementById("clear").children))
               // if(!document.getElementById("clear").children.length) 
                {
                    document.getElementById("info").innerHTML=text.outerHTML;
                }
            }
    }

    function createEventList(list){

        for (var i = 0; i < list.length; i++) {
          
            var get =  new Event(list[i])
            this.eventList[get.id] = get;
        }
    }
    


};


function Event(options) {
    let obj = {

    }

    for(let key in options){
       
        obj[key] = options[key];
      }
     let year = obj.Date.getFullYear();
     let month = obj.Date.getMonth();
     let day = obj.Date.getDate();
    
     obj.id = year*10000 + month*100 + day;
    
    return obj
}

var calendar = new Calendar();
var events = [

    {'Date': new Date(2018, 9, 30), 'Title': 'Doctor appointment at 3:25pm.'},
    {'Date': new Date(2018, 10, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},  
    {'Date': new Date(2018, 8, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},


];



window.addEventListener('load', function () {
  
    document.getElementById("curMonth").innerHTML = calendar.months[calendar.month];
    document.getElementById("curYear").innerHTML = calendar.year;
    calendar.loader();
    

});

