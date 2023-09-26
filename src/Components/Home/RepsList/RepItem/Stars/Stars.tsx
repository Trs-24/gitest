import classes from "./Stars.module.css"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface IProps {
    rating: number
}

const Stars = (props: IProps) => {
    const { rating } = props

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<AiFillStar color="gold"/>);
        } else {
            stars.push(<AiOutlineStar color="gray"/>);
        }
    }

    return (
        <div className={classes.main}>
            {stars.map(el => el)}
        </div>
    )
}

export default Stars