import { CommentTree } from "./comment";

function initializeCommentSection() {

    document.querySelector("#commentSubSection").innerHTML = null;

    // get comments from localstorage
    let comments = localStorage.getItem("comment");

    if (!comments) {
        let commentsNode = new CommentTree("comments");
        localStorage.setItem("comment", JSON.stringify(commentsNode));
    } else { // If comments exist , add the eventlisteners to reply button.
        eventListenerForReplyButton();
    }

    renderUIForCommentsTree(JSON.parse(comments));
}

// When user clicks "add comment" using event.target.id find out if it is parent comment or child comment
function addComment(event) {
    if (document.getElementById("commentSubSection"))
        document.getElementById("commentSubSection").innerHTML = null;

    let currentCommentTree = JSON.parse(localStorage.getItem("comment"));

    // get the comment
    let commentText = document.getElementById("commentText").value;

    if (event.target.id == "mainCommentButton" && commentText != "") {
        // add new node to the root node "comments"
        let newCommentNode = new CommentTree(commentText);
        currentCommentTree.childComments.push(newCommentNode);
        localStorage.setItem("comment", JSON.stringify(currentCommentTree));
        renderUIForCommentsTree(currentCommentTree);
    } else if (event.target.id == "addsubcomment") {
        for (let y = 0; y < currentCommentTree.childComments.length; y++) {
            if (currentCommentTree.childComments[y].id == event.target.parentNode.getAttribute("data-parentId")) {
                let newChildComment = new CommentTree(event.target.value);
                newChildComment.parentID = event.target.parentNode.getAttribute("data-parentId");
                currentCommentTree.childComments[y].childComments.push(newChildComment);
                localStorage.setItem("comment", JSON.stringify(currentCommentTree));
                renderUIForCommentsTree(currentCommentTree);
            }
        }
    }

    document.getElementById("commentText").value = "";

    // add event listener for all comments for reply functionality
    eventListenerForReplyButton();
}

function visualizeComment(data, padding) {

    let mainCommentDiv = document.createElement("div");
    mainCommentDiv.style = `padding-left: ${padding}px`;
    mainCommentDiv.className = "mainCommentDiv";

    let commentsArea = document.createElement("div");
    commentsArea.className = "commentsArea";
    //commentsArea.innerText = data.value + "  ";
    commentsArea.innerHTML = `
        ${data.value} <a class="subCommentReplyButton">reply</a>
    `;
    commentsArea.id = data.id;

    mainCommentDiv.appendChild(commentsArea);

    //mainCommentDiv.appendChild(replySpan);

    document.querySelector("#commentSubSection").appendChild(mainCommentDiv);
}

let createReplyButtonCommentView = (data) => {
    if (!document.querySelector(".subReplyCommentBox")) {
        let div = document.createElement("div");
        div.setAttribute("data-parentId", data.id);
        div.className = "subReplyCommentBox";
        div.innerHTML = `<input class="subReplyInput" type="text"> &nbsp; <button id="addsubcomment">Add Comment</button>`;

        return div;
    }
}

function renderUIForCommentsTree(data, padding = 0) {
    for (let x = 0; x < data.childComments.length; x++) {
        if (data.childComments[x] != "") {
            visualizeComment(data.childComments[x], padding);
            if (data.childComments[x].childComments.length > 1) {
                renderUIForCommentsTree(data.childComments[x], padding + 20);
            }
        }

    }
    padding = 0;
}

function eventListenerForReplyButton() {
    // add event listener for all comments for reply functionality

    document.querySelector("#commentSubSection").addEventListener("click", (e) => {
        if (e.target.innerText == "reply") {
            e.target.parentNode.appendChild(createReplyButtonCommentView(e.target.parentNode));
        } else if (e.target.innerText == "Add Comment") {
            e.target.value = document.querySelector(".subReplyInput").value;
            addComment(e);
        }
    })
}

export { initializeCommentSection, addComment };

/* 

                    comments
                       |
        comment1    comment2    comment3
           |
comment1 child1 comment1 child2 etc...

*/