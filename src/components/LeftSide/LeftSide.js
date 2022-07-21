import React from 'react';
import imagePath from '../../assets/image/Path 1972.png';
import imageIsometric from '../../assets/image/isometric illustrations.png';
import './style.scss';

const LeftSide = () => {
  return (
    <div className="left-side">
      <div  className='left-side__title'>
        <img src={imagePath} alt="a"/>
        <p>Candawada</p>
      </div>
      <div className='left-side__img'>
        <img src={imageIsometric} alt="a"/>
      </div>
    </div>
    
  )
}

export default LeftSide;