const imagesWrapper = document.querySelector(".slide-wrapper");
const images = document.querySelectorAll(".image");
const width = images[0].clientWidth + 25; //25 is gap taken from .slider
const texts = document.querySelectorAll("text")
const circles = document.querySelector(".circle");
let i = 0;
let counter = 1;
let isEnabled = true;