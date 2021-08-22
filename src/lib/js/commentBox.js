import { commentJSON, getNewCommentJSON } from "./comment";
import { addCommentToCollection, getDocumentFromCollection } from "./cloudFireStore";

let currentCommentJSON = null;

function initializeCommentSection(data) {

    // Check if any comments are registered against current movieID
    getDocumentFromCollection(data.id).then(commentCollection => {
        if (commentCollection) {
            // If comments are registered against current movieID - get the document to perform further op.
            currentCommentJSON = commentCollection;
            // add event Listeners to handle reply functionality
            eventListenerForReplyButton();
        } else {
            // If comments are not registered against current movieID - Create one
            commentJSON.title = data.title;
            commentJSON.movieId = data.id;
            addCommentToCollection(commentJSON);
            currentCommentJSON = commentJSON;
        }

        renderUIForCommentsTree(currentCommentJSON);
    });

    document.querySelector("#commentSubSection").innerHTML = null;
}

let setCurrentMovieCommentCollection = (newCommentText) => {

    let newComment = getNewCommentJSON();
    newComment.value = newCommentText;
    currentCommentJSON.childComments.push(newComment);
    addCommentToCollection(currentCommentJSON);
}

// When user clicks "add comment" using event.target.id find out if it is parent comment or child comment
function addComment(event) {
    if (document.querySelector("#commentSubSection"))
        document.querySelector("#commentSubSection").innerHTML = null;

    // get the comment
    let commentText = document.getElementById("commentText").value;

    if (event.target.id == "mainCommentButton" && commentText != "") {

        setCurrentMovieCommentCollection(commentText);
        renderUIForCommentsTree(currentCommentJSON);
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
                let newChildComment1 = getNewCommentJSON();
                newChildComment1.parentID = parentId;
                newChildComment1.value = event.target.value;
                i.childComments.push(newChildComment1);
            } else if (i.childComments.length > 0) {
                addNewChildComment(i.childComments, event);
            }
        }
    }
    // Set to document
    addCommentToCollection(currentCommentJSON);

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
            if (data.childComments[x].childComments.length > 0) {
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
            //currentCommentTreeF = getCurrentMovieCommentCollection(currentUserSelectedMovieDetails);
            addNewChildComment(currentCommentJSON.childComments, e);
            renderUIForCommentsTree(currentCommentJSON);
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