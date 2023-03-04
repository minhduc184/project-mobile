/* --- Buoc 1: Khai bao bien ---*/
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`




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
async function getMoviesAPI(){
    const response = await axios.get(`${API_URL}`)
    const data = await response.data.results
    
    showMovie(data);//Loi goi ham. Thuc thi function showMovie
}




/* --- Buoc 3: Hien thi du lieu ra ngoai Front-end --- */
function showMovie(data){
    let htmlCode = ``;
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    data.map(function(item){
        console.log(item);
        htmlCode+=`<div class="col-12 col-sm-6 col-md-3">
        <div class="items">
            <div class="box-image">
                <img src="${IMG_PATH + item.poster_path}" alt="">
            </div>
            <div class="box-content">
                <h3 class="title">${item.title}</h3>
                <p class="rating">${item.vote_average
                }</p>
            </div>
            <div class="box-description">
                <h4>Overview</h4>
                <p>After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.
                    After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.
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