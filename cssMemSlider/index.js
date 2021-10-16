const imagesWrapper = document.querySelector('.image-wrapper');
const images = document.getElementsByClassName('image');
const width = images[0].clientWidth + 25; //25 is gap taken from .slider
const texts = document.querySelectorAll('.text');
const buttons = document.querySelectorAll('.button');
const circles = document.querySelectorAll('.circle');
let counter = 0;
let isEnabled = true;

const slide = (e) => {
    const index = getCircleIndex(e.target)
    const activeIndex = getActiveCircleIndex();
    if(index == activeIndex){
        isEnabled = true;
        return
    }
	if (isEnabled) {
		//check circle's index in order to slide left ot right
        
	     if (index < activeIndex) {
			imagesWrapper.style.transition = '.6s';
			counter --;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(index);
            showText(index);
		} else if(index > activeIndex) {
			imagesWrapper.style.transition = '.6s';
			counter ++;
			imagesWrapper.style.transform = `translateX(${-width * index}px)`;
			activeCircle(index);
            showText(index);
		}
	}
	isEnabled = false;
};

buttons.forEach((button) => {
	button.addEventListener('click', slide);
    
});

imagesWrapper.addEventListener('transitionend', () => {
    isEnabled = true;
    if (counter > images.length - 1) {
		counter  = 0;
	} else if (counter < 0) {
		counter = images.length - 1;
	}
});

function activeCircle(n) {
	for (let circle of circles) {
		circle.classList.remove('active-circle');
	}
	if (n > buttons.length - 1) {
		n = 0;
	} else if (n < 0) {
		n = buttons.length - 1;
	}
	circles[n].classList.add('active-circle');
}

function showText(n){
    for(let text of texts){
        text.classList.remove('show');
        text.classList.add('hide');
    }
    if (n > texts.length - 1) {
		n = 0;
	} else if (n < 0) {
		n = texts.length - 1;
	}
    texts[n].classList.remove('hide');
	texts[n].classList.add('show');
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

//get active button in order to go left or right
const getActiveCircleIndex = function () {
       for (let i = 0; i < circles.length; i++) {
           if (circles[i].classList.contains('active-circle')) {
               return i;
           }
       }
       return -1;
   }
