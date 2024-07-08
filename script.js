// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2404-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.querySelector("#close-modal");
const form = document.querySelector("#new-player-form");

modal.addEventListener("click", function (e) {
  // closes modal when you click outside the content area of the modal
  console.log(e.target.classList);
  if (!e.target.classList.contains("modal-content")) {
    modal.classList.remove("modal-open");
    modalContent.classList.remove("modal-content-open");
    modalContent.innerHTML = "";
  }
});

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    /* Remember, if you're using the modal, when you create the details button,
    in th event handler, create functionality that adds the class 'modal-open' to the modal var and 'modal-content-open' to the
    modalContent var */
    const res = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players`
    );
    const json = await res.json();
    console.log(json);
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const res = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players/${playerId}`
    );
    const json = await res.json();
    console.log(json);
    return json.data;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const res = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players",
      {
        method: "POST",
        body: JSON.stringify(playerObj),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    // const json = await res.json();
    // init();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const res = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players/${playerId}`,
      { method: "Delete" }
    );

    console.log(res);
    if (res.status === 204) {
      alert("deleted successfully");
    }
    form.innerHTML = "";
    init();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  // when you add a event handler to the buttons, you need to pass an id of the player
  // to the function renderSinglePlayer or removePlayer
  /*
     ...your code(player=>{
      // more code...
        deleteButton.addEventListener("click", function(){
          removePlayer(player.id);
        })
      })
 */

  const playerListMap = playerList.map((player) => {
    const container = document.createElement("div");
    const paragraph = document.createElement("p");
    const image = document.createElement("img");

    paragraph.innerText = `${player.id} ${player.name} `;
    image.src = player.imageUrl;

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "See Details";
    detailsBtn.addEventListener("click", function () {
      renderSinglePlayer(player);
    });
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove from roster";
    removeBtn.addEventListener("click", function () {
      removePlayer(player.id);
    });
    container.appendChild(image);
    container.appendChild(paragraph);
    container.appendChild(detailsBtn);
    container.appendChild(removeBtn);
    return container;
  });
  document.querySelector("main").replaceChildren(...playerListMap);
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO

  const container = document.createElement("div");
  const modalContent = document.querySelector(".modal-content");
  const modal = document.querySelector(".modal");
  //   containerContent.innerHTML = "";
  modalContent.appendChild(container);
  const image = document.createElement("img");
  image.src = player.imageUrl;
  const paragraph = document.createElement("p");
  paragraph.innerText = `${player.name} ${player.id} ${player.breed}`;
  container.appendChild(image);
  container.appendChild(paragraph);
  modal.classList.add("modal-open");
  modalContent.classList.add("modal-content-open");
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    form.innerHTML = "";
    const labelName = document.createElement("label");
    labelName.textContent = "Name:";
    const inputName = document.createElement("input");

    const labelBreed = document.createElement("label");
    labelBreed.textContent = "Breed:";
    const inputBreed = document.createElement("input");

    const labelId = document.createElement("label");
    labelId.textContent = "Id:";
    const inputId = document.createElement("input");

    const formBtn = document.createElement("button");
    formBtn.textContent = "Submit";
    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelBreed);
    form.appendChild(inputBreed);
    form.appendChild(labelId);
    form.appendChild(inputId);
    form.appendChild(formBtn);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.innerHTML = "";
      const newPlayer = {
        name: inputName.value,
        breed: inputBreed.value,
        id: inputId.value,
      };
      console.log(newPlayer);
      addNewPlayer(newPlayer);

      fetchAllPlayers();
      renderAllPlayers();
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
