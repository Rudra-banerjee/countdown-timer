let countDownTime = new Date("Nov 28, 2021 00:00:00").getTime();

let quoteText = document.getElementById("quote-text");
let quoteAuthor = document.getElementById("quote-author");

function durgaPujo() {
  let nowTime = new Date().getTime();
  let diff = countDownTime - nowTime;

  let sec = 1000;
  let min = sec * 60;
  let hr = min * 60;
  let day = hr * 24;

  let d = Math.floor(diff / day);
  // console.log(d);
  let h = Math.floor((diff % day) / hr);
  // console.log(h);
  let m = Math.floor((diff % hr) / min);
  // console.log(m);
  let s = Math.floor((diff % min) / sec);
  // console.log(s);

  document.getElementById("Days").innerText = addZero(d);
  document.getElementById("Hours").innerText = addZero(h);
  document.getElementById("Minutes").innerText = addZero(m);
  document.getElementById("Seconds").innerText = addZero(s);
}

setInterval(function () {
  durgaPujo();
}, 1000);

function addZero(num) {
  if (num < 10) return `0${num}`;
  else return num;
}

function newQuote() {
  if (
    !(
      quoteText.classList.contains("active") &&
      quoteAuthor.classList.contains("active")
    )
  ) {
    quoteText.classList.add("active");
    quoteAuthor.classList.add("active");
  }
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let randomQuoteNumber = Math.floor(Math.random() * data.length + 1);
      quoteText.innerText = data[randomQuoteNumber].text;
      quoteAuthor.innerText =
        data[randomQuoteNumber].author != null
          ? data[randomQuoteNumber].author
          : "";
    });
}

document.getElementById("new-quote").addEventListener("click", () => {
  newQuote();
});
