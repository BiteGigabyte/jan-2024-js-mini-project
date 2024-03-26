//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
let localUrl = new URLSearchParams(window.location.search);
let postId = localUrl.get('postId');
//
let fatherBlock = document.getElementById('father');
//
let postBlock = document.createElement('div');
postBlock.className = 'postBlock';
fatherBlock.appendChild(postBlock);
//
let postUrl = new URL (`https://jsonplaceholder.typicode.com/posts/${postId}`);
fetch(postUrl).then(post => post.json()).then(post => {
    for (const postKey in post) {
        let postH4 = document.createElement('h4');
        postH4.className = 'postH4';
        postH4.innerHTML = `${postKey}: <b>${post[postKey]}</b>;`;
        postBlock.appendChild(postH4);
    }
});
//
//
let commentsUrl = new URL (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
//
    function liBuilder (comment) {
        let commentsUlElement = document.getElementsByClassName('commentsUl')[document.getElementsByClassName('commentsUl').length - 1]
        let commentLi = document.createElement('li');
        commentLi.className = 'commentLi';
        commentLi.innerHTML = `<div><i>id:</i> <b>${comment['id']}</b>; <i>body:</i> <b>${comment['body']}</b>;</div>`;
        commentsUlElement.appendChild(commentLi);
    }
//
fetch(commentsUrl).then(comments => comments.json()).then(comments => {
    let commentsUl = document.createElement('ul');
    commentsUl.className = 'commentsUl';
    fatherBlock.appendChild(commentsUl);
    //
    let elementsLiQuantity = 0;
    //
    for (const comment of comments) {
            ++elementsLiQuantity;
        if (elementsLiQuantity <= 4) {
            liBuilder(comment);
        } else {
            elementsLiQuantity = 1;
            //
            let commentsUl = document.createElement('ul');
            commentsUl.className = 'commentsUl';
            fatherBlock.appendChild(commentsUl);
            //
            liBuilder(comment);
        }
    }
//
    let lastUl = document.getElementsByClassName('commentsUl')[document.getElementsByClassName('commentsUl').length - 1];
    //
    if (lastUl.children.length <= 1) {
        let commentLi = lastUl.getElementsByClassName('commentLi');
        for (const commentLiElement of commentLi) {
        commentLiElement.classList.remove('commentLi');
        }
    }
    //
    //
    // Додав цей код після того, як всі елементи будуть додані до DOM
// після завершення виконання функції fetch для отримання коментарів щоб задати однаковий розмір
//
// Отримати всі елементи li
    let listItems = document.querySelectorAll('.commentLi');
//
// Знайти найбільшу висоту серед усіх елементів li
    let maxHeight = 0;
    listItems.forEach(function(item) {
        let itemHeight = item.offsetHeight;
        maxHeight = Math.max(maxHeight, itemHeight);
    });
//
// Застосувати максимальну висоту до всіх елементів li
    listItems.forEach(function(item) {
        item.style.height = maxHeight + 'px';
    });
//
    //
})
//
//
//
//