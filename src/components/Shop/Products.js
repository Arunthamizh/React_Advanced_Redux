import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { CartAction } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';
const DUMMY_PRODUCTS = [
  { id: 'p1', price: 6, title: 'First', description: 'first test product' },
  { id: 'p2', price: 4, title: 'Second', description: 'Second test product' },
  { id: 'p3', price: 10, title: 'Test', description: 'Test' },
]


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description
            }
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
