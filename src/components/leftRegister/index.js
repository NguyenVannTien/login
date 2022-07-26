import React from 'react';
import imagePath from '../../assets/image/Path 1972.png';
import imageIsometric from '../../assets/image/isometric illustrations.png';
import './style.scss';

const LeftRigister = () => {
  return (
    <div className="left-register">
      <div className='left-register__img'>
        <img src={imageIsometric} alt="a"/>
      </div>
      <div className='overplay'>
        <div  className='overplay__title'>
          <div className='overplay__title__logo'>
            <img src={imagePath} alt="a"/>
            <p>Candawada</p>
          </div>
          <div className='overplay__title__text'>
            <h5>Follow these steps to set up your cadawada account</h5>
            <div className='overplay__title__text__guide'>
              <div className='overplay__title__text__guide__step'>
                <i class=" icon-acitve fa-solid fa-check"></i>
                <div className='overplay__title__text__guide__step__desc'>
                  <p>Select account type</p>
                  <span>Kindly select your type of account</span>
                </div>
              </div>
              <div className='overplay__title__text__guide__step'>
                <i class="fa-solid fa-check"></i>
                <div className='overplay__title__text__guide__step__desc'>
                  <p>Provide your information</p>
                  <span>Follow these steps</span>
                </div>
              </div>
              <div className='overplay__title__text__guide__step'>
                <i class="border_opacity color-opacity fa-solid fa-check"></i>
                <div className='overplay__title__text__guide__step__desc'>
                  <p className='color-opacity'>Confirm email address & Password</p>
                  <span className='color-opacity'>Follow these steps</span>
                </div>
              </div>
              <div className='overplay__title__text__guide__step'>
                <i class="border_opacity color-opacity fa-solid fa-check"></i>
                <div className='overplay__title__text__guide__step__desc'>
                  <p className='color-opacity'>You are all set !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeftRigister;