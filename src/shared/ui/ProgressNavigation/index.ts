import { ProgressNavigationContainer } from './Container/index';
import { ProgressNavigationItem } from './Item';

type ProgressNavigationComponent = typeof ProgressNavigationContainer & {
  Item: typeof ProgressNavigationItem;
};

export const ProgressNavigation: ProgressNavigationComponent = Object.assign(
  ProgressNavigationContainer,
  {
    Item: ProgressNavigationItem,
  },
);
export default ProgressNavigation;
