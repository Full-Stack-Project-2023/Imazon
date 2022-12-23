//Incomplete
$(document).ready(function () {
    $(".name").click(function () {
        location.href = "/index.html";
    });

    const $sign_in_form = $("#sign_in_form");
    $sign_in_form.submit(function (e) {
        e.preventDefault();
        const findUser = ['email', 'password'];
        let userInfoHash = {};

        findUser.forEach((key) => {
            userInfoHash[key] = $(this).find(`input[name=${key}]`).val();
        });

        // $.post('./Sign_In.html', JSON.stringify(userInfoHash)
        // ).then((response) => {
        //     console.log(response)
        // }, (response) => {
        //     alert('post Fail')
        //     console.log(response)
        // })

        $.ajax({
            url: './Sign_In.html',
            method: 'POST',
            contentType: "text/json; charset=utf-8",
            data: JSON.stringify(userInfoHash)
        }).then(() => {
            alert('Success');
            location.assign('/index.html');
        }, (response) => {
            alert(`ajax Fail\nEmail: ${userInfoHash['email']}\nPassword: ${userInfoHash['password']}`);
            console.log(response);
        });
    });
});