const fromText = document.querySelector(".from-text"),
selectTag = document.querySelectorAll("select"),
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
    // console.log(tag);
    for (const country_code in countries) {
        // selecting English by default as from language and hindi as to language
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";

        }
        else if(id == 1 && country_code =="hi-IN") {
            selected = "selected";
        }
        // console.log(countries[country_code])
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);  //adding option tag inside select tag
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,   //getting fromselect tag value
    translateTo = selectTag[1].value;     //getting toselect tag value

    // console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
   //fetching api response and returning it with parsing into js obj 
    //and in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);

    });
});