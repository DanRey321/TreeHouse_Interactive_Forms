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

/* 
create variable to update cost
create funmction to update cost
create function, on check add cost to total cost, disable other conflicting events. 
open source enable and disable function
 https://stackoverflow.com/questions/17599984/how-to-enable-a-disabled-checkbox-dynamically

*/
function enable() {
    document.getElementById("check").disabled= false;

}
function disable() {
     document.getElementById("check").disabled= true;
}

let totalCost = 0;
$(".activities").append('<div class="total-cost"></div>' );


function costUpdate(update){
    totalCost = totalCost + update;
    $('div.total-cost').text("Total Cost: $" + totalCost)
    
}

$("input[name='all']").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(200);
    }else{
        costUpdate(-200);
    }

});
$("input[name='npm']").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
    }else{
        costUpdate(-100);
    }

});
$("input[name='build-tools']").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
    }else{
        costUpdate(-100);
    }

});
//https://api.jquery.com/prop/#entry-longdesc-1
$("input[name=js-frameworks]").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
        $("input[name='express']").attr('disabled', true);
    }
    else{
        costUpdate(-100);
        $("input[name='express']").attr('disabled', false);
    }

});

$("input[name=js-libs]").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
        $("input[name='node']").attr('disabled', true);
    }
    else{
        costUpdate(-100);
        $("input[name='node']").attr('disabled', false);
    }

});
$("input[name=express]").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
        $("input[name='js-frameworks']").attr('disabled', true);
    }
    else{
        costUpdate(-100);
        $("input[name='js-frameworks']").attr('disabled', false);
    }

});
$("input[name=node]").change(function(){
    $this = $(this)
    if($this.is(":checked")){
        costUpdate(100);
        $("input[name='js-libs']").attr('disabled', true);
    }
    else{
        costUpdate(-100);
        $("input[name='js-libs']").attr('disabled', false);
    }

});


