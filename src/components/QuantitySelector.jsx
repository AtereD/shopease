import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, onIncrease, onDecrease}) => {
  return (
    <div className={`flex items-center md:gap-3 border border-border rounded-lg w-fit p-2 gap-1` }>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-1 hover:bg-soft-grey rounded disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>

      <span className="text-sm font-medium min-w-5 text-center">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="p-1 hover:bg-soft-grey rounded"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;