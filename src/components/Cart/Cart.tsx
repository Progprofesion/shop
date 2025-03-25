import home from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import {
  useCartItems,
  useCartStore,
  useSelectedItems,
  useTotalItems,
  useTotalPrice,
} from "../../store/useStore";
import { useState } from "react";
import deleteBasket from "../../assets/delete.svg";
import ModalWindow from "../ModalWindow";
import { Product } from "../../types/types";
import { Button } from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const handleToBasket = () => {
    navigate("/");
  };
  const [isModal, setIsModal] = useState(false);
  const items = useCartItems();
  const total = useTotalItems();
  const totalPrice = useTotalPrice();
  const selectedItems = useSelectedItems();
  const toggleItemSelection = useCartStore.getState().toggleItemSelection;
  const clearCart = useCartStore.getState().clearCart;
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [localTotalPrice, setLocalTotalPrice] = useState(0);
  const resetAllCheckboxes = useCartStore.getState().resetSelection;

  const products = Object.values(items);

  const handleSubmitOrder = () => {
    const selectedProductIds = Object.entries(selectedItems)
      //eslint-disable-next-line
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);

    if (selectedProductIds.length === 0) {
      setIsModal(true);
      return;
    }

    const selectedProductsData = selectedProductIds.map((id) => ({
      ...items[id],
      quantity: items[id]?.quantity,
      totalPrice: items[id].price * items[id].quantity!,
    }));

    // Сохраняем общую сумму до очистки
    setLocalTotalPrice(totalPrice);
    setSelectedProducts(selectedProductsData);
    setIsModal(true);

    resetAllCheckboxes();
    // clearCart(); // Очищаем корзину после сохранения данных
  };

  return (
    <section className="cart">
      {isModal && (
        <ModalWindow
          title={
            selectedProducts.length > 0
              ? ` Выбранные товары на сумму ${localTotalPrice.toFixed(2)} $ `
              : "Корзина пуста"
          }
          children={selectedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>Количество: {product.quantity}</p>
                <p>Цена: {product.price}$</p>
                <p>Общая сумма {product.totalPrice!.toFixed(2)}</p>
              </div>
            </div>
          ))}
          setClose={setIsModal}
        />
      )}
      <img
        onClick={handleToBasket}
        className="navigate"
        src={home}
        alt="Карзина"
      />

      <div className="cart__wrappInfo">
        <div className="cart__info">
          <label htmlFor="selectAll">
            Выбрать все
            <input
              type="checkbox"
              id="selectAll"
              checked={
                products.length > 0 &&
                products.every((product) => selectedItems[product.id])
              }
              onChange={() => {
                products.forEach((product) => toggleItemSelection(product.id));
              }}
            />
          </label>
          <button onClick={() => clearCart()}>Удалить все</button>
        </div>

        <div className="cart__registerPrice">
          <button
            onClick={() => {
              handleSubmitOrder();
              setIsModal(true);
            }}
          >
            Перейти к оформлению
          </button>

          <hr />

          <div className="cart__registerPrice__info">
            <p>Ваша корзина</p>
            <div>
              Товары {total}
              <p>цена {totalPrice.toFixed(2)} $</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cart__wrapp">
        {products.map((product) => {
          const isSelected = selectedItems[product.id] || false;

          return (
            <div key={product.id} className="cart__content">
              <figure>
                <img
                  width="400"
                  height="250"
                  loading="lazy"
                  className="cart__image"
                  src={product.image && product.image.toString()}
                  alt="Карточка"
                />
              </figure>

              <div className="cart__content__info">
                <div className="cart__content__descr">
                  <h3>{product.title}</h3>
                  <label>
                    выбрать
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItemSelection(product.id)}
                    />
                  </label>
                </div>

                <span className="cart__indicator">
                  <p>{product.quantity}</p>
                </span>

                <div className="cart__content__addPrice">
                  <p className="cart__price">цена {product.price}$</p>
                  <Button
                    className="cart__button"
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={() => useCartStore.getState().addItem(product)}
                  >
                    добавить
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    className="cart__button"
                    onClick={() =>
                      useCartStore.getState().removeItem(product.id)
                    }
                  >
                    убавить
                  </Button>
                </div>
              </div>
              <div className="cart__content__basket">
                <img
                  onClick={() =>
                    useCartStore.getState().removeItemCompletely(product.id)
                  }
                  src={deleteBasket}
                  alt="Удалить"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cart;
