import Header from '../Header'
import AllJobsSection from '../AllJobsSection'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-container">
      <div className="profile-filter-sections">
        <div className="profile-section">
          <h3>Rahul Attuluri</h3>
          <p>Lead Software Developer and AI-ML expert</p>
        </div>
        <hr />
        <ul className="types-of-empolyments">
          <h3>Types of Employment</h3>
          {employmentTypesList.map(eachItem => (
            <li>
              <input type="checkbox" value={eachItem.employmentTypeId} />
              <span>{eachItem.label}</span>
            </li>
          ))}
        </ul>
        <hr />
        <ul className="salary-ranges">
          <h3>Salary Range</h3>
          {salaryRangesList.map(eachItem => (
            <li>
              <input type="checkbox" value={eachItem.salaryRangeId} />
              <span>{eachItem.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-jobs-container">
        <AllJobsSection />
      </div>
    </div>
  </>
)
export default Jobs
