
//Asignar nombre y version la cache
const CACHE_NAME  = 'v1_cache_luis_vargas_pwa';


//Ficheros a cachear en la aplicacion
var urlsToCache=[
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-144.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
    ];

// Evento insstall
//Instalacion del service worker y guardar en cache los elementos estaticos
self.addEventListener('install',e =>{
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(()=>{
							self.skipWaiting();
					})

            })
            .catch(err => {
                console.log('No se registro el cache', err);
            })
	);
});

//Evento activate
//Que la app funcione sin conexion
self.addEventListener('activate', e =>{
    const cacheWhilelist=[CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhilelist.indexOf(cacheName)=== -1){
                        //Borrar elementos no necesarios
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(()=>{
            //Activar chache
            self.clients.claim();
        })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelve datos desde el cache
                    return res;
                }
                return fetch(e.request);
            })
    );
});