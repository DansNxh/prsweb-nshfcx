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

const starCount = 200; // bisa kamu ubah (lebih banyak = lebih rame)

for(let i = 0; i < starCount; i++){

    const star = document.createElement("div");

    star.classList.add("star");

    const size = Math.random() * 5; // ukuran bintang
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