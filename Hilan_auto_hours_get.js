//enter into: https://bankjerusalem.net.hilan.co.il/Hilannetv2/Attendance/AttendanceApproval.aspx
//then right-click, RUN.
//then retrieve the json output from the console!

/**
plan abstract:
1. fetch element and filter out data from it
2. loop through all elements (until null, given the specific string-id I am looking for)
3. on NULL, json-ify the timetable (is it necessary?), and download it!

plan specific:
1. iterate in a for loop until element returns NULL
2. capture date from its child, capture t_entry from its element, ditto to t_exit
3. before #2 actually: check if that row has a non-null hour-correction, if not NULL, use it instead (use funciton that returns a JSON object)
4. add to timetable[i],
5. ensure that looping through the elements is DYNAMIC, many of the naming repeat.
6. that's it for this file. For the other file, we'd want to replace the "inner html" or value, I reckon, same premise tho.

temp shit so I won't forget:



--get from DOM elementDate its 1st child, then retrieve its innerHTML ("value"), the date
    elemDate = document.getElementById("ctl00_mp_rptInner_ctl00_tdDay") //<-- this part can be: 'ct${i=100,101,..}_mp_rpt${subtype=Inner,Exit,..?}_ct${i}_tdDay or ${rowType}'
    s = elemDate.children[0].innerHTML
    s.substring(s.search("[0-9]"))

--create a json header type! 
const data = {
    "date":<datehere>,
    "t_entry":<start time here>,
    "t_exit":etc
} 

JSON.parse(data) //generate json from an object?

arrays / my list~:
const timetables = []  //initialize it, not quite necessary but w/e
timetables[0] = <data format, i.e: {"date":..., "t_entry":...", etc}
timetables[1] = ... yep, that's it.
*/


/*
main row:
    ctl00_mp_rptInner_ctl00_trReps
date:
    ctl00_mp_rptInner_ctl00_tdDay
entry:
    ctl00_mp_rptInner_ctl00_tdEntry
exit:
    ctl00_mp_rptInner_ctl00_tdExit

i.e:
'ct${i}_mp_rptInner_ct${i}_${col_type}'
*/
let timetables = [];
let date, t_entry, t_exit, col_num;
const addr = "ctl00_mp_rptInner_ctl"

//ctl00_mp_rptInner_ctl00_trReps
i=1
val = `${i}`.padStart(2, '0')
elem = document.getElementById(addr+`${val}_trReps`)
console.log(`result: ${elem}`)

col_num = "00"
//loop through each MAIN ELEMENT ROW, until the naming-scheme returns NULL (no more shifts in this month!)
//"col_num" -> if i=1, then we want "01" (ctl01), if i=10, we want "10" (ctl10) --> notice it's ctL not ct"one". <_< 
for(i=0; ((document.getElementById(addr+`${col_num}_trReps`)) != null); i++, col_num=`${i}`.padStart(2, '0')){
    //get the date from the date-column, the val we need is within its child's inner-HTML (...>04/05 יום<)
    date = document.getElementById(addr+`${col_num}_tdDay`).children[0].innerHTML
    date = date.match("[0-9]+\/[0-9]+") //given shit like "יום ד 04/15", we want to only match: ab/cd where abcd are numbers (i.e: "14/02")

    //get clock-in time (t_entry) and clock out (t_exit)
    t_entry = document.getElementById(addr+`${col_num}_tdEntrySpan`).innerHTML
    t_exit  = document.getElementById(addr+`${col_num}_tdExitSpan`).innerHTML
    
    timetables[i] = {
        "date":`${date}`,
        "t_entry":t_entry,
        "t_exit":t_exit
    }

    console.log(`${i}. date:${date}  entry:${t_entry}   exit:${t_exit} col_num:${col_num}\n`)
}

//print final result 
alert(JSON.stringify(timetables))
console.log(JSON.stringify(timetables))