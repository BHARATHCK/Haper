class CommentTree {
    constructor(value) {
        this.id = Math.random().toString().substr(2, 7);
        this.parentID = null;
        this.value = value;
        this.childComments = [""];
    }
}

export { CommentTree };