const selectTag = document.querySelectorAll("select");

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
