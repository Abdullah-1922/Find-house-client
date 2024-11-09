import dynamic from "next/dynamic";

const ListGridPage = () => {
  const ListComponent = dynamic(
    () => import("@/app/(commonLayout)/list-grid/_components/ListPageComponent")
  );

  return (
    <div className="container max-w-[1200px]">
      <ListComponent />
    </div>
  );
};

export default ListGridPage;
