import { CommentTree } from "./comment";

let currentCommentTreeF = null;
let currentUserSelectedMovieDetails = null;

function initializeCommentSection(data) {

    currentUserSelectedMovieDetails = data;

    document.querySelector("#commentSubSection").innerHTML = null;

    // if comments not available create
    if (!localStorage.getItem("comment")) {
        let commentsNode = new CommentTree(data.title);
        let commentsArray = new Array();
        commentsNode.parentID = data.id;
        commentsArray.push(commentsNode);
        localStorage.setItem("comment", JSON.stringify(commentsArray));
    } else { // If comments exist , add the eventlisteners to reply button.
        eventListenerForReplyButton();
    }

    // check if movie specific comments are available using parentID [which is ID of movie]
    currentCommentTreeF = getCurrentMovieCommentCollection(data);

    //currentCommentTreeF = JSON.parse(localStorage.getItem("comment"));

    renderUIForCommentsTree(currentCommentTreeF);
}

let getCurrentMovieCommentCollection = (data) => {
    let moviePresent = false;
    let movieSpecificComments = JSON.parse(localStorage.getItem("comment"));
    for (let commentsItem of movieSpecificComments) {
        if (commentsItem.parentID == data.id) {
            currentCommentTreeF = commentsItem;
            moviePresent = true;
        }
    }

    if (!moviePresent) {
        let commentsNode = new CommentTree(data.title);
        commentsNode.parentID = data.id;
        let completeCollection = JSON.parse(localStorage.getItem("comment"));
        completeCollection.push(commentsNode);
        localStorage.setItem("comment", JSON.stringify(completeCollection));
        getCurrentMovieCommentCollection(data);
    }

    return currentCommentTreeF;
}

let setCurrentMovieCommentCollection = (newComment, data) => {
    let movieSpecificComments = JSON.parse(localStorage.getItem("comment"));
    let commentToRender = "";
    for (let commentsItem of movieSpecificComments) {
        if (commentsItem.parentID == data.id) {
            commentsItem.childComments.push(newComment);
            commentToRender = commentsItem;
        }
    }
    localStorage.setItem("comment", JSON.stringify(movieSpecificComments));

    return commentToRender;
}

// When user clicks "add comment" using event.target.id find out if it is parent comment or child comment
function addComment(event) {
    if (document.querySelector("#commentSubSection"))
        document.querySelector("#commentSubSection").innerHTML = null;

    // get the comment
    let commentText = document.getElementById("commentText").value;

    if (event.target.id == "mainCommentButton" && commentText != "") {
        // add new node to the root node "comments"
        let newCommentNode = new CommentTree(commentText);
        // Set the comment to localstorage.
        let commentToRender = setCurrentMovieCommentCollection(newCommentNode, currentUserSelectedMovieDetails);
        renderUIForCommentsTree(commentToRender);
    }

    document.getElementById("commentText").value = "";

    // add event listener for all comments for reply functionality
    eventListenerForReplyButton();
}

// recursive method to push the new child comment
let addNewChildComment = (allComments, event) => {

    // re-render the comment list
    document.querySelector("#commentSubSection").innerHTML = "";

    for (let i of allComments) {
        if (i != "") {
            let parentId = event.target.parentNode.getAttribute("data-parentId")
            if (i.id == parentId) {
                let newChildComment = new CommentTree(event.target.value);
                newChildComment.parentID = parentId;
                i.childComments.push(newChildComment);
            } else if (i.childComments.length > 0) {
                addNewChildComment(i.childComments, event);
            }
        }
    }
    // Set to LocalStorage
    let movieSpecificComments = JSON.parse(localStorage.getItem("comment"));

    for (let currentItem of movieSpecificComments) {
        if (currentItem.parentID == currentUserSelectedMovieDetails.id) {
            currentItem.childComments = allComments;
        }
    }
    localStorage.setItem("comment", JSON.stringify(movieSpecificComments));
};



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

    //document.querySelector("#commentSubSection").appendChild(mainCommentDiv);

    return mainCommentDiv;
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

    // Clear container before painting
    //document.querySelector("#commentSubSection").innerHTML = "";

    for (let x = 0; x < data.childComments.length; x++) {
        if (data.childComments[x] != "") {
            document.querySelector("#commentSubSection").appendChild(visualizeComment(data.childComments[x], padding));
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
            currentCommentTreeF = getCurrentMovieCommentCollection(currentUserSelectedMovieDetails);
            addNewChildComment(currentCommentTreeF.childComments, e);
            renderUIForCommentsTree(currentCommentTreeF);
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