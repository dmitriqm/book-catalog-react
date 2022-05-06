import { useParams } from "react-router-dom"

const Author = () => {
  const {author} = useParams()
  return <>Author {author}</>
}

export default Author