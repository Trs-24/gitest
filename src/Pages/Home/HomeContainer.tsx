import { useEffect } from "react"
import { connect } from "react-redux"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { setRepsData, setCurrentPage } from "../../Redux/commonReducer"
import { RootState } from "../../Redux/reduxStore"
import { IRep } from "../../Utils/types"
import Home from "./Home"

interface IProps {
    reps: IRep[]
    isFetching: boolean
    currentPage: number
    pageSize: number
    total: number
    setRepsData: (books: IRep[]) => void
    setCurrentPage: (page: number) => void
}

const HomeContainer = (props: IProps) => {
    const {
        reps,
        isFetching,
        currentPage,
        pageSize,
        total,
        setRepsData,
        setCurrentPage
    } = props

    const totalPages = Math.ceil(total / pageSize)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    useEffect(() => {

        return () => {
            setRepsData([])
        }
    }, [])

    return (
        <>
            {isFetching && <Preloader />}
            <Home
                reps={reps}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    reps: state.common.reps,
    isFetching: state.common.isFetching,
    currentPage: state.common.currentPage,
    pageSize: state.common.pageSize,
    total: state.common.total
})

export default connect(mapStateToProps, {
    setRepsData,
    setCurrentPage
})(HomeContainer)
