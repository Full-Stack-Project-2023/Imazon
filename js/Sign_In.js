if (sessionStorage.getItem('name')) {
    sessionStorage.removeItem('name');
    location.href = "../index.html";
}

$(document).ready(function () {
    $(".name").click(function () {
        location.href = "../index.html";
    });

    const $sign_in_form = $("#sign_in_form");
    $sign_in_form.submit(function (e) {
        e.preventDefault();
        const findUser = ['email', 'password'];
        let userInfoHash = {};

        findUser.forEach((key) => {
            userInfoHash[key] = $(this).find(`input[name=${key}]`).val();
        });

        $.ajax({
            url: './Sign_In.html',
            method: 'POST',
            contentType: "text/json; charset=utf-8",
            data: JSON.stringify(userInfoHash)
        }).then((response) => {
            alert('Success');
            sessionStorage.setItem('name', response.name);
            location.href = "/index.html";
        }, () => {
            alert('Incorrect email or password');
        });
    });
});