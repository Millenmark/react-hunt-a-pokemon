import AddModal from "../components/AddModal";

const Header = () => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row justify-between px-7 py-4 bg-orange-100 fixed w-full">
      <h1 className="font-bold text-4xl">Hunt A Pokemon!</h1>
      <AddModal />
    </div>
  );
};

export default Header;
