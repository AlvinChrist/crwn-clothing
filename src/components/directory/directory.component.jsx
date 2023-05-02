import CategoryItem from "../category-item/category-item.component";
import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    <div class="directory-container">
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default Directory;
