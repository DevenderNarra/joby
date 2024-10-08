import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'
import Header from '../Header'

class SpecificJobDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    skillsList: [],
    lifeAtCompany: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedJobData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      description: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
    }

    const updatedSimilarJobs = data.similar_jobs.map(job => ({
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      description: job.job_description,
      location: job.location,
      rating: job.rating,
      title: job.title,
    }))

    const updatedSkills = data.job_details.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    }))

    const updatedlifeAtCompany = {
      companyDescription:
        data.job_details.life_at_company?.description ||
        'No description available.',
      imageUrl:
        data.job_details.life_at_company?.image_url || 'default-image-url.png',
    }

    this.setState({
      jobData: updatedJobData,
      similarJobs: updatedSimilarJobs,
      skillsList: updatedSkills,
      lifeAtCompany: updatedlifeAtCompany,
      isLoading: false,
    })
  }

  renderSpecificJobDetails = () => {
    const {jobData, skillsList, lifeAtCompany, similarJobs} = this.state
    const {companyDescription, imageUrl} = lifeAtCompany
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      location,
      employmentType,
      rating,
      description,
      title,
      packagePerAnnum,
    } = jobData
    return (
      <>
        <div className="spe-job-container">
          <div className="job-details-container">
            <div className="company-logo-container">
              <img src={companyLogoUrl} alt="company logo" />
              <div className="company-content-container">
                <h2>{title}</h2>
                <div className="rating-container">
                  <FaRegStar />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-internship-container">
              <div className="location">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="internship">
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <h2>Description</h2>
            <a href={companyWebsiteUrl}>Visit</a>
            <p>{description}</p>
          </div>
          <div>
            <h2>Skills</h2>
            <ul>
              {skillsList.map(skill => (
                <Skills skillsDetails={skill} key={skill.id} />
              ))}
            </ul>
          </div>
          <ul>
            <h2>Life at Company</h2>
            <li>
              <p>{companyDescription}</p>
              <img src={imageUrl} alt="life at company" />
            </li>
          </ul>

          <h2>Similar Jobs</h2>
          <ul>
            {similarJobs.map(job => (
              <SimilarJobs jobDetails={job} key={job.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : this.renderSpecificJobDetails()}
      </>
    )
  }
}
export default SpecificJobDetails
