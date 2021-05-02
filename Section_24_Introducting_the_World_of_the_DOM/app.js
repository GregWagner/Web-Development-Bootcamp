const input = document.querySelector('input');
const heading = document.querySelector('h1');

input.addEventListener('input', (evt) => {
  if (input.value == '') {
    heading.innerText = 'Enter Your Username';
  } else {
    heading.innerText = `Welcome ${input.value}`;
  }
});
