import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  Badge,
  ListGroupItem,
} from "reactstrap";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";

function App() {
  
  const [moviesList, setMoviesList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [wishListMovies, setWishListMovies] = useState([]);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      let rawResponse = await fetch("/new-movies");
      let response = await rawResponse.json();
      setMoviesList(response.movies);
    }
    loadMovies();

    async function loadWishList() {
      let wishList = await fetch("/wishlist-movie/");
      let wishListAPI = await wishList.json();
      setWishListMovies(wishListAPI);
      setMoviesCount(wishListAPI.length)
    }
    loadWishList();
  }, []);

  let clickAddMovie = async (movieName, movieImg) => {
    await fetch("/wishlist-movie/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${movieName}&img=${movieImg}`,
    });
    setMoviesCount(moviesCount + 1);
    setWishListMovies([...wishListMovies, { title: movieName, img: movieImg }]);
    console.log(wishListMovies);
  };

  let clickDeleteMovie = async (movieName) => {
    await fetch("/wishlist-movie/" + movieName, {
      method: "DELETE",
    });
    setMoviesCount(moviesCount - 1);
    let index = wishListMovies
      .map(function (e) {
        return e.title;
      })
      .indexOf(movieName);

    if (index !== -1) {
      let moviesTemp = [...wishListMovies];
      moviesTemp.splice(index, 1);
      setWishListMovies(moviesTemp);
    }
  };

  let popoverClick = () => {
    setPopoverIsOpen(!popoverIsOpen);
  };

  let allMovies = moviesList.map(function (movie, i) {
    let toSee = false;

    wishListMovies.forEach((wish) => {
      if (wish.title === movie.title) {
        toSee = true;
      }
    });
    return (
      <Movies
        movie={movie}
        movieSee={toSee}
        key={`movie-${i}`}
        clickAddMovieParent={clickAddMovie}
        clickDeleteMovieParent={clickDeleteMovie}
      />
    );
  });

  const myWishList = wishListMovies.map(function (movie, i) {
    return (
  
          <ListGroupItem key={`wish-${i}`} style={{display: 'flex'}}>
         
<img src={movie.img} alt={"movie-img"} width="40%" /> <p>{movie.title}</p> <Badge onClick={() => clickDeleteMovie(movie.title)} color="danger"style={{cursor: 'pointer', height: '20px'}}>x</Badge>   
          </ListGroupItem>
     
      
    

        
    );
  });


  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            
            <NavBar
              moviesCount={moviesCount}
              popoverClickParent={popoverClick}
            />
          </Col>
        </Row>

        <Row>{allMovies}</Row>
      </Container>
      <Popover placement="bottom" isOpen={popoverIsOpen} target="listMoviePop">
        <PopoverHeader>Wishlist</PopoverHeader>
        <PopoverBody>
          <ListGroup>
            {myWishList}

          </ListGroup>
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default App;
