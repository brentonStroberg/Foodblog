function onloadProfile() {
    loadUserPost();
}

function loadUserPost() {
    addUserPost('userposts')
}

function addUserPost(carouselID) {
    let carousel = document.getElementById(carouselID);
    let article = elementCreate('article', 'section carousel item');
    let sectionCardFlip = elementCreate('section', 'card-flip');
    let sectionCardFlipInner= elementCreate('section', 'card-flip-inner');
    let sectionCardFlipBack = elementCreate('section', "card-flip-back");
    article.append(sectionCardFlip);
    sectionCardFlip.append(sectionCardFlipInner);
    sectionCardFlip.append(sectionCardFlipBack);
    sectionCardFlipInner.append(elementCreate('img', 'card-flip-image'));
    sectionCardFlipInner.append(elementCreate('h1', 'card-flip-header'));
    sectionCardFlipBack.append(elementCreate('h2', 'card-flip-header'));
    sectionCardFlipBack.append(elementCreate('article', 'card-flip-text'));
    carousel.append(article);
}

function elementCreate(typeOfElement, classList) {
    let ele = document.createElement(typeOfElement);
    ele = addClass(classList, ele);
    return ele;
}


function addClass(str, article) {
    var arr = str.split(' ');
    arr.forEach(element => {
        article.classList.add(element);
    });
    return article;
}