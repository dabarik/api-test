$(document).ready(function () {
    
    $("#poster").click(function () {
        var pseudo = $("#pseudo").val();
        var post = $("#post").val();
        $.ajax({
            url: "http://localhost:1717/createPost/",
            type:"POST",
            data: {
                pseudo: pseudo,
                post: post
            },
            success: function (results) {
                console.log(results);
                var tl = document.getElementsByClassName('tl')[0];

                var h1 = document.createElement("h1");
                h1.classList.add('mb-2');
                h1.innerHTML = pseudo;
                tl.appendChild(h1);

                var p = document.createElement('p');
                p.classList.add('mb-2');
                p.innerHTML = post;
                tl.appendChild(p);

                document.getElementById('post').value = '';
                document.getElementById('pseudo').value = '';

            }
        });
    })

    $("#createUser").click(function () {

        var name = $("#name").val();
        var adress = $("#adress").val();
        var password = $("#password").val();

        $.ajax({
            url: "localhost:1717/inscription",
            success: function (results) {
                console.log(results);
            }
        })
    })

    function refresh(){
        $.ajax({
            url:'http://localhost:1717/getPost',
            success: function(results){
                results.posts.forEach(element => {
                    var tl = document.querySelector(".tl");

                    var h1 = document.createElement("h1");
                    h1.classList.add('mt-2');
                    h1.innerHTML = element.pseudo;
                    tl.appendChild(h1);

                    var text = document.createElement("p");
                    text.innerHTML = element.post;
                    tl.appendChild(text);
                });
            }
        })
    }

    refresh();



});