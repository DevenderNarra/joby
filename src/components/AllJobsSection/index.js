import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'

import './index.css'

class AllJobsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(product => ({
        companyLogoUrl: product.company_logo_url,
        employmentType: product.employment_type,
        id: product.id,
        jobDescription: product.job_description,
        location: product.location,
        packagePerAnnum: product.package_per_annum,
        rating: product.rating,
        title: product.title,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  handleSearch = event => {
    const {productsList} = this.state
  }

  renderProductsList = () => {
    const {productsList} = this.state
    console.log(productsList)
    return (
      <div className="all-jobs-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            onChange={this.handleSearch}
          />
          <button type="button" data-testid="searchButton">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="products-list">
          {productsList.map(product => (
            <JobCard jobDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderProductsList()
  }
}

export default AllJobsSection
