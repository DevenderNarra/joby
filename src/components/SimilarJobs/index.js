import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = ({jobDetails}) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h6>{title}</h6>
          <FaRegStar />
          <p>{rating}</p>
        </div>
      </div>
      <h2>Description</h2>
      <p>{jobDescription}</p>
      <div className="location-internship-container">
        <div className="location">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="internship">
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
