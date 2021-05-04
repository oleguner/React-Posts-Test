export function message() {
  window.onload = () => {
    function alignText() {
      const text = document.getElementById('header__message');
      const place = (window.localStorage.posts && ' localstorage')
        || ' jsonplaceholder.com';
      text.textContent = 'Posts were loaded from ' + place;
      text.style.position = 'absolute';
      text.style.fontSize = '25px';
      text.style.color = '#FFF';
      text.style.left = `calc(50% - ${text.offsetWidth}px / 2)`;
      text.style.top = '73%';
      text.style.opacity = '1';
      text.style.transition = 'top 5s ease-out 0.5s,'
        + 'opacity 5s ease-out 0.5s';

      setTimeout(() => {
        text.style.top = '-10%';
        text.style.opacity = '0';
      }, 2000);

      setTimeout(() => {
        text.remove();
      }, 7000);
    };
    alignText();
  };
};