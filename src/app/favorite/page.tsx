"use client";
//core
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

//toastify
import { toast } from 'react-toastify';

//interface
import { IAddCardDto } from "~/types/card";

//icons
import { IoTrashOutline } from "react-icons/io5";

//styles
import styles from "./Favorite.module.scss";

//selector
import { deleteFavorite, favoritesItems } from "~/redux/reducers/favorite";

//reducer
import { add } from "~/redux/reducers/post";

//types
import { IAddToCard } from './types';

function FavoritePage() {
  const items = useSelector(favoritesItems);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    toast.warn('You deleted from favorites')
    dispatch(deleteFavorite(id));
  };

  const handleAddToCard = ({ id, logo, prices }: IAddToCard) => {
    const post: IAddCardDto = { id, logo, prices: prices[0], count: 1 }
    toast.success('You added product to cart!')
    dispatch(add(post));
  };

  const itemsJSX= items.map(({ id, flashSales, logo, title, prices }) => {
    return (
      <div key={id} className={styles["favorite-item"]}>
        <div className={styles["favorite-detail"]}>
          <div className={styles["favorite-menu"]}>
            <span className={flashSales ? styles["favorite-flash"] : ""}>
              {flashSales}
            </span>
            <span className={styles["favorite-trash"]}>
              <IoTrashOutline onClick={() => handleRemove(id)} />
            </span>
          </div>
          <div className={styles["favorite-photo"]}>
            <img src={logo} alt={title} />
          </div>
        </div>
        <div
          className={styles["favorite-link"]}
          onClick={() => handleAddToCard({id, logo,prices})}>
          Add To Cart
        </div>
        <div className={styles["favorite-info"]}>
          <Link href={`product/${id}`}>
            <h3>{title}</h3>
          </Link>
          <p>
            ${prices[0]}
            <span>{prices[1] ? `$${prices[1]}` : ""}</span>
          </p>
        </div>
      </div>
    );
  })
  return (
    <div>
      <div className={styles["favorite"]}>
        <h2>Wishlist ({items.length})</h2>
      </div>

      <div className={styles["favorites"]}>
        
      {items.length ? itemsJSX : "You haven't added any products yet :(" }

      </div>
    </div>
  );
}

export default FavoritePage;
