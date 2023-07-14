import AddModal from "../components/AddModal";

const Header = () => {
  return (
    <div className="flex justify-between my-5">
      <h1>Hunt A Pokemon!</h1>
      <AddModal />
    </div>
  );
};

export default Header;
