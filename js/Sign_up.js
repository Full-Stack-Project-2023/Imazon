$(document).ready(function () {
    $(".name").click(function () {
        location.href = "/index.html";
    });

    const $form = $("#form");
    $form.on('submit', (e) => {
        e.preventDefault()
        const email = $form.find('input[name=username]').val().trim()
        const yourname = $form.find('input[name=yourname]').val().trim()
        const password = $form.find('input[name=password]').val().trim()
        const repassword = $form.find('input[name=repassword]').val().trim()
        if (password == repassword && email != "" && yourname != "" && password != "") {
            $.ajax({
                url: './Sign_up.html',
                method: 'POST',
                contentType: "text/json; charset=utf-8",
                data: JSON.stringify({ //一定要转化成JSON字符串再传
                    email: email,
                    yourname: yourname,
                    password: password
                })
            }).then(() => {
                alert('Success')
                location.href = '/html/Sign_In.html'
            }, () => {
                alert('Username already exist');
            })
        }
        else {
            alert("Incorrect Input!");
        }
    })
});