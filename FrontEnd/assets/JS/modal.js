const logout = document.querySelector("header nav .logout");
const portfolio = document.getElementById("portfolio");
const portfolioTitle = document.querySelector("#portfolio h2");
const adminTitle = "Mode édition";
const adminTitleLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const admin = `<div class="admin-mod"><p>${adminTitleLogo}${adminTitle}</p></div>`;
const divEdit = document.createElement("div");
const spanEdit = document.createElement("span");

//si l'utilisateur est connecté
if (window.localStorage.getItem("token")) {
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    localStorage.clear();
  });
  document.body.insertAdjacentHTML("afterbegin", admin);
  spanEdit.innerHTML = adminTitleLogo + " Modifier";
  divEdit.classList.add("div-edit");
  divEdit.appendChild(portfolioTitle);
  divEdit.appendChild(spanEdit);
  portfolio.prepend(divEdit);
  filters.style.display = "none";

  const edition = document.querySelector(".div-edit span");
  const modalContent = document.querySelector(".modal");
  const xmark = document.querySelector(".modal .fa-xmark");
  const divModal = document.createElement("div");
  const modalPictH2 = document.querySelector(".modal__pictures h2");

  divModal.classList.add("galleryModal");
  modalPictH2.insertAdjacentElement("afterend", divModal);
  const galleryModal = document.querySelector(".galleryModal");

  function affichageWorksModal() {
    galleryModal.innerHTML = "";

    function createWorkModal(work) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const spanModal = document.createElement("span");
      const bin = document.createElement("i");
      bin.classList.add("fa-solid", "fa-trash-can");
      bin.id = work.id;
      img.src = work.imageUrl;
      spanModal.appendChild(bin);
      figure.appendChild(spanModal);
      figure.appendChild(img);
      galleryModal.appendChild(figure);
    }

    async function worksModal() {
      const arrayWorksModal = await recupWorks();
      arrayWorksModal.forEach((work) => {
        createWorkModal(work);
      });
      deleteWork();
    }
    worksModal();
  }

  function modal() {
    edition.addEventListener("click", () => {
      modalContent.style.display = "flex";
      affichageWorksModal();
    });
    xmark.addEventListener("click", () => {
      modalContent.style.display = "none";
    });
    modalContent.addEventListener("click", (e) => {
      if (e.target.className == "modal") {
        modalContent.style.display = "none";
      }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key == "Escape" || e.key == "Esc") {
        modalContent.style.display = "none";
      }
    });
  }
  modal();

  //Suppression d'un projet
  function deleteWork() {
    const token = localStorage.token;
    const allBin = document.querySelectorAll(".galleryModal .fa-trash-can");

    allBin.forEach((bin) => {
      bin.addEventListener("click", () => {
        const id = bin.id;
        const response = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(`http://localhost:5678/api/works/${id}`, response);
      });
    });
  }

  function secondeModal() {
    //Création de la partie HTML de la seconde modal
    const titleH2 = document.createElement("h2");
    const spanBack = document.createElement("span");
    const spanClose = document.createElement("span");
    const formModal2 = document.createElement("form");
    const divForm = document.createElement("div");
    const secondDiv = document.createElement("div");
    const divFile = document.createElement("div");
    const labelFile = document.createElement("label");
    const inputFile = document.createElement("input");
    const preview = document.createElement("img");
    const pWarning = document.createElement("p");
    const messageNeed = document.createElement("p");
    const messageErrorImg = document.createElement("p");
    const messageErrorFiles = document.createElement("p");

    secondDiv.classList.add("modal__pictures--add");
    divForm.classList.add("div__form");
    spanBack.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    spanClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    divFile.innerHTML = '<i class="fa-regular fa-image"></i>';
    titleH2.textContent = "Ajout photo";
    divFile.classList.add("imageSelect");
    labelFile.setAttribute("for", "file");
    labelFile.textContent = "+ Ajouter photo";
    inputFile.id = "file";
    inputFile.type = "file";
    inputFile.name = "image";
    preview.src = "#";
    preview.alt = "Aperçu de l'image";
    pWarning.textContent = "jpg, png : 4mo max";
    messageNeed.classList.add("need");
    messageNeed.textContent = "Vérifier que tous les champs soient remplis";
    messageErrorImg.classList.add("errorImg");
    messageErrorImg.textContent =
      "Le format de l'image est incorrect ou sa taille est supérieur à 4Mo";
    messageErrorFiles.classList.add("noFiles");
    messageErrorFiles.textContent = "Tous les champs n'ont pas été remplis";

    secondDiv.appendChild(titleH2);
    secondDiv.appendChild(spanBack);
    secondDiv.appendChild(spanClose);
    secondDiv.appendChild(formModal2);
    modalContent.appendChild(secondDiv);
    formModal2.appendChild(divForm);
    divForm.appendChild(divFile);
    divFile.appendChild(labelFile);
    divFile.appendChild(inputFile);
    divFile.appendChild(preview);
    divFile.appendChild(pWarning);

    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    const labelCategory = document.createElement("label");
    const selectCategory = document.createElement("select");
    const messageCategory = document.createElement("option");
    const divButton = document.createElement("div");
    const buttonValid = document.createElement("button");

    labelTitle.setAttribute("for", "title");
    labelTitle.textContent = "Titre";
    inputTitle.id = "title";
    inputTitle.type = "text";
    inputTitle.name = "title";
    labelCategory.setAttribute("for", "category");
    labelCategory.textContent = "Catégorie";
    selectCategory.id = "category";
    selectCategory.name = "category";
    messageCategory.value = "0";
    messageCategory.textContent = "Veuillez sélectionner une catégorie";
    divButton.classList.add("contentButton");
    buttonValid.disabled = true;
    buttonValid.textContent = "Valider";

    divForm.appendChild(labelTitle);
    divForm.appendChild(inputTitle);
    divForm.appendChild(labelCategory);
    selectCategory.appendChild(messageCategory);
    divForm.appendChild(selectCategory);
    formModal2.appendChild(divButton);
    divButton.appendChild(buttonValid);
    buttonValid.insertAdjacentElement("afterend", messageNeed);


    //Affichage de la seconde modal au clic du boutton "Ajouter une photo" de la première modal
    const modalAddPicture = document.querySelector(".modal button");
    const backArrow = document.querySelector(
      ".modal__pictures--add .fa-arrow-left"
    );
    const modalFirst = document.querySelector(".modal__pictures");
    const modalSecond = document.querySelector(".modal__pictures--add");
    const xmarkSecond = document.querySelector(
      ".modal__pictures--add .fa-xmark"
    );
    const previewImg = document.querySelector(".imageSelect img");

    function displaySecondModal() {
      modalAddPicture.addEventListener("click", () => {
        modalSecond.style.display = "flex";
        modalFirst.style.display = "none";
      });

      backArrow.addEventListener("click", () => {
        previewImg.src = "#";
        modalSecond.style.display = "none";
        modalFirst.style.display = "flex";
        divForm.insertAdjacentElement("afterend", messageErrorImg).remove();
        buttonValid.classList.remove("valid");
        buttonValid.disabled = true;
        divForm.insertAdjacentElement('afterend', messageErrorFiles).remove()
        resetModalClosed();
      });

      xmarkSecond.addEventListener("click", () => {
        previewImg.src = "#";
        modalSecond.style.display = "none";
        modalFirst.style.display = "flex";
        modalContent.style.display = "none";
        divForm.insertAdjacentElement("afterend", messageErrorImg).remove();
        buttonValid.classList.remove("valid");
        buttonValid.disabled = true;
        divForm.insertAdjacentElement('afterend', messageErrorFiles).remove()
        resetModalClosed();
      });

      modalContent.addEventListener("click", (e) => {
        if (e.target.className == "modal") {
          previewImg.src = "#";
          modalSecond.style.display = "none";
          modalFirst.style.display = "flex";
          modalContent.style.display = "none";
          divForm.insertAdjacentElement("afterend", messageErrorImg).remove();
          buttonValid.classList.remove("valid");
          buttonValid.disabled = true;
          divForm.insertAdjacentElement('afterend', messageErrorFiles).remove()
          resetModalClosed();
        }
      });

      window.addEventListener("keydown", function (e) {
        if (e.key == "Escape" || e.key == "Esc") {
          previewImg.src = "#";
          modalSecond.style.display = "none";
          modalFirst.style.display = "flex";
          modalContent.style.display = "none";
          divForm.insertAdjacentElement("afterend", messageErrorImg).remove();
          buttonValid.classList.remove("valid");
          buttonValid.disabled = true;
          divForm.insertAdjacentElement('afterend', messageErrorFiles).remove()
          resetModalClosed();
        }
      });
    }

    function resetModalClosed() {
      const form = document.querySelector(".modal__pictures--add form");
      form.reset();
      previewImg.style.display = "none";
      labelFile.style.display = "flex";
      iconFile.style.display = "flex";
      pWarning.style.display = "flex";
    }
    displaySecondModal();

    //Preview de l'image
    const iconFile = document.querySelector(".imageSelect .fa-image");

    function previewOfImage() {
      inputFile.addEventListener("change", () => {
        const imgSelect = document.querySelector(".imageSelect");
        const file = inputFile.files[0];
        if (file) {
          const fileSize = file.size;
          const fileType = file["type"];
          const validImageTypes = ["image/jpeg", "image/png"];

          if (
            fileSize > 4 * 1024 * 1024 ||
            !validImageTypes.includes(fileType)
          ) {
            imgSelect.insertAdjacentElement("afterend", messageErrorImg);
            inputFile.value = "";
            buttonValid.classList.remove("valid");
            buttonValid.disabled = true;
            return;
          } else {
            divForm.insertAdjacentElement("afterend", messageErrorImg).remove();
            const reader = new FileReader();
            reader.onload = (e) => {
              previewImg.src = e.target.result;
              previewImg.style.display = "flex";
              labelFile.style.display = "none";
              iconFile.style.display = "none";
              pWarning.style.display = "none";
            };
            reader.readAsDataURL(file);
          }
        }
        previewImg.addEventListener("click", () => {
          inputFile.click();
        });
      });
    }
    previewOfImage();

    // Création de la liste des catégories dans l'input select
    async function displayCatModal() {
      const cat = await recupCat();
      cat.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        selectCategory.appendChild(option);
      });
    }
    displayCatModal();

    function buttonValidAddWork() {
      divForm.addEventListener("input", () => {
        if (file.value !== "" && title.value !== "" && category.value !== "0") {
          buttonValid.classList.add("valid");
          buttonValid.disabled = false;
        } else {
          buttonValid.classList.remove("valid");
          buttonValid.disabled = true;
        }
      });
    }
    buttonValidAddWork();

    function addWork() {
      formModal2.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (title.value === "" || category.value === "0" || file.value === "") {
          divForm.insertAdjacentElement('afterend', messageErrorFiles)
          return
        }

        const token = localStorage.token;

        const formData = new FormData();
        formData.append("image", inputFile.files[0]);
        formData.append("title", title.value);
        formData.append("category", category.value);

        const response = {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };

        await fetch("http://localhost:5678/api/works/", response);
      });
    }
    addWork();
  }
  secondeModal();
}