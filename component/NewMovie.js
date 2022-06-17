import React from 'react'
import Form from '../common/Form'
import {getMovie,saveMovie} from '../services/fakeMovieService'
import {getGenres} from '../services/fakeGenreService'
import Joi from 'joi-browser'
class NewMovie extends Form{
   state={
    data:{
      title:"",
      genreId:"",
      numberInStock:"",
      dailyRentalRate:""
      },
    genres:[],
    errors:{}     
  }
  schema={
    title:Joi.string().required().label('Title'),
    genreId:Joi.string().required().label('Genre'),
    numberInStock:Joi.number().required().min(0).max(100).label('Number In Stock'),
    dailyRentalRate:Joi.number().required().min(0).max(10).label('Daily Rental Rate')
  }
  componentDidMount(){
    const genres = getGenres();
    this.setState({genres});
    const movieId = this.props.match.params.id
    if(movieId=="new") return

    const movie=getMovie(movieId)
    if(!movie) return this.props.history.replace('/not-found')
    this.setState({data:this.mapToViewModel(movie)})
  }
  mapToViewModel(movie){
    return {
      _id:movie._id,
      title:movie.title,
      genreId:movie.genre._id,
      numberInStock:movie.numberInStock,
      dailyRentalRate:movie.dailyRentalRate
    }
  }
  handleSubmit=(e)=>{
     e.preventDefault();
     const errors = this.validate();
   
     this.setState({errors: errors|| {}})

     if(errors) return

     this.doSubmit()

     
  }
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    //call server
    // let newlist=this.props.movies;
    // let genresList=this.props.genres;
    
    //  const genreObj = genresList.filter(genre => genre.name==this.state.data.genre)
    //  const genreId = genreObj[0]._id
    // const obj={
    //   _id: '_' + Math.random().toString(36).substr(2, 9),
    //   title:this.state.data.title,
    //   genre:{
    //      _id:genreId,
    //      name:this.state.data.genre
    //   },
    //   numberInStock:this.state.data.numberInStock,
    //   dailyRentalRate:this.state.data.rate

    
    // newlist={...newlist,...this.props.movies}
    // newlist.push(obj);
    // console.log('New List')
    // console.log(newlist)
    //  console.log('Movies List')
    // console.log(this.props.movies)
    //  this.props.handleState(newlist)
    //  console.log('Submitted')
  }
  render(){
    
    return(
     <div>
       <h1>Movie Form</h1>
       <form onSubmit={this.handleSubmit}>
         {this.renderInput('title','Title','text')}
         {this.renderSelect('genreId','Genres',this.state.genres)}
         {this.renderInput('numberInStock','Number In Stock','number')}
         {this.renderInput('dailyRentalRate','Rate','text')}
        {this.renderButton('Save')}
       </form>

    </div>
   
    )
  }
}
export default NewMovie