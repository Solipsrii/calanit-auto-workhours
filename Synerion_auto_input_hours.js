//angular.element(dot).scope().$ctrl.<ID>
//<ID> = ... -> openDayOptionsPopupButton
//     = pair-> AddAttendancePair
//NOT STRING! LITERAL!

//use: dots_list = angular.element(openDayOptionsPopupButton), 
//access via: dots_list[0], dots_list[1], etc....
//ACTUALLY: angular.element(dots_list[i]) !!!! then .click()!!!!

//GAIN THE WHOLE ROW VIA:
// row = dots_list[0].parentNode.parentNode.parentNode

//TODO: wait a few days and check how the system 
//      differentiates between dates...

/**
GET ELEMENTS CHEATSHEET:
    
    Get ROW LIST:
    row_list = angular.element(timesheetList)[1].children[0]
    get TOTAL LEGIT ROW AMOUNT:  row_list.childElementCount.
    
    Get ALL DATES:
    dates = document.getElementsByClassName("date attendance-day-date")
    --> 0 to max 30 is what we want, but there's 60+. Need to limit via children count of LIST.
*/


/*
what I know thus far:
use element.scope().$ctrl to fetch that element's controller, to press button events.

date class is: 
date attendance-day-date  ---> on good-date, need to go up like 4 parents in order to reach 
                               "..." (openDayOptionsPopupButton) in order
                               to send new date-pair. (its class is AddAttendancePair).
                               dunno from there.

                               That being said, it's entirely possible that index between classes correspond naturally.
                               need to test. that way, no need to go parent parent...
                               

*/

//CONST NAMES TO AVOID UGLY HTML NAMES!



//string_timetable = prompt("Input JSON output from Hilan")
//TODO: DELETE THIS vvvv
//MAINTAIN THIS WHILE TESTING
let json_timetable = [{"date":"02/05","t_entry":"14:55","t_exit":"23:50"},{"date":"03/05","t_entry":"14:49","t_exit":"23:11"},{"date":"05/05","t_entry":"22:44","t_exit":"07:16"},{"date":"08/05","t_entry":"15:02","t_exit":"23:13"},{"date":"09/05","t_entry":"22:49","t_exit":"06:51"},{"date":"11/05","t_entry":"22:49","t_exit":"07:00"},{"date":"14/05","t_entry":"14:53","t_exit":"22:58"},{"date":"15/05","t_entry":"22:51","t_exit":"07:00"},{"date":"19/05","t_entry":"06:45","t_exit":"14:26"},{"date":"20/05","t_entry":"14:50","t_exit":" "}]
let error_list = []
let err_i = 0
for (elem of error_list)
    console.log(elem)

if (json_timetable.count==0){
    console.log("uh oh nothing")
}
else{
    jobj = json_timetable[1]
    let row_list = angular.element(timesheetList)[1].children[0]
    let dots_list =  angular.element(openDayOptionsPopupButton)
    let index = parseInt(jobj.date.substring(0,2))-1 ///turn "04/05" -> 4-1 -> 3, i.e: row with date "04/05" is at index 3.
   
    console.log("pop-up test:")
    angular.element(dots_list[1]).trigger("click")
    pair = angular.element(AddAttendancePair).trigger("click")
    //row_list.children[1].getElementsByClassName("minute-wrap")
   //json_timetable.forEach(jobj => (input_hours(jobj)))
}
console.log(`err_i:${err_i}`)

/**
    timetables[i] = {
        "date":`${date}`,
        "t_entry":t_entry,
        "t_exit":t_exit
    }
*/

function input_hours(jobj){
    if(check_errors(jobj))
            return;
    
    console.log(`trying to locate ${jobj.date}`)
    
    //this is a pretty janky way to do this, couldn't find a bettre way to locate the row list otherwise.
        //let row_list = document.querySelector('timesheet-records').children[0].children[0]
    let row_list = angular.element(timesheetList)[1].children[0]
    let dots_list =  angular.element(openDayOptionsPopupButton)
    let index = parseInt(jobj.date.substring(0,2))-1 //turn "04/05" -> 4-1 -> 3, i.e: row with date "04/05" is at index 3.

    //using the dates as all viable indexes for days 1 to max 30, we can access all actual work days:
    if(dots_list[index] != null){
        angular.element(dots_list[index]).click()

        //an elemet pop-up box should open here, let's fetch it as well
        
    }

}


/** ======================================== **/


function check_errors(jobj){
    if(jobj.t_exit.length <= 2){
        console.log(`warning: ${jobj.date} has no exit time!`)
        error_list[err_i++] = `${jobj.date} was ignored (bad exit)`
        return 1;
    }
    

    if(jobj.t_entry.length <= 2){
        console.log(`warning: ${jobj.date} has no entry time! (should be impossible...)`)
         error_list[err_i++] = `${jobj.date} was ignored (bad entry???)`
        return 1;
    }

    return 0; //no errors
}

//enumerate row_list (contains all "attendance-day" objects, empty and with pairs both)
//and try to locate the row with the correct date within jobj!
function scrawl_for_row(row_list, date){
    for(i=0; i < row_list.childElementCount; i++){
        row_elem = row_list.children[i].children[0].children[0]
        if (row_list.children[i].children[0].children[0]){}
    }
}

async function input_pair(tstart, tend){
   await new Promise(r => setTimeout(r, 100));
}