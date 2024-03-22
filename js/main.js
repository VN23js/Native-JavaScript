/*
window.addEventListener('DOMContentLoaded', () => {

	// TABS

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent([i]);
				}
			});
		}
	});

	// TIMER

	const getNextDay = function () {
		const newDay = new Date();
		newDay.setDate(newDay.getDate() + 1);
		newDay.setHours(0, 0, 0, 0);
		return newDay;
	};

	const getTimeRemaining = function (deadline) {
		let days, hours, minutes, seconds;
		let t = deadline.getTime() - new Date();
		if (t <= 0) {
			deadline.setDate(deadline.getDate() + 1);
			t = deadline.getTime() - new Date();
		}
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds
		};
	};

	const getZero = function (num) {
		if (num < 10 && num > 0) {
			return `0${num}`;
		} else return num;
	};

	const setClock = function (selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			interval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(interval);
			}
		}
	};

	setClock('.timer', getNextDay());

	// MODAL

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');
	// modalCloseBtn = document.querySelector('[data-close]') - удалить

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	// modalCloseBtn.addEventListener('click', closeModal); - удалить

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// CLASS

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 95;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {				//- 1 вариант (с шаблонами) 
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	// getResource('http://localhost:3000/menu')                               
	//         .then(data => createCard(data));

	// function createCard(data) {
	//         data.forEach(({img, altimg, title, descr, price}) => {
	//                 const element = document.createElement('div');				//- 2 вариант (без шаблонов)                               

	//                 element.classList.add('menu__item');

	//                 element.innerHTML = `
	//                         <img src=${img} alt=${altimg}>
	//                         <h3 class="menu__item-subtitle">${title}</h3>
	//                         <div class="menu__item-descr">${descr}</div>
	//                         <div class="menu__item-divider"></div>
	//                         <div class="menu__item-price">
	//                                 <div class="menu__item-cost">Цена:</div>
	//                                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
	//                         </div>
	//                 `;

	//                 document.querySelector('.menu .container').append(element);
	//         });
	// }

	// FORMS

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			// statusMessage.textContent = message.loading; - удалить
			// form.append(statusMessage); - удалить
			form.insertAdjacentElement('afterend', statusMessage);

			// const request = new XMLHttpRequest(); - удалить
			// request.open('POST', 'server.php'); - удалить

			// request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); - удалить
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// const object = {}; - удалить
			// formData.forEach(function(value, key) { - удалить
			//         object[key] = value; - удалить
			// }); - удалить
			// const json = JSON.stringify(object); - удалить
			// formData - удалить
			// request.send(json); - удалить

			// fetch('server.php', { - удалить
			//         method: "POST", - удалить
			//         headers: { - удалить
			//                 'Content-type': 'application/json; charset=utf-8' - удалить
			//         }, - удалить
			//         // body: formData - удалить
			//         body: JSON.stringify(object) - удалить
			// }) - удалить
			// JSON.stringify(object)
			postData('http://localhost:3000/requests', json)
				// .then(data => data.text()) - удалить 
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				})

			// request.addEventListener('load', () => { - удалить
			//         if (request.status === 200) { - удалить
			//                 console.log(request.response); - удалить
			//                 showThanksModal(message.success); - удалить
			// statusMessage.textContent = message.success; - удалить
			// setTimeout(() => { - удалить
			// statusMessage.remove(); - удалить
			// }, 2000); - удалить 
			//                 form.reset(); - удалить
			//         } else { - удалить
			//                 showThanksModal(message.failure); - удалить            
			//         } - удалить
			// }); - удалить
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// fetch('https://jsonplaceholder.typicode.com/posts', { - пример удалить
	//         method: "POST", - пример удалить
	//         body: JSON.stringify({name: 'Alex'}), - пример удалить
	//         headers: { - пример удалить
	//                 'Content-type': 'application/json' - пример удалить
	//         } - пример удалить
	// }) - пример удалить
	//         .then(response => response.json()) - пример удалить
	//         .then(json => console.log(json)); - пример удалить 

	// fetch('http://localhost:3000/menu')
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));

	// SLIDER 

	const slides = document.querySelectorAll('.offer__slide'),
		  slider = document.querySelector('.offer__slider'),
		  prev = document.querySelector('.offer__slider-prev'),
		  next = document.querySelector('.offer__slider-next'),
		  total = document.querySelector('#total'),
		  current = document.querySelector('#current'),
		  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		  slidesField = document.querySelector('.offer__slider-inner'),
		  width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;	
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	function currentAddZero() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		  dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, ''); 
	}

	function dotsOpacity() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}
	
	next.addEventListener('click', () => {
						// slice(0, width.length - 2) 
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		currentAddZero();
		// if (slides.length < 10) {
		// 	current.textContent = `0${slideIndex}`;
		// } else {
		// 	current.textContent = slideIndex;
		// }

		dotsOpacity();
		// dots.forEach(dot => dot.style.opacity = '.5');
		// dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		currentAddZero();
		// if (slides.length < 10) {
		// 	current.textContent = `0${slideIndex}`;
		// } else {
		// 	current.textContent = slideIndex;
		// }

		dotsOpacity();
		// dots.forEach(dot => dot.style.opacity = '.5');
		// dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			currentAddZero();
			// if (slides.length < 10) {
			// 	current.textContent = `0${slideIndex}`;
			// } else {
			// 	current.textContent = slideIndex;
			// }	

			dotsOpacity();
			// dots.forEach(dot => dot.style.opacity = '.5');
			// dots[slideIndex - 1].style.opacity = 1;
		});
	});

// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });


	// CALC

	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	} 

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') { 
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});

		// document.querySelector(parentSelector).addEventListener('click', (e) => { - баг удалить
		// 	if (e.target.getAttribute('data-ratio')) { - баг удалить
		// 		ratio = +e.target.getAttribute('data-ratio'); - баг удалить
		// 	} else { - баг удалить
		// 		sex = e.target.getAttribute('id'); - баг удалить
		// 	} - баг удалить

		// 	elements.forEach(elem => { - баг удалить
		// 		elem.classList.remove(activeClass); - баг удалить
		// 	}); - баг удалить

		// 	e.target.classList.add(activeClass); - баг удалить

		// 	calcTotal(); - баг удалить
		// }); - баг удалить
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch(input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});
//////////////////////////////////////////////////////////////////////////////////////////////////// часть натива js потерена

*/
/*

let a =[1,2,3,4,5,6,7,8,9,10]

let b =[]

a.forEach(element => {
    element % 2 !== 0 ? b.push(element) : null;
});
console.log(b);

const numbers = [1, 2, 3, 4, 5];

const allEven = a.every(num => num % 2 === 0);

console.log(allEven); // false, так как не все числа четные
const numbers1 = [1, 2, 3, 4, 5];

const hasEven = numbers1.some(num => num % 2 === 0);

console.log(hasEven); // true, так как в массиве есть хотя бы одно четное число
*/
/*
const { error } = require("jquery");

function Test(user, age) {
  this.user = user;
  this.age = age;
}

const test = new Test("Evan", 23); //наследование контекста
console.log(test);

if (typeof test.user === "undefined" || typeof test.age !== "number") {
  if (typeof test.age !== "undefined") {
    console.log("Не указано возраст");
  }
  console.log("Не указано имя и возраст");
} else {
  console.log(`Добро пожаловать! ${test.user} ${test.age} years`);
}
//Если хотя бы одно из этих условий истинно,
//то выводится сообщение "Не указано имя и возраст". В противном случае выводится сообщение "Добро пожаловать!
let a = [1, 2, 3, 4, 5, 6, 7, 8];

let b = [];
var currentDate = new Date();
var jsonDate = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1, // Добавляем 1, так как в JS месяцы считаются с 0
  day: currentDate.getDate()
};

console.log(jsonDate);
*/

const { isArray } = require("jquery");

/*
function greeting(message) {
  return `Hello ${message}`;
}

const person = { name: "John" };
console.log(greeting.call(person, person.name));

function sum(a, b) {
  return a + b;
}
const number = [2, 3];
console.log(sum.apply(null, number));

let a = [1, 2, 3];

const b = Math.max.apply(Math, a);
console.log(b);
*/

// замыкание:
let user = {
  firstName: "Вася",
  sayHi() {
    console.log(`Прив3333ет, ${this.firstName}!`);
  }
};
// замыкание:

/*
setTimeout(function () {
  user.sayHi(); // Привет, Вася!
}, 1000);

const person = {
  name: "John",
  age: 23,
  greet: function () {
    console.log(`Hello ${this.name} ${this.age} `);
  }
};

const greetFunction = person.greet;
greetFunction(); // Выведет "Hello, my name is undefined"
const boundGreet = person.greet.bind(person);
boundGreet();
*/
////////////////////////////////////////////////////////////////
/*
let user2 = {
  firstName: "Вася"
};
// bind  используется для привязки функции к определенному контексту  (т.е. значению this).
function func(phrase) {
  console.log(phrase + ", " + this.firstName);
}
//После контекста в call можно передать аргументы для функции. 
// привязка this к user
let funcUser = func.bind(user2);

funcUser("Привет"); //

let user3 = {
  firstName: "Evan",
  sayHi(parametres) {
    console.log(`${parametres}, ${this.firstName}!`);
  }
};

let sayHi = user3.sayHi.bind(user3);

sayHi("пРИВЕТ");
///////////////////////////////
*/

//const item = {
//  title: "Phone",
// fullPrice: 100,
//  calculatedPrice(discount = 0) {
//  console.log(this.fullPrice - (discount / 100) * this.fullPrice);
// }
//}///;
//item.calculatedPrice(50);
/*
function fadeIn(age) {
  if (age > 65) {
    console.log(this.price / 2);
  } else {
    console.log(this.price);
  }
}
const item = {
  title: "Phone",
  price: 1000,
  price2() {
    console.log(this.price / 23);
  }
};
//let result = item.price2.bind(item); //////// привязывает контекст
//result();
fadeIn.call(item, 70);
let ruslt = fadeIn.bind(item, 30); //привязать контекст к функции сохранить в новую переменную

function myFunction(title, price) {
  this.title = title;
  this.price = price;
  console.log(this);
}
new myFunction("phone", 2000);

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let b = [];
if (Array.isArray(a)) {
  console.log("Да Массив");
  a.forEach((element) => {
    if (element % 2 == 0) {
      b.push(element);
    }
  });
} else {
  console.log("Нет массив");
}
console.log(b);
function callbackFunction() {
  console.log("Функция обратного вызова выполнена!");
}

// Функция, принимающая функцию обратного вызова в качестве аргумента
function performOperation(callback) {
  console.log("Выполняется операция...");
  // Некоторая асинхронная операция
  setTimeout(callback, 2000); // Выполнить функцию обратного вызова через 2 секунды
}

// Вызов функции, передавая функцию обратного вызова в качестве аргумента
performOperation(callbackFunction);
*/
///function greet(name) {
// console.log("Привет, " + name + "!");
//}

//function processUserInput(callback) {
// var name = "Evan";
// callback(name);
//}

//processUserInput(greet);

///let a = [1, 2, 3, 4];

//function process(name, age, password) {
// console.log("your datebase" + " " + name + " " + age + " " + password);
//}

//function processprocessUserInput(callback) {
//  let name = "Evan";
// let age = 23;
//  let password = "<2321432>";
/// callback(name, age, password);
//}
//processprocessUserInput(process);
///Memoized
/*
const memo = (fn) => {
  const cahe = {};
  return (n) => {
    if (n in cahe) {
      return cahe[n];
    }
    return (cahe[n] = fn(n));
  };
};
const factorial = memo((x) => {
  console.log("calculating for x=" + x);
  return !x || x === 1 ? 1 : x * factorial(x - 1);
});
console.log(factorial(5));
console.log(factorial(7));
*/
/*
function memo(call) {
  const cache = {};
  return (n) => {
    if (n in cache) {
      return cache[n];
    }
    return (cache[n] = call(n));
  };
}
let a = [1, 2, 3, 4, 5];

const factorial = memo((x) => {
  return x.forEach((element) => {
    if (element % 2 === 0) {
      console.log(`"calculating for x="${element}`); // пример не очень но работает
    }
  });
});

factorial(a);
factorial(a);
*/
/*
function showFullName() {
  console.log(this.firstName + " " + this.lastName);
}

const user2 = {
  firstName: "Вася",
  lastName: "Петров"
};

showFullName.call(user2);
//При помощи call можно легко взять метод одного объекта, в том числе встроенного, и вызвать в контексте другого.
*/
//В этом примере мы создали класс Person с помощью функции-конструктора. Мы добавили два свойства (name и age)
//и метод greet с использованием прототипа. Затем мы создали два экземпляра класса person1 и person2 и вызвали метод greet на каждом из них.
//Функция Person() создает новый класс с именем Person, который может использоваться для создания объектов.
///Параметры name и age позволяют инициализировать свойства объекта при его создании.
function person(name, age) {
  this.name = name;
  this.age = age;

  person.prototype.greet = function () {
    console.log(`Hello ${this.name} ${this.age}!`);
  };
}

const person1 = new person("Вася", 23);
person1.greet();
/*
//Call и apply - это методы, которые позволяют вызывать функцию с указанием контекста и аргументов.
function showFullName() {
  console.log(this.firstName + " " + this.lastName);
}

var user3 = {
  firstName: "Василий",
  lastName: "Петров"
};

// функция вызовется с this=user
showFullName.call(user3); // "Василий Петров"
*/
const showFullName = {
  name: "creator",
  age: 23,
  greet(job, phoneNumber) {
    console.log(`${this.name} ${this.age}!`);
    console.log(job);
    console.log(phoneNumber);
  }
};

const lena = {
  name: "Lena",
  age: 23
};

//const funInfo = showFullName.greet.bind(lena); // " //метод bind возрощает новую функцию и мы ее можем вызвать когда нам угодно
// а метод call взывает сразу функцию в в контексте вызовы и передать можно аргументы
//funInfo("Build", "+342242");
showFullName.greet.call(lena, "job", "+342242");

const array = [1, 2, 3, 4];
Array.prototype.multBy = function (n) {
  return this.map((x) => x * n);
};
/// метод через прототипы
console.log(array.multBy(2));

Array.prototype.finNumber = function (number) {
  return this.forEach((element) => {
    if (element % number == 0) {
      console.log(element);
    }
  });
};
const array1 = ["day", "month", "year"];
///array.finNumber(2);
const reslt = array1.reduce((accumulator, currentValue, index, array) => {
  return { ...accumulator, [index]: currentValue };
}, {});
//console.log(reslt);

const bankAccounts = [
  { id: "123", amount1: 19 },
  { id: "345", amount1: 33 },
  { id: "567", amount1: 4 },
  { id: "789", amount1: 20 }
];

Array.prototype.finNumber = function (amount1) {
  ///создали метод котором  мы обращаемся к массиву объектов для подсчета суммы этого свойства для всех объектов в массиве.
  if (!this.every((item) => amount1 in item)) {
    throw new Error("Property not found in all items");
  }
  return this.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[amount1];
  }, 0);
};
console.log(bankAccounts.finNumber("amount1"));
