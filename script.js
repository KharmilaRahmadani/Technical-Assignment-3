//TMDB 

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = []

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


function clearBtn() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('highlight')
    } else {

        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight');

        clear.addEventListener('click', () => {
            getMovies(API_URL);
        })
    }

}

getMovies(API_URL);

function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if (data.results.length !== 0) {
            showMovies(data.results);

            current.innerText = currentPage;

            if (currentPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled')
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled')
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({ behavior: 'smooth' })

        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }

    })

}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

                <button id="${id}"><strong>Release date: 15 Mar 2022</strong></button>
            </div>
        
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(movie)
        })
    })
}


/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
        console.log(videoData);
        if (videoData) {
            document.getElementById("myNav").style.width = "100%";
            if (videoData.results.length > 0) {
                var embed = [];
                var dots = [];
                videoData.results.forEach((video, idx) => {
                    let { name, key, site } = video

                    if (site == 'YouTube') {

                        embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

                        dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
                    }
                })

                var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join('')}
        <br/>

        <div class="dots">${dots.join('')}</div>
                `
                overlayContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            } else {
                overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
            }
        }
    })
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
    let embedClasses = document.querySelectorAll('.embed');
    let dots = document.querySelectorAll('.dot');

    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        if (activeSlide == idx) {
            embedTag.classList.add('show')
            embedTag.classList.remove('hide')

        } else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show')
        }
    })

    dots.forEach((dot, indx) => {
        if (activeSlide == indx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active')
        }
    })
}

function getColor(vote) {
    if (vote >= 'white') {

    }
}

