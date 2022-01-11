import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, Col, Badge } from 'reactstrap';
import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Movies(props) {

  const {movie, movieSee, clickAddMovieParent, clickDeleteMovieParent} = props

  const [watchMovie, setWatchMovie] = useState(false)
  const [countWatchMovie, setCountWatchMovie] = useState(0)
  const [myRatingMovie, setMyRatingMovie] = useState(0)
  const [isRating, setIsRating] = useState(false)

  let imgUrl = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path;
 
  const likeClick = () => {
    if(movieSee) {
      clickDeleteMovieParent(movie.title)
    } else {
      clickAddMovieParent(movie.title, imgUrl);
    }
  }

  const movieClick = () => {
    setWatchMovie(true)
    setCountWatchMovie(countWatchMovie + 1)
  }

  const plusClick = () => {
    if (myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1)
      setIsRating(true)
    }
  }

  const moinsClick = () => {
    if (myRatingMovie >= 1) {
      setMyRatingMovie(myRatingMovie - 1)
      setIsRating(true)
    }
  }

  const spacing = {
    marginBottom: '2%',
  }

  let colorMovie;
  let colorLike;

  if (watchMovie) {
    colorMovie = { color: 'f1c40f', cursor:'pointer' }
  } else {
    colorMovie = {cursor:'pointer'}
  }


  if(movieSee){
    colorLike = {color: 'e74c3c', cursor:'pointer'}
  } else {
    colorLike = {cursor:'pointer'}
  }


  const userRating = () => {
    let ratingUser = []
    for (let i = 0; i < 10; i++) {
      let color = {}
      if (i < myRatingMovie) {
        color = { color: 'f1c40f' }
      }
      let count = i + 1;
      ratingUser.push(<FontAwesomeIcon onClick={() => setMyRatingMovie(count)} style={color} icon={faStar} key={`userRating-${i}`} />)
    }
    return ratingUser;
  }
  

  let nbTotalNote = movie.vote_average * movie.vote_count
  let nbTotalVote = movie.vote_count


  if (isRating) {
    nbTotalVote += 1
    nbTotalNote += myRatingMovie
  }

  let avgTotal = Math.round(nbTotalNote / nbTotalVote)

  const getRating = () => {
    let tabGlobalRating = []
    for (let i = 0; i < 10; i++) {
      let color = {}
      if (i < avgTotal) {
        color = { color: '#f1c40f' }
      }
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} key={`globalRating-${i}`} />)
    }

    return tabGlobalRating
  }
  let result = movie.overview
  if(result.length > 80){
    result = result.slice(0,80)+'...'
  }

 


  return (
    <Col xs={12} lg={6} xxl={4} style={spacing}>
      <Card>
        <CardImg
          alt="Card image cap"
          src={imgUrl}
          top
          width="100%"
        />
        <CardBody>
        <h5>
            {movie.title}
          </h5>
          <CardText>
            Like <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => likeClick()}  />
          </CardText>
          <CardText>
            Nombre de vues <FontAwesomeIcon onClick={() => movieClick()} icon={faVideo} style={colorMovie} /> <Badge color="secondary">{countWatchMovie}</Badge>
          </CardText>
          <CardText>
            Mon avis {userRating()}
            <Badge onClick={() => moinsClick()} variant="secondary"style={{cursor: 'pointer'}}>-1</Badge>
            <Badge onClick={() => plusClick()} variant="secondary" style={{cursor: 'pointer'}}>+1</Badge>
          </CardText>
          <CardText>
            Moyenne 
           {getRating()}
            ({nbTotalVote})
          </CardText>

          <CardText>
            {result}
          </CardText>
        </CardBody>

      </Card>
    </Col>

  )
}

export default Movies;