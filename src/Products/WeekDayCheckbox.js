
function noBoxesChecked(){
    let checkBoxes = document.getElementsByName("dayOfWeek");
    let isChecked = false;
    for(let i = 0; i < checkBoxes.length; i++){
        if(checkBoxes[i].checked){
            isChecked = true;
        };
    };
    if(isChecked){
        // alert('At least one checkbox checked!');
        return false;
    } else{
        return true;
    }
}


export default noBoxesChecked;