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
    <article className="product" itemScope itemType="http://schema.org/Product">
      <button onClick={() => useCartStore.getState().addItem(product)}>
        Добавить в корзину
      </button>
      <header className="product-header">
        <h2 className="product-title" itemProp="name">
          {product.title} Заголовок
        </h2>
        <div
          className="product-price"
          itemProp="offers"
          itemScope
          itemType="http://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="RUB" />
          <span itemProp="price" content={product.price.toString()}>
            {product.price}
          </span>
        </div>
      </header>

      <figure className="product-image">
        картинка
        <img
          src={product.image}
          alt="Красная футболка с хлопковым материалом"
          itemProp="image"
          width="600"
          height="400"
          loading="lazy"
        />
        <figcaption className="visually-hidden">
          Вид товара крупным планом
        </figcaption>
      </figure>

      <section className="product-description" aria-labelledby="desc-heading">
        <h3 id="desc-heading" className="visually-hidden">
          Описание товара
        </h3>
        <p itemProp="description">{product.description}</p>
      </section>

      <section className="product-variants" aria-labelledby="variants-heading">
        <h3 id="variants-heading" className="visually-hidden">
          Доступные варианты
        </h3>

        <div className="variant-selector">
          <label htmlFor="size-select">Размер</label>
          {/* <select
            id="size-select"
            name="size"
            className="variant-select"
            aria-describedby="size-help"
          >
            <option value="">Выберите размер</option>
            <option value="S">S</option>
            <option value="M">M</option>
          </select> */}
          <span id="size-help" className="help-text">
            Таблица размеров
          </span>
        </div>

        <div className="variant-selector">
          <label htmlFor="color-select">Цвет</label>
          {/* <select id="color-select" name="color" className="variant-select">
            <option value="">Выберите цвет</option>
            <option value="red" data-color-hex="#ff0000">
              Красный
            </option>
          </select> */}
        </div>
      </section>

      <footer className="product-footer">
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
