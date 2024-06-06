

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const accessKey = ""
let keyword = "";
let page = 1;

async function searchImage(){
    keyword = searchBox.value // getting the value inside the search box
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page == 1){
        searchResult.innerHTML ="";
    }
    const results = data.results;

    results.map( (result) => {
        const image = document.createElement("img")//creating img tag
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank"; //opening link in a new tab
        
        //appending elements
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    } )
    showMoreBtn.style.display = "block";
}



//submit button functionality

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault(); //prevents refreshing
    page = 1;
    searchImage();
})

//increment page by 1 when clicking 'show more'y7u
showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImage();
})
