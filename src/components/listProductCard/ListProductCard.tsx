import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ProductCard from "../ProductCard/ProductCard";
import useGetAllProducts from "../../hooks/useGetAllProducts"; // Вынесите интерфейсы в отдельный файл
import { IFilterState } from "../../types/types";
import basket from "../../assets/basket.svg";
const ListProductCard = () => {
  const [filterValue, setFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilterState>({
    maxPrice: 0,
    maxRating: 0,
    priceSort: null,
    ratingSort: null,
  });

  const { data: products = [], isLoading, isError } = useGetAllProducts();
  const navigate = useNavigate();
  // Инициализация фильтров при получении данных
  useEffect(() => {
    if (products.length > 0) {
      setFilters((prev) => ({
        ...prev,
        maxPrice: Math.max(...products.map((p) => p.price)),
        maxRating: Math.max(...products.map((p) => p.rating.rate)),
      }));
    }
  }, [products]); // Зависимость от products

  const handlePriceSort = () => {
    setFilters((prev) => ({
      ...prev,
      priceSort: prev.priceSort === "asc" ? "desc" : "asc",
      ratingSort: null,
    }));
  };

  const handleRatingSort = () => {
    setFilters((prev) => ({
      ...prev,
      ratingSort: prev.ratingSort === "asc" ? "desc" : "asc",
      priceSort: null,
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(filterValue.toLowerCase()) &&
      product.price <= filters.maxPrice &&
      product.rating.rate <= filters.maxRating
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.priceSort) {
      return filters.priceSort === "asc"
        ? a.price - b.price
        : b.price - a.price;
    }
    if (filters.ratingSort) {
      return filters.ratingSort === "asc"
        ? a.rating.rate - b.rating.rate
        : b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  if (isLoading) return <div className="loading">Загрузка товаров...</div>;
  if (isError) return <div className="error">Ошибка загрузки данных</div>;
  // Дополнительные рекомендации:
  // Добавьте CSS-анимации для плавных переходов
  // Реализуйте debounce для поискового инпута
  // Вынесите логику сортировки/фильтрации в отдельные хуки
  // Добавьте пагинацию или бесконечный скролл
  // Реализуйте сброс фильтров при отсутствии результатов
  const handleToBasket = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className="listProductCard__wrappAction">
        <button onClick={handlePriceSort}>
          Цена
          {filters.priceSort === "asc" ? " Больше" : " Меньше"}
        </button>
        <button onClick={handleRatingSort}>
          Рейтинг
          {filters.ratingSort === "asc" ? " Больше" : " Меньше"}
        </button>
        <input
          name="filteredInput"
          type="text"
          placeholder="Поиск товаров..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="listProductCard__filter"
        />
        <img
          onClick={handleToBasket}
          className="navigate"
          src={basket}
          alt="Карзина"
        />
      </div>
      <section className="listProductCard">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ListProductCard;
