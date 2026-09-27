const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll(".card").forEach(el => {
    observer.observe(el);
});



document.querySelectorAll(".typeEffect").forEach(element => {

    const text = element.textContent.trim();

    let index = 0;
    let deleting = false;

    element.textContent = "";

    function animate() {

        if (!deleting) {

            element.textContent = text.substring(0, index + 1);
            index++;

            if (index === text.length) {
                deleting = true;
                setTimeout(animate, 1500);
                return;
            }

            setTimeout(animate, 80);

        } else {

            element.textContent = text.substring(0, index - 1);
            index--;

            if (index === 0) {
                deleting = false;
                setTimeout(animate, 500);
                return;
            }

            setTimeout(animate, 40);
        }
    }

    animate();

});

const starsContainer = document.querySelector(".stars");

if (starsContainer){
    const starCount = 200; // bisa kamu ubah (lebih banyak = lebih rame)

    for(let i = 0; i < starCount; i++){

        const star = document.createElement("div");

        star.classList.add("star");

        const size = Math.random() * 6; // ukuran bintang
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;

        const duration = 3 + Math.random() * 5;

        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = posX + "px";
        star.style.top = posY + "px";
        star.style.animationDuration = duration + "s";

        starsContainer.appendChild(star);
    }
}

(function(){
  const KEY = "wifies";
  const SHIFT = 3;

  function isAlpha(ch){ return /[A-Za-z]/.test(ch); }

  function caesar(text, shift){
    let out = "";
    for (const ch of text){
      if (isAlpha(ch)){
        const base = /[A-Z]/.test(ch) ? 65 : 97;
        const code = ((ch.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base;
        out += String.fromCharCode(code);
      } else {
        out += ch;
      }
    }
    return out;
  }

  function vigenere(text, key, decrypt){
    key = key.toLowerCase();
    let out = "";
    let j = 0;
    for (const ch of text){
      if (isAlpha(ch)){
        const base = /[A-Z]/.test(ch) ? 65 : 97;
        let k = key.charCodeAt(j % key.length) - 97;
        if (decrypt) k = -k;
        const code = ((ch.charCodeAt(0) - base + k) % 26 + 26) % 26 + base;
        out += String.fromCharCode(code);
        j++;
      } else {
        out += ch;
      }
    }
    return out;
  }

  function textToHex(str){
    const bytes = new TextEncoder().encode(str);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  function hexToText(hex){
    const cleaned = hex.replace(/\s+/g, "");
    if (cleaned.length === 0 || cleaned.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(cleaned)){
      throw new Error("invalid hex");
    }
    const bytes = new Uint8Array(cleaned.match(/.{2}/g).map(b => parseInt(b, 16)));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  }

  function encode(text){
    const step1 = caesar(text, SHIFT);
    const step2 = vigenere(step1, KEY, false);
    return textToHex(step2);
  }

  function decode(hexText){
    const step1 = hexToText(hexText);
    const step2 = vigenere(step1, KEY, true);
    return caesar(step2, -SHIFT);
  }

  const form = document.getElementById("secretForm");
  if (!form) return;

  const input = document.getElementById("inputField");
  const output = document.getElementById("outputBox");
  const mode = form.dataset.mode === "decode" ? "decode" : "encode";

  function resetOutput(){
    output.textContent = mode === "encode"
      ? "The converted message will appear here"
      : "The decoded message will appear here";
    output.classList.remove("errorText");
  }

  function showOutput(text){
    output.textContent = text;
    output.classList.remove("errorText");
  }

  function showError(msg){
    output.textContent = msg;
    output.classList.add("errorText");
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const value = input.value.trim();

    if (!value){
      showError(mode === "encode" ? "No buddy, that can't work" : "They wouldn’t send you an empty message anyway.");
      return;
    }

    if (mode === "encode"){
      showOutput(encode(value));
    } else {
      try {
        showOutput(decode(value));
      } catch (err){
        showError("Nope. Their message can’t be wrong.");
      }
    }
  });

  resetOutput();
})();
