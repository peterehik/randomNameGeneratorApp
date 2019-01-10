class Movie{
    constructor(movie){
        this.title = movie.title
        this.episode_id = movie.episode_id
        this.release_date = movie.release_date
        this.showOnSelectList = true
    }
}


function initVueModel (movies){
    let vueModel = new Vue({
        el: '#app',
        data: {
            movies: movies.map(r => new Movie(r)),
            selectedMovie: '',
        },
        computed: {
            selectListMovies: function() {
                return this.movies.filter(r => r.showOnSelectList)
            },
            tableMovies: function(){
                return this.movies.filter(r => !r.showOnSelectList)
            },
            movieDict: function(){
                let result = {}
                this.movies.forEach(movie => {result[movie.episode_id] = movie})
                return result
            }
        },
        watch: {
            'selectedMovie': function(val){
                if (!val)
                    return
                this.movieDict[val].showOnSelectList = false
            }
        },
        methods: {
            removeFromTable: function(id){
                this.movieDict[id].showOnSelectList = true
                this.selectedMovie = ''
            }
        }
    })
}

window.onload = function(){
    // $.getJSON('https://swapi.co/api/films/').done(function(result){
    //     initVueModel(result.results)
    // })

    fetch('https://swapi.co/api/films/')
      .then(function(response) {
        return response.json()
      }).then(function(jsonResult){
          console.log(jsonResult)
        initVueModel(jsonResult.results)
    })

}