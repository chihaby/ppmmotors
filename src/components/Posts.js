import React, { useContext } from 'react'
import Post from './Post';
import { PostsContext } from '../providers/PostsProvider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Posts = () => {

  const posts = useContext(PostsContext);

  const settings = {
    dots: true,
    speed: 500,
    width: "100%",
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    className: "center",
    loop: false,
    arrows: true,
    initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            initialSlide: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
      <Slider {...settings}>
          {posts.map(post => <Post {...post} key={post.id} />
          )} 
      </Slider>
  )
}
export default Posts;