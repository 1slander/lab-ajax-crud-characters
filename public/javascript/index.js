
const charactersAPI = new APIHandler('http://localhost:8000');

//We have to do same operation twice, so I created a function.
const characterInfo = (characterData)=>{
  document.querySelector('.characters-container').innerHTML += 
  `
  <div class="character-info">
        <div class="id">Id: <span>${characterData.id}</span></div>
        <div class="name">Name: <span>${characterData.name}</span></div>
        <div class="occupation">Occupation: <span>${characterData.occupation}</span></div>
        <div class="cartoon">Is a Cartoon?: <span>${characterData.cartoon}</span></div>
        <div class="weapon">Weapon: <span>${characterData.weapon}</span></div>
      </div>
  `
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    try {
      const response =  await charactersAPI.getFullList();
      const characters = await response.data
      //Hide the default container
      const hideDiv = document.querySelector('.character-info');
      console.log(hideDiv)

      hideDiv.style.display = "none"

      //Create a container for each character
      characters.forEach(character => {
        characterInfo(character);
        
      });

    } catch (error) {
      console.log(error)
    }

  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    //Get input value
    const getId = document.querySelector('.operation input').value;
    console.log(getId)
    try {
      const res = await charactersAPI.getOneRegister(getId);
      const character = await res.data;
      console.log(character)
      const hideDiv = document.querySelector('.character-info');
      hideDiv.style.display = "none"
      characterInfo(character);
    } catch (error) {
      console.log(error)
    }
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    //get input value
    const getId = document.querySelector('.delete input').value;
    console.log(getId)
    try {
      const res = await charactersAPI.deleteOneRegister(getId);
      const btnDelete = document.querySelector('#delete-one')
      console.log(btnDelete)
      btnDelete.style.backgroundColor = 'green'

      
    } catch (error) {
      console.log(error)
      const btnDelete = document.querySelector('#delete-one')
      btnDelete.style.backgroundColor = 'red'
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
     //Prevent refresh
    event.preventDefault();
    //Get Id from value
    const editCharacterId = document.querySelector('#edit-character-form input[name=chr-id]').value
    //Get all data
    const editCharacterInfo = {
      name: document.querySelector('#edit-character-form input[name=name]').value,
      occupation:document.querySelector('#edit-character-form input[name=occupation]').value,
      weapon:document.querySelector('#edit-character-form input[name=weapon]').value,
      cartoon:document.querySelector
      ('#edit-character-form input[name=cartoon]').checked,
    }
    console.log(editCharacterInfo)
    try {
      const res = await charactersAPI.updateOneRegister(editCharacterId, editCharacterInfo);
      document.querySelector('#edit-character-form button').style.backgroundColor = 'green'
    } catch (error) {
      document.querySelector('#edit-character-form button').style.backgroundColor = 'red'
    }
    

  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    //Prevent refresh
    event.preventDefault();

    const newCharacter = {
      name: document.querySelector('#new-character-form input[name=name]').value,
      occupation:document.querySelector('#new-character-form input[name=occupation]').value,
      weapon:document.querySelector('#new-character-form input[name=weapon]').value,
      cartoon:document.querySelector
      ('#new-character-form input[name=cartoon]').checked,
    }
    console.log(newCharacter)
    try {
      const res = await charactersAPI.createOneRegister(newCharacter);
      document.querySelector('#send-data').style.backgroundColor = 'green'
    } catch (error) {
      document.querySelector('#send-data').style.backgroundColor = 'red'
    }


  });
});
