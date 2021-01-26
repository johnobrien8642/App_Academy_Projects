document.addEventListener("DOMContentLoaded", () => {
  // toggling restaurants

  const toggleLi = (e) => {
    const li = e.target;
    if (li.className === "visited") {
      li.className = "";
    } else {
      li.className = "visited";
    }
  };

  document.querySelectorAll("#restaurants li").forEach((li) => {
    li.addEventListener("click", toggleLi);
  });



  // adding SF places as list items

  // --- your code here!
  
  const addNewPlace = function (e) {
    e.preventDefault()

    const ul = document.querySelector('#sf-places');
    const query = document.querySelector('.favorite-input');
    const li = document.createElement('li');
    li.textContent = query.value;
    ul.appendChild(li);
    query.value = '';
  }

  const submit = document.querySelector('.favorite-submit')
  submit.addEventListener('click', addNewPlace)



  // adding new photos

  // --- your code here!
  const togglePhotoForm = function (e) {
    e.preventDefault();
    const form = document.querySelector('.photo-form-container')

    let classes = form.classList
    if (classes.contains('hidden')) {
      classes.remove('hidden')
    } else {
      classes.add('hidden')
    }
  }

  const expandFormButton = document.querySelector('.photo-show-button')
  expandFormButton.addEventListener('click', togglePhotoForm);

  
  const addNewPhoto = function (e) {
    e.preventDefault();

    const li = document.createElement('li')
    const img = document.createElement('img')
    const imgUrl = document.querySelector('.photo-url-input')
    const ul = document.querySelector('.dog-photos')

    img.setAttribute('src', imgUrl.value)
    li.appendChild(img)
    ul.appendChild(li)
    imgUrl.value = "";
  }

  const submitPhoto = document.querySelector('.photo-url-submit')
  submitPhoto.addEventListener('click', addNewPhoto)
});
