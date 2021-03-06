$(document).ready(function(){

    //document.getElementById("name").focus();
    $("#name").focus();


    //Job Role Other Option
    $("#other-title").hide();

    //Display a text input if 'other' is selected in job role
    //Remove if job role is selected
    $("#title").change(function(){
        
        if($("#title option:selected").val() === "other"){
            $("#other-title").show();
        }else{
            $("#other-title").hide();
        }

    })

    /***********************************************************/
    //TShirt
    /***********************************************************/
    //Color option should be hidden until Design is selected
    //Only show color options that the design has avaible

    $("#colors-js-puns").hide();            //Color options disbaled
    $(".shirt-box").append('<label id="select-theme">Please select a T-shirt them:</label>');//instruct to choose a theme
    $("#design").change(function(){

        //if design is selected, display the color options
        //options are first emptied so correct color options must be reapplied.
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
            //else function will hide color options again until theme is selected 
            $("#select-theme").show();
            $("#colors-js-puns").hide();

        }
    })
    /***********************************************************************/
    //REGISTER FOR ACTIVITIES
    /***********************************************************************/
    //Add or subtract cost for activities if the checkbox is selected or deselected
    //Add a disable feature if time confilicts with other time.
    //Cost update will chanage the total price at the bottom of the list when activities are selected 
    let totalCost = 0;
    $(".activities").append('<div class="total-cost"></div>' );

    function costUpdate(update){
        totalCost = totalCost + update;
        $('div.total-cost').text("Total Cost: $" + totalCost)
    }
    //First Three options do not have time conflicts so a disable options is not needed
    $("input[name='all']").change(function(){
        if($(this).is(":checked")){
            costUpdate(200);
        }else{
            costUpdate(-200);
        }
    });
    $("input[name='npm']").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
        }else{
            costUpdate(-100);
        }
    });
    $("input[name='build-tools']").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
        }else{
            costUpdate(-100);
        }
    });

    //Next options will disable the conflicting options immediately  
    //https://api.jquery.com/prop/#entry-longdesc-1
    $("input[name=js-frameworks]").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
            $("input[name='express']").attr('disabled', true);
        }
        else{
            costUpdate(-100);
            $("input[name='express']").attr('disabled', false);
        }
    });

    $("input[name=js-libs]").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
            $("input[name='node']").attr('disabled', true);
        }
        else{
            costUpdate(-100);
            $("input[name='node']").attr('disabled', false);
        }
    });
    $("input[name=express]").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
            $("input[name='js-frameworks']").attr('disabled', true);
        }
        else{
            costUpdate(-100);
            $("input[name='js-frameworks']").attr('disabled', false);
        }
    });
    $("input[name=node]").change(function(){
        if($(this).is(":checked")){
            costUpdate(100);
            $("input[name='js-libs']").attr('disabled', true);
        }
        else{
            costUpdate(-100);
            $("input[name='js-libs']").attr('disabled', false);
        }
    });
    /*************************************************************/
    //Payment Method
    /*************************************************************/
    //Credit card option will be displayed as default
    //If payment option is changed, div holding information will change with it
    $("#paypal").hide();
    $("#bitcoin").hide();
    $("#payment option[value='select method']").remove();

    //$('#payment').val("credit card")

    $("#payment").change(function(){
        if($("#payment option:selected").val() === "credit card"){
            $("#paypal").hide();
            $("#bitcoin").hide();
            $("#credit-card").show();

        }else if($("#payment option:selected").val() === "paypal"){
            $("#bitcoin").hide();
            $("#credit-card").hide();
            $("#paypal").show();

        }else{
            $("#paypal").hide();
            $("#credit-card").hide();
            $("#bitcoin").show();
        }
    })

    /**************************************************************** */
    //Submit And Validation
    /**************************************************************** */
    //If the user presses enter or submit on the form a list of validations function will take place
    //

    $('form').prepend('<p id="error"></p>');
    $('form').prepend('<p id="error1"></p>');
    $('form').prepend('<p id="error2"></p>');
    $('form').prepend('<p id="error3"></p>');
    $('#error').hide();
    $('#error1').hide();
    $('#error2').hide();
    $('#error3').hide();
    
    //Validation
    $('form').submit(function(event){

        //Shortcuts
        let name = $('#name').val();
        let email = $('#mail').val();
        let actvitites = $('input[type="checkbox"]');
        let cc_num = $('#cc-num').val();
        let zip = $('#zip').val();
        let cvv = $('#cvv').val();
        let message = "";
        

        //Validation Call Functions will return true or false
        let nameCheck = validateName(name);
        let emailCheck = validateEmail(email);
        let activityCheck = validateActivitySection(actvitites);
        let creditCardCheck = false
        if($("#payment").val() === "credit card"){
            creditCardCheck = validateCreditCard(cc_num, zip, cvv);
        }
        else{ //If paypal or bitcoin selected, return true for correct validiation
            creditCardCheck = true;
        }
        
        //"If" functions check for errors and will inform the user where that error occured at the top of the form 
        if(!nameCheck){
            message = "<p>Name not Valid</p>";
            event.preventDefault();
            console.log('error');
            $("#error").html(message); 
            $('#error').show();
            $('#name').focus();
            $("html, body").animate({scrollTop: 0}, "slow");
        }else{
            $('#error').hide();
        }
        if(!emailCheck){
            message = "<p>Email not Valid</p>";
            event.preventDefault();
            console.log('error');
            $("#error1").html(message); 
            $('#error1').show();
            $('#mail').focus();
            $("html, body").animate({scrollTop: 0}, "slow");
        }else{
            $('#error1').hide();
        }
        if(!activityCheck){
            message = "<p>Activity not Valid</p>";
            event.preventDefault();
            console.log('error');
            $("#error2").html(message); 
            $('#error2').show();
            //$('#name').focus();
            $("html, body").animate({scrollTop: 0}, "slow");
        }else{
            $('#error2').hide();
        }
        if(!creditCardCheck){
            message = "<p>Credit Card not Valid</p>";
            event.preventDefault();
            console.log('error');
            $("#error3").html(message); 
            $('#error3').show();
            $('#cc-num').focus();
            $("html, body").animate({scrollTop: 0}, "slow");
        }else{
            $('#error3').hide();
            
        }
        if(creditCardCheck && activityCheck && emailCheck && nameCheck){
            alert("You have successfully registered");
        }
        document.getElementById("error").style.color = "red";
        document.getElementById("error1").style.color = "red";
        document.getElementById("error2").style.color = "red";
        document.getElementById("error3").style.color = "red";
        
    
    //Validation Functions
    function validateName(name){
        const nameTest = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/;
        
        if(name == "" || !nameTest.test(name)){
            return false;
            console.log("False");

        }else{
            return true;
            console.log("True");
        }
    }

    function validateEmail(email){
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailTest.test(email)){
            return true;
            console.log("True");
        }else{
            return false;
            console.log("False");
        }
    }

    function validateActivitySection(activities){
        if($('input:checkbox').is(':checked')){
            return true;
            console.log("True");
        }else{
            return false;
            console.log("False");
        }
    }
    //
    function validateCreditCard(cc, zip, cvv){
        //
        const cvvReg = /^\d{3}$/;
        const ccReg = /^\d{13,16}$/
        const zipReg = /^\d{5}$/;
        if(ccReg.test(cc) && zipReg.test(zip) && cvvReg.test(cvv)){
            return true;
            console.log("True");

        }
        else{
            return false;
            console.log("False");
        }
    }
    
    });
    

});