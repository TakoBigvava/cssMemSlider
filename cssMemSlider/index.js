const imagesWrapper = document.querySelector(".image-wrapper");
const images = document.getElementsByClassName("image");
const width = images[0].clientWidth + 25; //25 is gap taken from .slider
const texts = document.querySelectorAll("text");
const buttons = document.querySelectorAll(".button");
const circles = document.querySelectorAll(".circle");
let counter = 0;
let isEnabled = true;

const slide = (e) => {
    const index = getCircleIndex(e.target)
    if(index ==counter){
        isEnabled = true;
        return
    }
	if (isEnabled) {
		//check circle's index in order to slide left ot right
        
	     if (index < counter) {
			imagesWrapper.style.transition = ".6s";
			counter --;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(getCircleIndex(e.target));
		} else if(index > counter) {
			imagesWrapper.style.transition = ".6s";
			counter ++;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(getCircleIndex(e.target));
		}
	}
	isEnabled = false;
};

buttons.forEach((button) => {
	button.addEventListener("click", slide);
    
});

imagesWrapper.addEventListener("transitionend", () => {
    isEnabled = true;
    if (counter > images.length - 1) {
		counter  = 0;
	} else if (counter < 0) {
		counter = images.length - 1;
	}
});

function activeCircle(n) {
	for (let circle of circles) {
		circle.classList.remove("active-circle");
	}
	if (n > buttons.length - 1) {
		n = 0;
	} else if (n < 0) {
		n = buttons.length - 1;
	}
	circles[n].classList.add("active-circle");
}

//condition to distinguish if event target was list element or circle span element
const getCircleIndex = function (element) {
     //if event target is button element
    if(element.classList.contains('button')){
        let children = element.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i] == element) {
                return i;
            }
        }
        return -1;
    }
    //if event target is circle element
else {
        let children = element.parentNode.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i] == element.parentNode) {
                return i;
            }
        }
        return -1;
    }
};
