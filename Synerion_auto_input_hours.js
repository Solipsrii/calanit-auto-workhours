//angular.element(dot).scope().$ctrl.<ID>
//<ID> = ... -> openDayOptionsPopupButton
//     = pair-> AddAttendancePair


//TODO: wait a few days and check how the system 
//      differentiates between dates...

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



//string_timetable = prompt("Input JSON output from Hilan")
//TODO: DELETE THIS vvvv
//MAINTAIN THIS WHILE TESTING
let json_timetable = [{"date":"02/05","t_entry":"14:55","t_exit":"23:50"},{"date":"03/05","t_entry":"14:49","t_exit":"23:11"},{"date":"05/05","t_entry":"22:44","t_exit":"07:16"},{"date":"08/05","t_entry":"15:02","t_exit":"23:13"},{"date":"09/05","t_entry":"22:49","t_exit":"06:51"},{"date":"11/05","t_entry":"22:49","t_exit":"07:00"},{"date":"14/05","t_entry":"14:53","t_exit":"22:58"},{"date":"15/05","t_entry":"22:51","t_exit":"07:00"},{"date":"19/05","t_entry":"06:45","t_exit":"14:26"},{"date":"20/05","t_entry":"14:50","t_exit":" "}]
let error_list = []
err_i
for (elem of error_list)
    console.log(elem)

if (string_timetable.length==0){
    console.log("uh oh nothing")
}
else{
   json_timetable.forEach(jobj => (input_hours(jobj)))
}

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
    let row_list = document.querySelector('timesheet-records').children[0].children[0]
    //with the row list we can now access each element we want.
    /**
    * attendance-day --> each row has this ID, need child[0].child[0]
    *
    *
    *
    */

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