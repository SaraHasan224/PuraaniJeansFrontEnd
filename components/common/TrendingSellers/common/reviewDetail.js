import { Media } from "reactstrap";

export function ReviewMedia(props){
    const { review } = props;
    return (
        <li>
            <div className="media">
                <Media src={review.img} alt="Generic placeholder image" />
                <div className="media-body">
                    <h4>{review.name}</h4>
                    <h6>({review.datetime})</h6>
                    <p>{review.review}</p>
                </div>
            </div>
        </li>
    );
};