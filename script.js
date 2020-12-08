// DOMS
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let loadedImages = 0;
let totalImages = 0;
let ready = false;
const count = 30;
const key = "y0zOjPjM1q3DcsHpKMSbPevouBQM_s6AtmuGnpx-o9o";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

// making the loader appear
loader.hidden = false;

// Making setAttributes Function to follow up DRY(Don't Repeat Yourself) process
const setAttributes = (tag , attributes) => {
    for(const el in attributes) {
        tag.setAttribute(el , attributes[el]);
    }
};

// Creating function to create <a> <img> elements and display them.
const displayImage = () => {
    loadedImages = 0;
    totalImages = photosArray.length;
    // making loader hidden when displayImage gets executed.
    loader.hidden = true;
    // Iterating through the whole array so that we can create elements for each array members
    // i.e. we are creating photos and providing them information on the basis of each members of the photosArray
    photosArray.forEach(photo => {
        console.log("success");
        // creating <a> tag
        const item = document.createElement("a");
        setAttributes(item , {
            "href" : photo.links.html,
            "target" : "_blank"
        });

        // Creating <img> tag
        const img = document.createElement("img");
        setAttributes(img , {
            "src" : photo.urls.regular,
            "alt" : photo.alt_description,
            "title" : photo.alt_description
        })

        // checking whether image has been loaded or not
        // for that we use load event on each image to check whether every image has been laoded or not;
        img.addEventListener("load" , () => {

            loadedImages++;
            console.log(loadedImages);
            if(loadedImages === totalImages) {
                ready = true;
            }

        });

        // Making <img> child of <a> and <a> child of imageContainer div
        item.appendChild(img);
        imageContainer.appendChild(item);

    });

};

// Unsplash API
async function getImages() {

    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayImage();
}

getImages();

// Making Infinity Scroll using scroll event on window
// window is the parent of document and grandparent of body
// it's work is to find out whether we are at the bottom of the entire body and when to call the async function again.
window.addEventListener("scroll" , () => {

    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages();
    }

});