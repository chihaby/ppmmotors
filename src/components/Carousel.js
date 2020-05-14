import React, { useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PostsContext } from '../providers/PostsProvider';
import Post from './Post';

const Carousel = () =>   {
    const posts = useContext(PostsContext);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
  }

    return (
      <Slider {...settings} >
        {posts.map(post => (
            <div>
              <Post {...post} key={post.id} />
            </div>   
        ))} 
      </Slider>
      
    );
}

export default Carousel;