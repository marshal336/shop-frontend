'use client'
//Core
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

//styles
import styles from "./Wrapper.module.scss";

//components
import WrapperHeader from "./Header";
import Timer from "./Timer";
import CardItem from "./Card";
import Category from "./Category";
import CustomButton from "../elements/button";
import Arrows from "../elements/arrows";
import Grid from "./Grid";

//types
import { CardDto } from "~/types/card";

//mock
import { arr } from "./Category/arr";

interface IWrapper {
  isValidToTimer?: boolean;
  isValidToCard?: boolean;
  isValidToAllCard?: boolean;
  isValidToCategory?: boolean;
  isValidToButton?: boolean;
  isValidToArowws?: boolean
  isValidToGrid?: boolean
  mainTitle: string;
  title: string;
  style?: string
  data?: CardDto[]
}


const Wrapper = ({
  isValidToTimer = false,
  isValidToCard = true,
  isValidToCategory = false,
  isValidToButton = false,
  isValidToArowws = false,
  isValidToAllCard = false,
  isValidToGrid = false,
  mainTitle,
  title,
  data,
  style
}: IWrapper) => {
  const date = 4 * 24 * 60 * 60 * 1000;
  const navigationPrevRef = React.useRef<HTMLDivElement>(null)
  const navigationNextRef = React.useRef<HTMLDivElement>(null)
  return (
    <section className={styles.root}>
      <div className={`${styles.header} ${isValidToArowws && 'justify-between'} ${isValidToButton && 'justify-between'} `}>
        <WrapperHeader mainTitle={mainTitle} title={title} />
        {isValidToTimer && <Timer date={date} />}
        {isValidToButton && <CustomButton title="View All" />}
        {isValidToArowws && <Arrows navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />}
      </div>
      {isValidToCard && (
        <div className={`${styles.card} ${style}`}>
          {data?.map((data, i) => (
            <CardItem {...data} key={i} />
          ))}
        </div>
      )}
      {isValidToAllCard &&
        <Swiper
          slidesPerView={4}
          className={`${styles.card} ${style}`}>
          {data?.map((data, i) => (
            <SwiperSlide key={i}>
              <CardItem {...data} key={i} />
            </SwiperSlide>
          ))}
        </Swiper>}
      {isValidToGrid && <Grid />}
      {isValidToCategory && <Category key={arr.length} navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />}
    </section>
  );
};

export default Wrapper;
