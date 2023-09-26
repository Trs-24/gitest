import { Dispatch } from "redux"
import { gitApi } from "../Api/api"
import { IRep } from "../Utils/types"

const SET_REPS_DATA = "SET_REPS_DATA"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_CURRENT_REP_DATA = "SET_CURRENT_REP_DATA"
const SET_TOTAL = "SET_TOTAL"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

interface CommonState {
    reps: IRep[]
    currentRep: IRep | null
    isFetching: boolean
    total: number
    pageSize: number
    currentPage: number
}

const initialState: CommonState = {
    reps: [],
    currentRep: null,
    isFetching: false,
    total: 0,
    pageSize: 25,
    currentPage: 0
}

interface SetRepsDataAction {
    type: typeof SET_REPS_DATA
    reps: IRep[]
}

interface SetIsFetchingAction {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

interface SetCurrentRepAction {
    type: typeof SET_CURRENT_REP_DATA,
    currentRep: IRep
}

interface SetTotalAction {
    type: typeof SET_TOTAL,
    total: number
}

interface SetPageSizeAction {
    type: typeof SET_PAGE_SIZE,
    pageSize: number
}

interface SetCurrentPageAction {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

type CommonActionTypes = SetRepsDataAction | SetIsFetchingAction | SetCurrentRepAction | SetTotalAction | SetCurrentPageAction | SetPageSizeAction;

const commonReducer = (
    state: CommonState = initialState,
    action: CommonActionTypes
): CommonState => {
    switch (action.type) {
        case SET_REPS_DATA: {
            return { ...state, reps: action.reps }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_CURRENT_REP_DATA: {
            return { ...state, currentRep: action.currentRep }
        }
        case SET_TOTAL: {
            return { ...state, total: action.total }
        }
        case SET_PAGE_SIZE: {
            return { ...state, pageSize: action.pageSize }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        default:
            return state
    }
}

export const setRepsData = (
    reps: IRep[]
): SetRepsDataAction => ({
    type: SET_REPS_DATA,
    reps
})

export const setIsFetching = (
    isFetching: boolean
): SetIsFetchingAction => ({
    type: SET_IS_FETCHING,
    isFetching
})

export const setCurrentRepData = (
    currentRep: IRep
): SetCurrentRepAction => ({
    type: SET_CURRENT_REP_DATA,
    currentRep
})

export const setTotal = (
    total: number
): SetTotalAction => ({
    type: SET_TOTAL,
    total
})

export const setPageSize = (
    pageSize: number
): SetPageSizeAction => ({
    type: SET_PAGE_SIZE,
    pageSize
})

export const setCurrentPage = (
    currentPage: number
): SetCurrentPageAction => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const getReps = (searchValue: string, page: number, pageSize: number) => async (dispatch: Dispatch<CommonActionTypes>) => {
    dispatch(setIsFetching(true))
    try {   
        let response = await gitApi.getRepositories(searchValue, page, pageSize)
        const reps: IRep[] = response.items.map((el: any) => ({
            id: el.id,
            name: el.name,
            description: el.description,
            ownerUsername: el.owner.login,
            stars: Number(el.score),
            url: el.html_url
        }))
        dispatch(setRepsData(reps))
        dispatch(setTotal(Number(response.total_count)))
        dispatch(setIsFetching(false))
    } catch (err) {
        dispatch(setIsFetching(false))
    }
}

export const getRepositoryById = (owner: string, repoName: string) => async (dispatch: Dispatch<CommonActionTypes>) => {
    dispatch(setIsFetching(true))
    try {
        let response = await gitApi.getRepositoryById(owner, repoName)
        console.log(response)

        const rep: IRep = {
            id: response.id,
            name: response.name,
            description: response.description,
            ownerUsername: response.owner.login,
            stars: Number(response.score),
            url: response.html_url
        }
        dispatch(setCurrentRepData(rep))
        dispatch(setIsFetching(false))
    } catch (err) {
        dispatch(setIsFetching(false))
    }
}


export default commonReducer
