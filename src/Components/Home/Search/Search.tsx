import { useEffect } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import useDebounce from "../../../Hooks/useDebounce"
import { getReps, setCurrentPage } from "../../../Redux/commonReducer"
import { RootState } from "../../../Redux/reduxStore"
import classes from "./Search.module.css"

interface IProps {
    getReps: (searchValue: string, page: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    currentPage: number,
    pageSize: number
}

const Search = (props: IProps) => {
    const { getReps, setCurrentPage, currentPage, pageSize } = props

    const [value, setValue] = useState("")

    const debouncedSearchTerm = useDebounce(value, 500);

    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            getReps(value, currentPage, pageSize)
        }
    }, [debouncedSearchTerm, currentPage])

    useEffect(() => {
        if (value.length === 0 && debouncedSearchTerm) {
           getReps("", 1, pageSize) 
        }
    }, [value])

    useEffect(() => {
        setCurrentPage(0)
    }, [value])

    return (
        <div className={classes.main}>
            <input value={value} onChange={handleValue} placeholder="Start search book here..."/>
        </div>
    )
}

let mapStateToProps = (state: RootState) => ({
    currentPage: state.common.currentPage,
    pageSize: state.common.pageSize
})

export default connect(mapStateToProps, {
    getReps,
    setCurrentPage
})(Search)