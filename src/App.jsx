import 'assets/scss/style.scss'
import LandingPage from 'pages/LandingPage'
import DetailPage from 'pages/DetailPage'
import CheckOut from 'pages/CheckOut'
import Login from 'pages/Login'
import Test from 'pages/test'
import AdminCategory from 'pages/Admin/Category'
import AdminBank from 'pages/Admin/Bank'
import AdminFeature from 'pages/Admin/FeatureAndActivity'
import AdminBooking from 'pages/Admin/Booking'
import AdminItem from 'pages/Admin/Item'
import AdminShowImage from 'pages/Admin/ShowImage'
import AdminDetailBooking from 'pages/Admin/DetailBooking'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/properties/:id" component={DetailPage} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/admin" component={Login} />
        <Route exact path="/example" component={Test} />
        <Route exact path="/admin/category" component={AdminCategory} />
        <Route exact path="/admin/feature" component={AdminFeature} />
        <Route exact path="/admin/bank" component={AdminBank} />
        <Route exact path="/admin/booking" component={AdminBooking} />
        <Route exact path="/admin/booking/:id" component={AdminDetailBooking} />
        <Route exact path="/admin/item" component={AdminItem} />
        <Route exact path="/admin/item/image/:id" component={AdminShowImage} />
      </Router>
    </div>
  )
}

export default App
