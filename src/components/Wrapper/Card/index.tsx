"use client";
import { Card } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ICardItemProps } from "~/types/cardt.t";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import styles from "./Card.module.scss";

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
        <Image src={logo!} alt="logo" width={172} height={152} />
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
            {Number(id) === 0 ? (
              <>
                {[...new Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={star!}
                    alt="star"
                    width={20}
                    height={20}
                  />
                ))}
              </>
            ) : Number(id) === 1 ? (
              <>
                {[...new Array(4)].map((_, i) => (
                  <>
                    <Image
                      key={i}
                      src={star!}
                      alt="star"
                      width={20}
                      height={20}
                    />
                    {i === 3 && (
                      <Image
                        key={i}
                        src={"/empty-star.svg"}
                        alt="star"
                        width={20}
                        height={20}
                      />
                    )}
                  </>
                ))}
              </>
            ) : Number(id) === 2 ? (
              <>
                {[...new Array(4)].map((_, i) => (
                  <>
                    <Image
                      key={i}
                      src={star!}
                      alt="star"
                      width={20}
                      height={20}
                    />
                    {i === 3 && (
                      <Image
                        key={i}
                        src={"/star-half-filled.svg"}
                        alt="star"
                        width={20}
                        height={20}
                      />
                    )}
                  </>
                ))}
              </>
            ) : Number(id) === 3 ? (
              <>
                {[...new Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={star!}
                    alt="star"
                    width={20}
                    height={20}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.comments}>{comments}</div>
        </div>
      </div>
    </Card>
  );
};
// star-half-filled.svg
export default CardItem;
