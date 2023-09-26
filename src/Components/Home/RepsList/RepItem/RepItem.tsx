import { useNavigate } from "react-router"
import { IRep } from "../../../../Utils/types"
import classes from "./RepItem.module.css"
import Stars from "./Stars/Stars"

interface IProps {
    rep: IRep
}

const BookItem = (props: IProps) => {
    const { rep } = props

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/rep/${rep.ownerUsername}/${rep.name}`)
    }
    
    return (
        <div className={classes.main} onClick={onClick}>
            <div className={classes.info}>
                <h4>{rep.ownerUsername}/{rep.name}</h4>
                <p>{rep.description}</p>
                <Stars rating={rep.stars}/>
            </div>
        </div>
    )
}

export default BookItem