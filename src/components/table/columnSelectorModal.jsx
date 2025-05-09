export const ColumnSelectorModal = ({
  allColumns,
  visibleColumns,
  onCheckboxChange,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-4 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Select Columns</h2>
        {allColumns.map((key) => (
          <label key={key} className="block mb-2">
            <input
              type="checkbox"
              checked={visibleColumns.includes(key)}
              onChange={() => onCheckboxChange(key)}
              className="mr-2"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-customRed text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
