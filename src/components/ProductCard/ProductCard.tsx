import React from "react";
import "./style.scss";
import { useCartItems, useCartStore } from "../../store/useStore";
interface Iitem {
  product: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  };
}

const ProductCard = ({ product }: Iitem) => {
  const items = useCartItems();
  console.log("store111", items);
  return (
    <article className="product">
      <header className="product__header">
        <h2 className="product__title">{product.title} Заголовок</h2>
        <div className="product__price">
          <meta itemProp="priceCurrency" content="RUB" />
          <span itemProp="price" content={product.price.toString()}>
            {product.price}
          </span>
        </div>
      </header>

      <figure className="product__image">
        картинка
        <img
          className=""
          src={product.image}
          alt="Красная футболка с хлопковым материалом"
          itemProp="image"
          width="400"
          height="250"
          loading="lazy"
        />
        <figcaption className="visually-hidden">
          Вид товара крупным планом
        </figcaption>
      </figure>

      <section className="product__description">
        <h3 className="visually-hidden">Описание товара</h3>
        <p>{product.description}</p>
      </section>
      <footer className="product__footer">
        <button
          type="button"
          className="buy-button"
          aria-label="Добавить в корзину"
          data-product-id="123"
        >
          Купить
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;
