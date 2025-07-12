import React from "react";

const MenuSection = ({ section, index, isOpen, toggleSection }) => {
  const title = section.card.card.title;
  const items = section.card.card.itemCards || [];

  return (
    <div key={index} className="mb-10 flex border-b  p-3 bg-gray-200 rounded-lg flex-col">
      <div
        className="flex justify-between  border-gray-700 items-center cursor-pointer group "
        onClick={() => toggleSection(index)}
      >
        <h2 className="text-xl font-semibold  pb-1 mb-4 group-hover:text-emerald-600 transition">
          {title}
        </h2>
        <span className="text-xl mb-4">{isOpen ? "🔼" : "🔽"}</span>
      </div>

      {isOpen && (
        <ul className="divide-y">
          {items.map((itemCard, idx) => {
            const item = itemCard.card.info;
            return (
              <li
                key={idx}
                className="py-4 flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-1">{item.name}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-500 mb-1">
                      {item.description}
                    </p>
                  )}
                  <p className="text-sm font-semibold">
                    ₹{(item.price || item.defaultPrice) / 100}
                  </p>
                </div>
                {item.imageId && (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MenuSection;
