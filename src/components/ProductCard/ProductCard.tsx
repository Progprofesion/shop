import Button from "@mui/material/Button";
import "./style.scss";
import { useCartStore } from "../../store/useStore";
import { Product } from "../../types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product">
      <header className="product__header">
        <h2 className="product__title">{product.title}</h2>
        <div className="product__price">
          <meta itemProp="priceCurrency" content="RUB" />
          <span itemProp="price" content={product.price.toString()}>
            цена {product.price} $
          </span>
        </div>
      </header>

      <figure className="product__image">
        <img
          className=""
          src={product.image}
          alt="Красная футболка с хлопковым материалом"
          width="400"
          height="250"
          loading="lazy"
        />
      </figure>

      <section className="product__description">
        <h3>Описание товара</h3>
        <p>{product.description}</p>
      </section>
      <footer className="product__footer">
        <Button
          className="product__buy"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => useCartStore.getState().addItem(product)}
        >
          купить
        </Button>
      </footer>
    </article>
  );
};

export default ProductCard;
