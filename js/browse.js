function fillter_open(tag = "") {

    
    let fillter_display = document.getElementById(tag);


    if (fillter_display.style.display == "block") {
        fillter_display.style.display = "none";
    }
    else
        fillter_display.style.display = "block";

}

function fillter_reset() {
    let all_Fillter_child = document.querySelectorAll(".fillter_item_child")

    all_Fillter_child.forEach(element => {
        element.style.display = "none";
    });
}



document.addEventListener('DOMContentLoaded',() => {
    let child = document.querySelectorAll(".fillter_item_child div")
    child.forEach(element => {
        
    });

});