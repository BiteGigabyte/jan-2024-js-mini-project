// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
//
const localUrl = new URLSearchParams(window.location.search);
const userId = localUrl.get('userId');
//
let userDiv = document.createElement('div');
userDiv.className = 'userDiv';
let fatherDiv = document.getElementById('father');
fatherDiv.appendChild(userDiv);
//
const userUrl = new URL(`https://jsonplaceholder.typicode.com/users/${userId}`);
fetch(userUrl).then(user => user.json()).then(user => {
    let userUl = document.createElement('ul');
    userUl.className = 'userUl';
    userDiv.appendChild(userUl);
    //
    console.log(user);
    for (const userKey in user) {
        if (typeof user[userKey] !== 'object') {
        let userDetailLi = document.createElement('li');
            userDetailLi.innerHTML = `${userKey}: <b>${user[userKey]}</b>;`;
        userUl.appendChild(userDetailLi)
        } else {
                let userDetailLi = document.createElement('li');
                userDetailLi.innerText = `${userKey}:`;
                userUl.appendChild(userDetailLi)
                let userDetailsLiUl = document.createElement('ul');
                userDetailLi.appendChild(userDetailsLiUl);
            for (const userKeyKey in user[userKey]) {
                if (typeof user[userKey][userKeyKey] !== 'object') {
                    let userDetailLiOlLi = document.createElement('li');
                    userDetailLiOlLi.innerHTML = `<i>${userKeyKey}</i>: <b>${user[userKey][userKeyKey]}</b>;`;
                    userDetailsLiUl.appendChild(userDetailLiOlLi)
                }
                else {
                        let userDetailLiOlLi = document.createElement('li');
                        userDetailLiOlLi.innerHTML = `<i>${userKeyKey}</i>:`;
                        userDetailsLiUl.appendChild(userDetailLiOlLi)
                        let userDetailLiOlLiUl = document.createElement('ul');
                        userDetailLiOlLi.appendChild(userDetailLiOlLiUl);
                    for (const userKeyKeyKey in user[userKey][userKeyKey]) {
                        let userDetailLiOlLiUlLi = document.createElement('li');
                        userDetailLiOlLiUlLi.innerHTML = `${userKeyKeyKey}: <b>${user[userKey][userKeyKey][userKeyKeyKey]}</b>;`;
                        userDetailLiOlLiUl.appendChild(userDetailLiOlLiUlLi);
                    }
                }
            }
        }
    }
    //
});
//
    let userPostsButton = document.createElement('input');
    userPostsButton.type = 'button';
    userPostsButton.value = 'post of current user';
    userPostsButton.className = 'userPostsButton';
    fatherDiv.appendChild(userPostsButton);
    let buttonTrigger = false;
//
    userPostsButton.onclick = function () {
        //
        userPostsButton.classList.toggle("colorGreen");
        // Після певного часу (наприклад, 1 секунди), повертаємо оригінальний колір кнопки
        setTimeout(function() {
            userPostsButton.classList.toggle("colorGreen");
        }, 1000);
    //
        buttonTrigger = !buttonTrigger;
        console.log(buttonTrigger);
        if (buttonTrigger === true) {
            let postsDiv = document.createElement('div');
            postsDiv.id = 'postsDiv';
            fatherDiv.appendChild(postsDiv);
        //
        const postsUrl = new URL (`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        //
        fetch(postsUrl).then(posts => posts.json()).then(posts => {
            for (const post of posts) {
                console.log(post);

                let postDiv = document.createElement('div');
                postDiv.className = 'postDiv';
                postsDiv.appendChild(postDiv);
                let posth4 = document.createElement('h4');
                posth4.className = 'postH4';
                posth4.innerText = `${post['title']}`;
                let postDetailsButton = document.createElement('input');
                postDetailsButton.value = 'post details';
                postDetailsButton.type = 'button';
                postDetailsButton.className = 'postDetailsButton';
                // postDetailsButton.classList.toggle('colorGreen');
                // postDetailsButton.src = `../post_details/post-details.html`;
                postDetailsButton.onclick = function () {
                    window.location.href = `../post_details/post-details.html?postId=${post['id']}`;
                    //
                    postDetailsButton.classList.toggle("colorGreen");
                    setTimeout(function() {
                        postDetailsButton.classList.toggle("colorGreen");
                    }, 1000);
                }
                //
                postDiv.append(posth4, postDetailsButton);
            }
            //
            postsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        //
        } else {
            let postsDiv = document.getElementById('postsDiv');
            postsDiv.remove();
            //
            userPostsButton.classList.toggle("colorRed");
            // Після певного часу (наприклад, 1 секунди), повертаємо оригінальний колір кнопки
            setTimeout(function() {
                userPostsButton.classList.toggle("colorRed");
            }, 1000);
        }
    }
//
//
//
