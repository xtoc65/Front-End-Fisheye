//Mettre le code JavaScript lié à la page photographer.html
 
//on met un eventment au click pour trié en fonction de la popularité, de la date et du titre
const $trie = document.getElementById("trie");
const liste = document.querySelector(".dropdown-options");

$trie.addEventListener('click', () => {
    liste.style.display = "block";
});

const $close = document.getElementById("popu");
$close.addEventListener('click', () =>{
    liste.style.display = "none";
})