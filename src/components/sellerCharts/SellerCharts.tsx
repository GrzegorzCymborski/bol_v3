import { definitions } from '../../types/swagger-types';

const SellerCharts = ({ carts, economies, self }: definitions['Model1']) => {
  console.log(carts, economies, self);
  return <h1>{self}</h1>;
};

export default SellerCharts;
