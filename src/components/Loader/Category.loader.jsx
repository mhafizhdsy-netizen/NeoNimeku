import CategoryCardLoader from "./CategoryCard.loader";

function CategoryLoader() {
  const categoryGridClass = "grid-cols-8 max-[1600px]:grid-cols-6 max-[1200px]:grid-cols-4 max-[758px]:grid-cols-3 max-[478px]:grid-cols-3 max-[478px]:gap-x-2";

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col mt-[74px] px-4 sm:px-6">
      <CategoryCardLoader 
        className="mt-6"
        gridClass={categoryGridClass}
        showTitleBox={true}
        showPagination={true}
        cardCount={16}
      />
    </div>
  );
}

export default CategoryLoader;
