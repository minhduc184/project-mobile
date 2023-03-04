/* --- Buoc 1: Khai bao bien ---*/
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';



              /* --- Thư viện Axios --- */  

// //Th1: không dùng async/await

// function getMoviesAPI() {
//     axios.get(`${API_URL}`).then(function(response){
//         console.log(response.data.results);
//     })
// }

// getMoviesAPI();



/* --- Buoc 2: Goi du lieu ---*/
//Th2: Dùng async/await
async function getMoviesAPI(API_URL){
    const response = await axios.get(`${API_URL}`);
    const data = await response.data.results;
    
    showMovie(data);//Loi goi ham. Thuc thi function showMovie
}
getMoviesAPI(API_URL);



/* --- Buoc 3: Hien thi du lieu ra ngoai Front-end --- */
function showMovie(data){
    let htmlCode = ``;
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    data.map(function(item){
        // console.log(item);
        htmlCode+=`<div class="col-12 col-sm-6 col-md-3">
        <div class="items">
            <div class="box-image">
                <img src="${IMG_PATH + item.poster_path}" alt="">
            </div>
            <div class="box-content">
                <h3 class="title">${item.title}</h3>
                <p class="rating ${colorRating(item.vote_average)}">${item.vote_average}</p>
            </div>
            <div class="box-description">
                <h4>Overview</h4>
                <p>${item.overview}
                </p>
            </div>
        </div>
    </div>`
      //Truy cap phan tu
      const content = document.querySelector('.listing-product .row')
      content.innerHTML = htmlCode;
    });
     
}
getMoviesAPI();

/* --- Buoc 4: Thay doi mau Rating --- */
function colorRating (rate){
    if(rate > 7) {
        return 'good';
    }else if(rate > 5.5) {
        return 'normal';
    }else{
        return 'bad';
    }
}


/* --- Buoc 5: Lam ve o tim kiem (Search) --- */

const elementForm = document.querySelector('.form');
const elementInput = document.querySelector('.input-form');

elementForm.addEventListener('submit',function(e){
    e.preventDefault();
    //gia tri cua ng nhap
    const valueInput = elementInput.value;
    // console.log(valueInput);
    if(valueInput && valueInput !== ''){
        getMoviesAPI(SEARCH_API + valueInput);
        elementInput.value = '';
    }else{
        window.location.reload();
    }
});


/* --- Buoc 6: Tao load more --- */
const nextPage = document.querySelector('.next-page')
const backPage = document.querySelector('.back-page');

let currentPage = 1;
//nextpage
nextPage.addEventListener('click',function(){
    currentPage++;
    const api_nextPage = `${API_URL}&page=${currentPage}`;
    getMoviesAPI(api_nextPage)
    console.log(currentPage);
});

//backpage
backPage.addEventListener('click',function(){
    currentPage--;
    if (currentPage < 1) {
        currentPage++;
        return alert('!!!')
    }
    const api_backPage = `${API_URL}&page=${currentPage}`;
    getMoviesAPI(api_backPage)
    console.log(currentPage);
});