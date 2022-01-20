// console.log("%c HI", "color: firebrick");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

fetch(imgUrl)
  .then((resp) => resp.json())
  .then((data) => {
    const imagesArry = data.message;
    const imageContainer = document.getElementById("dog-image-container");

    imagesArry.forEach((image) => {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      // imageElement.setAttribute("src", image);
      imageContainer.append(imageElement);
      //imageContainer.appendChild(imageElement);
    });
  });

fetch(breedUrl)
  .then((resp) => resp.json())
  .then((data) => {
    const breedObj = data.message;
    // const breedObj = data["message"];
    const arryOfBreeds = Object.keys(breedObj);
    const breedList = document.getElementById("dog-breeds");

    function addBreedLisToUl(arry) {
      arry.forEach((breed) => {
        const newLi = document.createElement("li");
        newLi.innerText = breed;
        breedList.appendChild(newLi);

        newLi.addEventListener("click", function (event) {
          event.target.style.color = "blue";
          newLi.style.float = "right";
        });
      });
    }
    addBreedLisToUl(arryOfBreeds);

    const dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener("change", (event) => {
      const selectedBreeds = arryOfBreeds.filter(
        (breed) => breed.substring(0, 1) === event.target.value
      );

      while (breedList.firstChild) {
        breedList.removeChild(breedList.firstChild);
      }

      addBreedLisToUl(selectedBreeds);
    });
  });
