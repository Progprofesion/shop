import home from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useStore } from "zustand";
import { useCartItems } from "../../store/useStore";
import { useEffect } from "react";

const Cart = () => {
  // const { products, addProduct, removeProduct } = useStore();
  const navigate = useNavigate();
  const handleToBasket = () => {
    navigate("/");
  };
  const items = useCartItems();

  // Получаем массив продуктов из items
  const products = Object.values(items);
  useEffect(() => {
    console.log("store", products);
  }, [items]);

  // const cartData =
  return (
    <section className="cart">
      <img
        onClick={handleToBasket}
        className="navigate"
        src={home}
        alt="Карзина"
      />
      <div className="cart__wrapp">
        <div className="cart__info">
          <label htmlFor="">
            Выбрать все
            <input type="checkbox" />
          </label>
          <button>Удалить все</button>
        </div>
        <div className="cart__registerPrice">
          <button>Перейти к оформлению</button>
          <hr />
          <div className="cart__registerPrice__info">
            <p>Ваша корзина</p>
            <div>
              Товары 1 один <p>цена 156</p>
            </div>
          </div>
        </div>
        {products.map((product) => {
          return (
            <div className="cart__content">
              <img
                className="cart__image"
                src={product.image && product.image.toString()}
                alt="Карточка"
              />
              <div className="cart__content__info">
                <div className="cart__content__descr">
                  <p>{product.title}</p>
                  <p>{product.description}</p>
                </div>
                <div className="cart__content__actions">
                  <img src="" alt="Избранное" />
                  <img src="" alt="Удалить" />
                </div>
              </div>
              <div className="cart__content__addPrice">
                <p className="cart__price">{product.price}$</p>
                -<input type="number" />+
                <label className="cart__price__select" htmlFor="">
                  выбрать
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cart;
