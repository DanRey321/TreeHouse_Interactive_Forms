const jobOther = document.getElementById("title");
let optionO = jobOther.options[jobOther.selectedIndex].value;






//document.getElementById("name").focus();
$("#name").focus();


//Job Role Other Option
$("#other-title").hide();

$("#title").change(function(){
    
    if($("#title option:selected").val() === "other"){
        $("#other-title").show();
    }else{
        $("#other-title").hide();
    }

})



////TShirt
/*
show “Please select a T-shirt theme” at default
if design is selected, hide new label, show color option for that theme.
*/
//.remove() creates bug if theme is changed. 
$("#colors-js-puns").hide();
$(".shirt-box").append('<label id="select-theme">Please select a T-shirt them:</label>');
$("#design").change(function(){
    if($("#design option:selected").val() === "js puns"){
        $("#select-theme").hide();
        $("#colors-js-puns").show();
        $("#color").empty().append('<option value="cornflowerblue">Cornflower Blue</option>')
        $("#color").append('<option value="darkslategrey">Dark Slate Grey</option>')
        $("#color").append('<option value="gold">Gold</option>')

        
    }
    else if($("#design option:selected").val() === "heart js"){
        $("#select-theme").hide();
        $("#colors-js-puns").show();
        $("#color").empty().append('<option value="tomato">Tomato</option>')
        $("#color").append('<option value="steelblue">Steel Blue</option>')
        $("#color").append('<option value="dimgrey">Dim Grey</option>')


    }else{
        $("#select-theme").show();
        $("#colors-js-puns").hide();


    }

})