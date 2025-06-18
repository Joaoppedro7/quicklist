//Selecionando os elementos do formulário
const inputNewItem = document.getElementById("new-item");
const form = document.querySelector("form");
const productList = document.querySelector("ul");
const alertFooter = document.querySelector("footer");
const removeAlert = document.querySelector(".remove-alert");
const productRemoved = document.querySelector(".removed");
const btnRemoveSelected = document.querySelector(".btn-remove-selected");
const itemsSelected = document.getElementById("items-selected");

inputNewItem.addEventListener("input", () => {
  // Remove os números digitados no INPUT
  const hasNumberRegex = /\d+/g;

  inputNewItem.value = inputNewItem.value.replace(hasNumberRegex, "");
});

const removeItemToList = (event) => {
  // Obtém o elemento clicado e procura pela LI mais próxima
  const item = event.target.closest("li");

  const itemList = item.querySelector(".productName");
  const productName = itemList.textContent;
  const productRemoved = document.querySelector(".removed");

  item.remove();
  showAlert();

  productRemoved.textContent = `${productName} foi removido da lista`;
};

//Exibe o alerta em tela.
const showAlert = () => {
  alertFooter.classList.add("show-alert");
};

//Esconde o alerta da tela.
const closeAlert = () => {
  alertFooter.classList.remove("show-alert");
};

//Remove o alerta da tela ao clicar no X do footer.
removeAlert.onclick = () => closeAlert();

// Cria um novo item para a lista .
const createProduct = (productName) => {
  if (inputNewItem.value) {
    const list = document.querySelector("ul");

    const listItem = document.createElement("li");
    listItem.classList.add("list-item");

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-inner");

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-image");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.setAttribute("name", "select-remove");
    inputCheckbox.setAttribute("id", formatText(productName));

    const newProductName = document.createElement("label");
    newProductName.setAttribute("for", formatText(productName));
    newProductName.textContent = productName;
    newProductName.classList.add("productName");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("aria-label", "Remover item da lista");
    deleteButton.classList.add("trash");
    deleteButton.onclick = () => removeItemToList;

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "imgs/icons/trash.svg";
    deleteIcon.setAttribute("alt", "Ícone de uma lixeira");

    itemContainer.append(checkboxWrapper, inputCheckbox, newProductName);
    deleteButton.appendChild(deleteIcon);
    listItem.append(itemContainer, deleteButton);

    return listItem;
  }
};

// Evento submit do formulário para adicionar itens a lista.
form.onsubmit = (event) => {
  event.preventDefault();

  const itemName = inputNewItem.value.trim();

  const newItem = createProduct(itemName);
  productList.prepend(newItem);
  inputNewItem.value = "";

  closeAlert();
};

//Remove o item da lista quando clicado no ícone da lixeira
productList.onclick = (event) => {
  if (event.target.closest(".trash")) {
    removeItemToList(event);
  }
};

// Formata o texto para inserir no id dos novos inputs
const formatText = (content) => {
  return content
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");
};

// Verifica se mais de um input foi checkado para remover os itens selecionados
const showCheckList = () => {
  productList.onchange = () => {
    const inputsChecked = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    if (inputsChecked.length > 1) {
      itemsSelected.classList.remove("hidden");
      closeAlert();
    } else {
      itemsSelected.classList.add("hidden");
    }

    btnRemoveSelected.onclick = () => {
      inputsChecked.forEach((cb) => {
        const itemChecked = cb.closest("li");

        itemChecked.remove();

      });
      
      itemsSelected.classList.add("hidden");
      productRemoved.textContent = "Os itens foram removidos da lista";
      showAlert();
    };
  };
};

showCheckList();
