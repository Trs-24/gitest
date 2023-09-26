import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import Preloader from "../../Components/UI/Preloader/Preloader"
import { getRepositoryById } from "../../Redux/commonReducer"
import { RootState } from "../../Redux/reduxStore"
import { IRep } from "../../Utils/types"
import Rep from "./Rep"

interface IProps {
    currentRep: IRep | null
    isFetching: boolean
    getRepositoryById: (owner: string, repoName: string) => void
}

const RepContainer = (props: IProps) => {
    const { currentRep, isFetching, getRepositoryById } = props
    
    const { owner, repoName } = useParams()

    useEffect(() => {
        if (owner && repoName) {
            getRepositoryById(owner, repoName)
        }
    }, [owner, repoName])

    return (
        <>
            {isFetching && <Preloader/>}
            <Rep rep={currentRep}/>
        </>
    )
}

let mapStateToProps = (state: RootState) => ({
    currentRep: state.common.currentRep,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    getRepositoryById
})(RepContainer)