const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".raw i");

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

exchangeIcon.addEventListener("click", () => {
    //exchanging textarea and select tag values
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value =selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,   //getting fromselect tag value
    translateTo = selectTag[1].value;     //getting toselect tag value

     if(!text) return;
     toText.setAttribute("placeholder", "Translating...")

    // console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
   //fetching api response and returning it with parsing into js obj 
    //and in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        // console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translating...")

    });

});    

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        // console.log(target)
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                // console.log("From copy icon clicked")
                navigator.clipboard.writeText(fromText.value);

            }
            else{
                // console.log("To copy icon clicked")
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterance;
            // if clicked icon has from id, speak the fromTextarea value else speak the toTextarea value
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;  //setting utterance language to fromselect tag value
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;   //setting utterance language to toselect tag value
            }
            speechSynthesis.speak(utterance);

            // console.log("Speech icon clicked")
        }
    });
})
