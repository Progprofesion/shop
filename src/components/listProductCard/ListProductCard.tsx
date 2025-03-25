import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ProductCard from "../ProductCard/ProductCard";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import { IFilterState } from "../../types/types";
import basket from "../../assets/basket.svg";
import { useTotalItems } from "../../store/useStore";
import { handlePriceSort, handleRatingSort } from "./utils/utils";
import { Button } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { useInitializeFilters } from "../../hooks/useInitializeFilters";
import { useProductFilters } from "../../hooks/useProductFilters";

const ListProductCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedFilterValue = useDebounce(searchTerm, 100);
  const [filters, setFilters] = useState<IFilterState>({
    maxPrice: 0,
    maxRating: 0,
    priceSort: null,
    ratingSort: null,
  });

  const { data: products = [], isLoading, isError } = useGetAllProducts();
  const total = useTotalItems();
  const navigate = useNavigate();

  useInitializeFilters(products, setFilters);
  const { sortedProducts } = useProductFilters(
    products,
    filters,
    debouncedFilterValue
  );

  if (isLoading) return <div className="loading">Загрузка товаров...</div>;
  if (isError) return <div className="error">Ошибка загрузки данных</div>;

  const handleToBasket = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="listProductCard__wrappAction">
        <Button
          className="product__buy"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => handlePriceSort(setFilters)}
        >
          Цена
          {filters.priceSort === "asc" ? " Больше" : " Меньше"}
        </Button>

        <Button
          className="product__buy"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => handleRatingSort(setFilters)}
        >
          Рейтинг
          {filters.ratingSort === "asc" ? " Больше" : " Меньше"}
        </Button>

        <input
          name="filteredInput"
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="listProductCard__filter"
        />
        <img
          onClick={handleToBasket}
          className="navigate"
          src={basket}
          alt="Корзина"
        />
        <span className="listProductCard__count">
          <p>{total}</p>
        </span>
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
