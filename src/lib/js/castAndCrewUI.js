let renderCastCard = (castObject) => {

    let mainDiv = document.createElement("div");
    mainDiv.className = "profileCard";

    let imgDiv = document.createElement("div");
    imgDiv.className = "imgContainer";
    imgDiv.style.width = "120px";
    imgDiv.style.height = "120px";
    imgDiv.style.borderRadius = "60px";
    imgDiv.style.background = "none";

    let img = document.createElement("img");
    img.className = "profileImg";
    img.style.width = "100px";
    img.style.height = "120px";
    img.style.borderRadius = "60px";
    img.style.opacity = "1";
    img.src = castObject.profile_path ? "https://image.tmdb.org/t/p/w185" + castObject.profile_path : "https://i.ibb.co/270h1Qd/unknown.jpg";

    imgDiv.appendChild(img);
    mainDiv.appendChild(imgDiv);

    //Profile Title
    let profileTitle = document.createElement("h5");
    profileTitle.className = "profileTitle";
    profileTitle.innerText = castObject.name || castObject.original_name;

    // Profile Character
    let profileCharacter = document.createElement("h5");
    profileCharacter.className = "profileCharacter";
    profileCharacter.innerText = castObject.character || castObject.job;

    mainDiv.appendChild(profileTitle);
    mainDiv.appendChild(profileCharacter);

    return mainDiv;


    /*
        <div class="profileCard">

	        <div height="120px" width="120px" class="style__LazyContainer-sc-eykeme-0 bSOkUy" style="border-radius: 60px; background: none;">

                <img alt="Adam Wingard" width="100px" height="100px" class="style__Image-sc-eykeme-1 dWIxSp" style="border-radius: 60px; opacity: 1;" src="https://image.tmdb.org/t/p/w185/iiTLFGXgMrobajYvgpvZxQNqFvy.jpg">
            </div>
            <h5 class="styles__Title-sc-17p4id8-1 jfGPxs">Adam Wingard</h5>
            <h5 class="styles__Subtitle-sc-17p4id8-2 eqRnos">Director</h5>
        </div>
    */

}

export { renderCastCard };