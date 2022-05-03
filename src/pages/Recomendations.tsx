import { NavLink } from "react-router-dom"
import BookCard from "../components/BookCard"
import GroupWrapper from "../components/GroupWrapper"


const Recomendations = () => {
  return ( 
      <>
        <GroupWrapper title="Рекомендации" path="/recomendations">
          <BookCard />
          <BookCard />
          <BookCard />
        </GroupWrapper>
    </>
  )
}

export default Recomendations