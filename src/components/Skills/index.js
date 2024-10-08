import './index.css'

const Skills = ({skillsDetails}) => {
  const {imageUrl, name} = skillsDetails
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default Skills
