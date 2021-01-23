import React from 'react'

import Header from 'parts/Header'
import PageDetailTitle from 'parts/PageDetailTitle'
import FeaturedImage from 'parts/FeatureImage'
import ItemDetails from 'json/itemDetails.json'
import PageDetailDescription from 'parts/PageDetailDescription'
import BookingForm from 'parts/BookingForm'
import Category from 'parts/Category'
import Testimony from 'parts/Testimony'
import Footer from 'parts/Footer'
import { animateScroll as scroll } from 'react-scroll'
import { Helmet } from 'react-helmet'
import Fade from 'react-reveal/Fade'

export default class DetailPage extends React.Component {
  componentDidMount() {
    window.title = 'ThonHouse | Detail'
    window.addEventListener('scroll', scroll.scrollToTop())
  }
  render() {
    const breadCrumbList = [
      {
        pageTitle: 'Home',
        pageHref: '',
      },
      {
        pageTitle: 'House Details',
        pageHref: '',
      },
    ]
    return (
      <>
        <Helmet>
          <title>ThonHouse | Detail</title>
        </Helmet>
        <Header {...this.props} />
        <PageDetailTitle breadcrumb={breadCrumbList} data={ItemDetails} />
        <FeaturedImage data={ItemDetails.imageUrls} />
        <section className="container">
          <div className="row">
            <div className="col-7 pr-5">
              <Fade bottom>
                <PageDetailDescription data={ItemDetails} />
              </Fade>
            </div>
            <div className="col-5">
              <Fade bottom>
                <BookingForm itemDetails={ItemDetails} />
              </Fade>
            </div>
          </div>
        </section>
        <Category data={ItemDetails.categories} />
        <Testimony data={ItemDetails.testimonial} />
        <Footer />
      </>
    )
  }
}
