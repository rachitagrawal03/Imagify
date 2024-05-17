const accessKey = "Evl37H6_mA9g1gA-lgzR3s_ub5cOxT8q6M3JGiy25ho";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page=1;

async function searchImages(){
    inputData=inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);

    const results = data.results;
    console.log(results);

    if(page==1)
    {
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink= document.createElement('a');
        // imageLink.href = result.links.html;
        imageLink.href = result.urls.small;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        const button = document.createElement('button');
        button.type = "button";

        // console.log(imageLink.href);

        imageLink.appendChild(image);

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
        
        image.addEventListener("click", () => {
            downloadImg(imageLink.href);
        })
    })
    page++;
    if(page>1)
    {
        showMore.style.display="block"; 
    }
}

formE1.addEventListener("submit", (event) =>{
    event.preventDefault();
    page=1;
    searchImages();   
})

showMore.addEventListener("click", () =>{
    searchImages();   
})

let url = "https://script.google.com/macros/s/AKfycbzJC6rN6N0GEfJ-w8AzHUPCpangOe-i8Y2hPEGHyPG2MJolPGrHESkQQF2198_XUkpbMA/exec";

let searchQuery = document.querySelector('#searchQuery');

searchQuery.addEventListener("submit", (e)=> {
    // e.target.searchButton.innerHTML = "Searching....";
    e.preventDefault();
    let myFormData = new FormData(searchQuery);
    fetch(url, {
        method: "POST",
        body: myFormData
    }).then((res)=> res.text())
    .then((finalRes)=> {
        e.target.searchButton.innerHTML = "Search";
    })
})

    const downloadImg= (imgURL) => {
        //Converting received img to blob, creating its download link, & downloading it
        
        fetch(imgURL).then(res=> res.blob()).then(file => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(file);
            console.log(a.href);
            a.download = new Date().getTime();
            console.log(a.download);
            a.click();
        }).catch(()=> alert("failed to download image!"))
    }   