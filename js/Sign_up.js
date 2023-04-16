$(document).ready(function () {
    $(".name").click(function () {
        location.href = "/index.html";
    });

    const $form = $("#form");
    $form.on('submit', (e) => {
        e.preventDefault()
        const email = $form.find('input[name=username]').val()
        const yourname = $form.find('input[name=yourname]').val()
        const password = $form.find('input[name=password]').val()
        const repassword = $form.find('input[name=repassword]').val()
        if (password == repassword) {
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
                location.href = '/index.html'
            }, (response) => {
                alert(`ajax Fail\nUseName: ${userid}\nyourname: ${yourname}\npassword: ${password}\nre-enter password: ${repassword}`);
                console.log(response);
            })
        }
    })
});