"use client";
import { Card } from "@chakra-ui/react";
import React from "react";
import { ICardItemProps } from "~/types/cardt.t";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import styles from "./Card.module.scss";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

const CardItem = ({
  id,
  flashSales,
  title,
  prices,
  star,
  comments,
  logo,
}: ICardItemProps) => {
  const [hover, setHover] = React.useState(false);

  
  return (
    <Card
      className={styles.Card}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.block}>
        <div className={styles.flashSales}>{flashSales}</div>
        <div className={styles.icons}>
          <CiHeart className={styles.heart} />
          <MdOutlineRemoveRedEye className={styles.eye} />
        </div>
        <img src={logo!} alt="logo" width={172} height={152} />
        <Link
          href={`/${id}`}
          className={` ${hover ? "bottom-0" : "bottom-[-40px]"} ${styles.Link}`}
        >
          Add To Cart
        </Link>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.prices}>
          <p className={styles.priceMain}>{prices![0]}</p>
          <p className={styles.twoPrice}>{prices![1]}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.stars}>
          {[...new Array(5)].map((_, i) => {
            const filledStars = star;
            const hasHalfStar = star % 1 == 0;
        
            if (i < filledStars) {
          return <FaStar key={i} size={20} color="#ffd700" />;
        } else if (i === filledStars && hasHalfStar) {
          return <FaStarHalfAlt key={i} size={20} color="#ffd700" enableBackground="grey" />;
        } else {
          return <BsStar key={i} size={20} color="#ffd700" />;
        }
      })}

          </div>
          <div className={styles.comments}>{comments}</div>
        </div>
      </div>
    </Card>
  );
};
// star-half-filled.svg
export default CardItem;
