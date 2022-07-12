//import './movie-section.css'

class MovieSection{
    constructor(window){
        this.ventana = window
    }
    get templateClass(){
        return 
        `
        <div>
            <div class="section" id="content">
                <h1>Synopsis</h1>
                <a href="#trailer"><span></span>Trailer</a>
            </div>
            <div class="section" id="trailer">
                <h1>Trailer</h1>
                <a href="#casting"><span></span>Casting</a>
            </div>
            <div class="section" id="casting">
                <h1>Casting</h1>
                <a href="#recommended"><span></span>Recommended</a>
            </div>
            <div class="section" id="recommended">
                <h1>Recommended</h1>
                <a href="#content"><span></span>Synopsis</a>
            </div>  
        </div> 
        `
    }
}
export default MovieSection;
