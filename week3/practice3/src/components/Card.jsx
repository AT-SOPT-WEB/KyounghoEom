// Card.jsx
import style from './Card.module.css';

const Card = ({ id, name, github, englishName }) => {
    return (
        <div className={style.card}>
            <h2 className={style.card__name}>이름 : {name}</h2>
            <p className={style.card__github}>깃헙 : {github}</p>
            <p className={style.card__englishName}>영문 이름 : {englishName}</p>
        </div>
    );
};

export default Card;
