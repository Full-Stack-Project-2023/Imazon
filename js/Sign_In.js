$(document).ready(function(){
    $(".name").click(function() {
        window.location.href = "/index.html";
    });

    const $sign_in_form = $("#sign_in_form");
    $sign_in_form.submit(function(e) {
        e.preventDefault();
        const email = $sign_in_form.find('input[name=email]').val();
        const password = $sign_in_form.find('input[name=password]').val();
        // error
        $.ajax({
            url: './Sign_In.html',
            //url: '/test.json',
            method: 'POST',
            contentType: "text/json; charset=utf-8",
            data: JSON.stringify({
                email: email,
                password: password
            })
        }).then(() => {
            alert('登录成功')
            location.assign('/index.html')
        }, (status) => {
            alert(`Fail\nEmail: ${email}\nPassword: ${password}`);
            console.log(status)
        })
    });
});