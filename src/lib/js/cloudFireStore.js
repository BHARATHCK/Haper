import { setAuthCookie } from "./authGuard";

let addCommentToCollection = (commentObject) => {
    console.log("Custom Object -> " + commentObject);
    db.collection("comments").doc(commentObject.movieId.toString()).set(commentObject).then(() => {
        console.log("SUCCESS -- FIRESTORE Document added **************");
    }).catch((error) => {
        console.log("ERROR while inserting firestore doc **************" + error.message);
    });
}

let getDocumentFromCollection = (movieId) => {
    var docRef = db.collection("comments").doc(movieId.toString());

    return docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Create User
let createUser = (email, password) => {
    try {
        return auth.createUserWithEmailAndPassword(email, password).then(user => {
            setAuthCookie(user.refreshToken);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        });
    } catch (err) {
        console.log(err);
        document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
        document.getElementById("pass").value = "";
        document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
    }
}

//verifyUser
let verifyUser = (email, password) => {
    try {
        return auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("SUCCESSFUL ********* " + user);
                setAuthCookie(user.refreshToken);
            }).catch(err => {
                console.log(err);
                document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
                document.getElementById("pass").value = "";
                document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
            })
    } catch (err) {
        console.log(err);
        document.getElementById("username").value = err.message.substring(err.message.indexOf(":") + 1, err.message.length);
        document.getElementById("pass").value = "";
        document.getElementById("username").style.boxShadow = "0 0 3px #CC0000";
    }
}

export { addCommentToCollection, getDocumentFromCollection, createUser, verifyUser };