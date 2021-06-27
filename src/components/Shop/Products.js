import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_DATA = [
  {
    id: "q1",
    title: "First Book",
    price: 6,
    description: "This is the first book",
  },
  {
    id: "q2",
    title: "Second Book",
    price: 8,
    description: "This is the second book",
  },
  {
    id: "q3",
    title: "Third Book",
    price: 10,
    description: "This is the third book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((data) => {
          return (
            <ProductItem
              key={data.id}
              id={data.id}
              title={data.title}
              price={data.price}
              description={data.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
