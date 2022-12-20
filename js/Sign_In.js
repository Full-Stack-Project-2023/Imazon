$(document).ready(function(){
    $(".name").click(function() {
        window.location.href = "/index.html";
    });
    
    $("#sign_in_form").submit(function() {
        const email = $("#email").val();
        const password = $("#password").val();
        const found = checkInfo(email, password); 

        if (found) {
            //???
            window.location.href = "/index.html";
        }
        else {
            alert("Incorrect Info");
        }
    });
});

function checkInfo(email, password) {
    //MySQL
    return false;
}