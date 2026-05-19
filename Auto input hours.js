//anguler.element(dot).scope().$ctrl.<ID>
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