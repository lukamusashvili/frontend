import { useState } from "react";
import { ColumnSelectorModal } from "./ColumnSelectorModal";
import { EditFilled, SettingFilled, FilterFilled } from "@ant-design/icons";

export const Table = ({ data, filterableColumns }) => {
  const allColumns = Object.keys(data[0]);
  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log("Edit icon clicked");
  };

  const handleFilter = () => {
    console.log("Filter icon clicked");
  };

  return (
    <div className="w-full">
      {isModalOpen && (
        <ColumnSelectorModal
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          onCheckboxChange={handleCheckboxChange}
          onClose={toggleModal}
        />
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full mt-10 rounded-lg">
          <thead className="bg-customRed text-white text-sm h-16">
            <tr>
              {allColumns
                .filter((key) => visibleColumns.includes(key))
                .map((key) => (
                  <th key={key} className="text-left px-2">
                    <span className="flex justify-between items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {filterableColumns.includes(key) && (
                        <div onClick={handleFilter}>
                          <FilterFilled />
                        </div>
                      )}
                    </span>
                  </th>
                ))}
              <th
                className="text-left px-2 cursor-pointer"
                onClick={toggleModal}
              >
                <SettingFilled />
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="h-16 border-b border-gray-200">
                {allColumns
                  .filter((key) => visibleColumns.includes(key))
                  .map((key, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-2 max-w-[150px] truncate"
                      title={item[key]}
                    >
                      {item[key]}
                    </td>
                  ))}
                <td
                  className="text-left px-2 cursor-pointer"
                  onClick={handleEdit}
                >
                  <EditFilled />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
