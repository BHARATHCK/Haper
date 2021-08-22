let commentJSON = {
    title: null,
    id: Math.floor(100000 + Math.random() * 900000),
    movieId: null,
    parentID: null,
    childComments: [],
    value: null
}

function getNewCommentJSON() {
    return {
        title: null,
        id: Math.floor(100000 + Math.random() * 900000),
        movieId: null,
        parentID: null,
        childComments: [],
        value: null
    };
}

export { commentJSON, getNewCommentJSON };