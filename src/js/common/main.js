'use strict'

const FORM = document.getElementById('form');
const FORM_SUBMIT = document.getElementById('submit')

const inputImg = document.getElementById('image');
const output = document.getElementById('file-image');
const clearForm = document.getElementById('clear');

if (inputImg && output && clearForm) {
  let outChildren = output.children;

  inputImg.addEventListener('change', () => {
    let img = document.createElement('img');
    img.src = URL.createObjectURL(inputImg.files[0]);

    if(outChildren.length > 0) output.removeChild(outChildren[0]);
    output.appendChild(img);
  })

  clearForm.addEventListener('click', () => {
    for (let i = (outChildren.length - 1); i >= 0; i--) {
      output.removeChild(output.children[i]);
    }
  })
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  FORM.submit();
})

