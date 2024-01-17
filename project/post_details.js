//      На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let url = new URL(location.href);
let postId = JSON.parse(url.searchParams.get("postId"));
let userId = JSON.parse(url.searchParams.get("userId"))
console.log(postId);

//створюємо блок для інфо про пост
let mainBlock = document.createElement("div");
mainBlock.classList.add("postInfo")
let h2 = document.createElement("h2");
h2.innerText = `Post ${postId}:`
mainBlock.appendChild(h2);
document.body.appendChild(mainBlock);

let mainUl = document.createElement("ul");
mainUl.classList.add("mainUl");
mainBlock.appendChild(mainUl);

let commentsMainDiv = document.createElement("div");
commentsMainDiv.classList.add("commentsMainDiv")
document.body.appendChild(commentsMainDiv);

//для отримання інфи  поста;
async function getPosts() {
    try {
        let postsArr = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId);
        return postsArr.json();
    } catch (e) {
        usersDiv.innerText = "Error: " + e;
    }
}
async function getComments(postId) {
    try {
        let commentsArr = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments");
        return commentsArr.json();
    } catch (e) {
        usersDiv.innerText = "Error: " + e;
    }
}
function recursiveKeyValueGetterInPosts(object, divToAppend) {
    for(let key in object) {
        if(typeof object[key] === "object" && object[key] !== null) {
            let li = document.createElement("li");
            let ul = document.createElement("ul");
            ul.innerText = `${key}:`
            li.appendChild(ul);
            divToAppend.appendChild(li);
            recursiveKeyValueGetter(object[key], ul);
        } else {
            let li = document.createElement("li");
            li.innerText = `${key}: ${object[key]}`;
            divToAppend.append(li);
        }
    }
}
//інфо про публікацію
async function render() {
    let post = await getPosts();
    recursiveKeyValueGetterInPosts(post, mainUl);
}
async function renderComments() {
    let comments = await getComments(postId);
    comments.forEach((comment) => {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("commentDiv");
        let commentContent = document.createElement("p");

        commentContent.innerHTML = `<b>Post id</b> - ${comment.postId} <br/> <b>comment id</b> - ${comment.id}  <br/> 
        <b>name</b> - ${comment.name}  <br/> <b>email</b> - ${comment.email}  <br/> <b>body</b> - ${comment.body}`

        commentDiv.appendChild(commentContent);
        commentsMainDiv.appendChild(commentDiv);
    })
}
renderComments();
render();