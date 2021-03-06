import React, { Component } from 'react'
import Header from 'parts/Header'
import Hero from 'parts/Hero'
import Category from 'parts/Category'
import MostPicked from 'parts/MostPicked'
import Testimony from 'parts/Testimony'
import landingPage from 'json/landingPage.json'
import Footer from 'parts/Footer'
import { animateScroll as scroll } from 'react-scroll'
import { Helmet } from 'react-helmet'

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.refMostPicked = React.createRef()
  }

  componentDidMount() {
    window.title = 'ThonHouse | Home'
    window.addEventListener('scroll', scroll.scrollToTop())
  }

  render() {
    return (
      <>
        <Helmet>
          <title>ThonHouse | Home</title>
        </Helmet>
        <Header {...this.props}></Header>
        <Hero data={landingPage.hero} refMostPicked={this.refMostPicked} />
        <MostPicked
          refMostPicked={this.refMostPicked}
          data={landingPage.mostPicked}
        />
        <Category data={landingPage.categories} />
        <Testimony data={landingPage.testimonial} />
        <Footer />
      </>
    )
  }
}
