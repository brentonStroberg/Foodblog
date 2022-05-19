function onloadHome(){
    loadCarouselRecentPost();
}

function loadCarouselRecentPost(){
    addCarouselObject('favourite')
}

function addCarouselObject(carouselID){
    let carousel = document.getElementById(carouselID);
    let article = document.createElement("article");
    article = addClass('section carousel item', article);
    article.id ="tempRecentPostID";

    let sectionCardFlip = document.createElement("section");
    sectionCardFlip = addClass('section carousel item', sectionCardFlip);
    article.append(sectionCardFlip);

    let section_card_flip_inner = document.createElement("section");
    section_card_flip_inner = addClass('section carousel item', section_card_flip_inner);
    sectionCardFlip.append(section_card_flip_inner);
    
    let section_card_flip_front  = document.createElement("section");
    section_card_flip_front = addClass('section carousel item', section_card_flip_front);
    section_card_flip_inner.append(section_card_flip_front);
    
    let img_front_image  = document.createElement("img");
    img_front_image = addClass('section carousel item', img_front_image);
    section_card_flip_front.append(img_front_image);

    let h1_card_flip_header  = document.createElement("h1");
    h1_card_flip_header = addClass('section carousel item', h1_card_flip_header);
    section_card_flip_front.append(h1_card_flip_header);

    let section_card_flip_back  = document.createElement("section");
    section_card_flip_back = addClass('section carousel item', section_card_flip_back);
    section_card_flip_inner.append(section_card_flip_back);
    
    let h2_card_flip_header  = document.createElement("h1");
    h2_card_flip_header = addClass('section carousel item', h2_card_flip_header);
    section_card_flip_back.append(h2_card_flip_header);

    let article_card_flip_text = document.createElement("article");
    article_card_flip_text = addClass('section carousel item', article_card_flip_text);
    section_card_flip_back.append(article_card_flip_text);
    
    carousel.append(article);
}

function addClass(str, article){
    var arr = str.split(' ');
    arr.forEach(element => {
        article.classList.add(element);
    });
    return article;
}