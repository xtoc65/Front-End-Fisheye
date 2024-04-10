function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        //on ajoute un article
        const article = document.createElement( 'article' );
        //on ajoute une image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        //on ajoute le nom avec un h1
        const h1 = document.createElement( 'h1' );
        h1.textContent = name;
        //on ajoute la ville + le pays avec un h3
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + "," + country;
        //on ajoute le slogan avec un p
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        //on ajoute le prix avec un h5
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h1);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}