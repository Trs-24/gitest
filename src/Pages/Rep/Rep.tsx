import classes from "./Rep.module.css"
import { IRep } from "../../Utils/types"
import { NavLink } from "react-router-dom"
import { BiLeftArrowAlt } from "react-icons/bi"
import Stars from "../../Components/Home/RepsList/RepItem/Stars/Stars"

interface IProps {
    rep: IRep | null
}

const Rep = (props: IProps) => {
    const { rep } = props

    return (
        <div className={classes.container}>
            <div className={classes.navigation}>
                <BiLeftArrowAlt/>
                <NavLink to="/">Back to Main page</NavLink>
            </div>
            <div className={classes.main}>
                <div className={classes.info}>
                    <h3>{rep?.name}</h3>
                    <p className={classes.author}>by {rep?.ownerUsername}</p>
                    <p className={classes.description}>{rep?.description}</p>
                    {rep && (
                        <Stars rating={rep.stars}/>
                    )}
                    <a href={rep?.url} target="_blank">Go to the GitHub repo</a>
                </div>
            </div>
        </div>
    )
}

export default Rep