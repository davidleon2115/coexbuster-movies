//import '../style.css'
import './style.css';
import templateHistory from './views/history.js';
import templatelogin from './views/login.js'; 
import { OrderList } from './views/myorderView.js';
import './lib/conection.js';
import { dbConection } from './lib/conection.js';
import * as HistoryComponent from '../cart/component/history/main.js';
import * as MyOrder from '../cart/component/myOrder/main.js';
const Url = new URL(window.location);
const urlParams = new URLSearchParams(Url.searchParams);

const app = document.querySelector('#app');
const sesion = localStorage.getItem('iniciosesion');
const user = new Object();
user.email = 'admin@admin.com';
user.password = 'admin';

import * as log from './views/login/main.js'
import * as LoginComponent from './component/login/main.js'

//Peticiones a la base de datos 
const readMovie = (e)=>{
	let id = parseInt(e.target.id);
	let db = dbConection.result;
	let IDBtransaction = db.transaction('movies', 'readonly');
	let objectStore = IDBtransaction.objectStore('movies');
	let cursor = objectStore.get(id);
	let data;
	cursor.addEventListener('success', ()=>{
		data = cursor.result;
	})

	IDBtransaction.oncomplete = ()=> {
		console.log(data)
		RenderMyOrder(data);
		// MyOrder(app,data);
	}
}


//Integracion entre la base de datos con la vista del historial de compras


function call_date(movies, keys) {
    let array_date = [];
    const date = new Date();

    let output =
        String(date.getDate()).padStart(2, '0') +
        '.' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '.' +
        date.getFullYear();

    array_date.push(output);

    let capa_contenedor = document.getElementById('historyShopping');

    for (let i = 0; i < movies.length && i < keys.length; i++) {
        let longitud_movies = movies[i].length;
        const templateCart = `
            <div class="history_section-orders">
            <div class="history__section--orders--items">
                <h1 style="color: white;">${output}</h1>
                <h2 style="color: white;">${longitud_movies} movies</h2>
            </div>
            <img src="/assets/icons/angle-small-right-free-icon-font.svg" style="width: 20px;" id="${keys[i]}" class="myorderDirection">

            </div>         
        `
        capa_contenedor.innerHTML += templateCart;
    }
	localStorage.setItem('fecha',output);
	const ORDER_LIST = document.querySelectorAll('.myorderDirection');
	for (let element of ORDER_LIST) {
		element.addEventListener('click', readMovie);
	}
}

const readMovieList = ()=>{
    dbConection.addEventListener('success', ()=>{
        let db = dbConection.result;
        let IDBtransaction = db.transaction('movies', 'readonly');
        let objectStore = IDBtransaction.objectStore('movies');
        let cursor = objectStore.openCursor();
        let keyList = objectStore.getAllKeys();
        let data = [];
        let key;
        cursor.addEventListener('success', ()=>{
            if(cursor.result){
                data.push(cursor.result.value);
                cursor.result.continue()
            }else{
                console.log("Todos los datos fueron leidos");
            }
        });
        keyList.addEventListener('success', ()=>{
            key = keyList.result;
			console.log(data);
			console.log(key);
        });
        IDBtransaction.oncomplete = ()=>{
            return call_date(data, key);
        }
    })
}

//Fin de las peticiones a la base de datos


function RenderMyOrder(data) {
	// const order = new OrderList(data);
	// app.innerHTML = order.myorderView;
	MyOrder.render(app,data);
	const BACK = document.getElementById('back-arrow');
	BACK.addEventListener('click', () => {
		window.location.reload();
	});
}



// function renderHistory() {
//     app.innerHTML = templateHistory;

// 	document.addEventListener("load", readMovieList());
// }
HistoryComponent.render(app,readMovieList());

// const Login = ()=> {
// 	// app.innerHTML = templatelogin;
// 	log.render();
// 	// LoginComponent.render(app)
// 	var iniciosesion = false;
// 	localStorage.setItem('iniciosesion', iniciosesion);
// 	const form = document.getElementById('form_login');
// 	form.onsubmit = () => {
// 		const mail = document.getElementById('email');
// 		const con = document.getElementById('password');
// 		const correo = mail.value;
// 		const contra = con.value;

// 		if (correo == '' || contra == '') {
// 			alert('Debe llenar todos los campos');
// 		} else {
// 			if (correo == user.email && contra == user.password) {
//                 iniciosesion = true
// 				localStorage.setItem('iniciosesion', iniciosesion);
//                 alert('inicio de sesion correcto');
// 				window.location ='../shop/index.html';
// 			} else {
// 				alert('Credenciales invalidas');
// 			}
// 		}
// 	};
// }

 // Refactorizacion de componente login 
// if (sesion){
// 	console.log('sesion: ', sesion)
// 	if (sesion === 'false') {
// 		LoginComponent.render(app);
// 	} else {
// 		if(localStorage.getItem('statusback', 'cart')){
// 			console.log('sesion: ', sesion)
// 			HistoryComponent.render(app,readMovieList());
// 			// renderHistory();
// 		} else {
// 			console.log('sesion: ', sesion)
// 			window.location = '../shop/index.html';
// 		}
// 	}
// } else {
// 	console.log('sesion: ', sesion)
// 	localStorage.setItem('iniciosesion', false);
// 	LoginComponent.render(app);
// }

LoginComponent.logueo(app,sesion);
