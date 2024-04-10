async function getPhotographers() {
    //on ajoute le json
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
  
    const photographers = data.photographers;
    console.log(photographers);
  
    return { photographers };
  }
  //on va chercher la class pour mettre les données de photograpger.js
  async function displayData(photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
  
  async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  }
  
  init();
