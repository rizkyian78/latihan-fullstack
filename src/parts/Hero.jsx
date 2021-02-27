import React from 'react'
import ImageHero from 'assets/images/img-hero.svg'
import ImageHero_ from 'assets/images/img-hero-frame.jpg'
import IconCities from 'assets/images/Icons/icon-city.svg'
import IconTraveler from 'assets/images/Icons/icon-traveler.svg'
import IconTreasure from 'assets/images/Icons/icon-treasure.svg'

import Button from 'elements/Button/index'
import { numberFormat } from 'helper/Common'
import Fade from 'react-reveal/Fade'

export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,
      // left: props.refMostPicked.current.offsetT
      behavior: 'smooth',
    })
  }
  return (
    <Fade bottom>
      <section className="container pt-4">
        <div className="row align-items-center">
          <div className="col-auto pr-5" style={{ width: 530 }}>
            <h1 className="font-weight-bold line-height-1 mb-3">
              Forget Busy Work, <br />
              Start Next Vacation
            </h1>
            <p
              className="mb-5 font-weight-light text-gray-500 w-75"
              style={{ lineHeight: '170%' }}
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another Memorable Moment.
            </p>
            <Button
              className="btn mt-4 px-5"
              hasShadow
              isPrimary
              onClick={showMostPicked}
            >
              Show Me
            </Button>
            <div className="row" style={{ marginTop: 80 }}>
              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src={IconTraveler}
                  alt={`${props.data.travelers} Traveler`}
                />
                <h6
                  className="mt-3"
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  {numberFormat(props.data.travelers)}{' '}
                  <span className="text-gray-500">Travelers</span>
                </h6>
              </div>
              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src={IconTreasure}
                  alt={`${props.data.treasures} Treasure`}
                />
                <h6
                  className="mt-3"
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  {numberFormat(props.data.treasures)}{' '}
                  <span className="text-gray-500">Treasure</span>
                </h6>
              </div>
              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src={IconCities}
                  alt={`${props.data.treasures} City`}
                />
                <h6
                  className="mt-3"
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  {numberFormat(props.data.cities)}{' '}
                  <span className="text-gray-500">City</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-6 pl-5">
            <div style={{ width: 540, height: 410, borderRadius: '6px' }}>
              <img
                src={ImageHero}
                alt="Room With Couches"
                className="img-fluid position-absolute"
                style={{ margin: '-30px 0 0 -30px', zIndex: 1 }}
              />
              <img
                src={ImageHero_}
                alt="Room With Couches frame"
                className="img-fluid position-absolute"
                style={{ margin: '0 -15px -15px 0' }}
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  )
}
