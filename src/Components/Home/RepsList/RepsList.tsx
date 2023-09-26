import { IRep } from "../../../Utils/types"
import BookItem from "./RepItem/RepItem"
import { BsDatabaseDash } from "react-icons/bs"
import classes from "./RepsList.module.css"
import Pagination from "../Pagination/Pagination"

interface IProps {
    reps: IRep[]
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number
}

const RepsList = (props: IProps) => {
    const { reps, handlePageChange, currentPage, totalPages } = props

    return (
        <div className={classes.main}>
            {reps.length > 0 && (
                <div className={classes.items}>
                    {reps.map(el => (
                        <BookItem rep={el} key={el.id}/>
                    ))}
                </div>
            )}
            {reps.length === 0 && (
                <div className={classes.notFound}>
                    <BsDatabaseDash/>
                    <p>No Data Found.</p>
                </div>
            )}
            {reps.length > 0 && (
                <Pagination
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

export default RepsList