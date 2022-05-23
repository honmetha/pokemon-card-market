import { FiShoppingBag } from "react-icons/fi";

interface DrawerTriggerProps {
  className?: string;
}

const DrawerTrigger = ({ className }: DrawerTriggerProps) => {
  return (
    <label
      htmlFor="my-drawer-4"
      className={`drawer-button btn text-white shadow-2xl shadow-apricot border-transparent bg-apricot hover:border-transparent hover:bg-apricot ${className}`}
    >
      <FiShoppingBag className="text-xl" />
    </label>
  );
};

export default DrawerTrigger;
