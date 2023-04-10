import React from "react";
import css from "../styles/dropdown.module.scss";
import PinIcon from "./icons/PinIcon";
import PinSelectedIcon from "./icons/PinSelectedIcon";
import { useImmer } from "use-immer";
import useOnClickOutside from "../hooks/use-click";

const Dropdown = ({ items: _items, onSelect: _onSelect }) => {
  // props.name
  const [items, setItem] = React.useState(_items);

  React.useEffect(() => {
    setItem(items);
  }, [items]);
  const [isOpen, setOpen] = React.useState(false);
  // VALUES
  const [pinned, setPinned] = useImmer([]);
  const [selected, setSelected] = React.useState("");

  const toggleDropdown = () => setOpen(!isOpen);
  const ref = useOnClickOutside(() => setOpen(false));

  const onSelect = (value) => {
    setSelected(value?.name);
  };
  const onPin = (value) => {
    setPinned((draft) => {
      if (draft.some((item) => item?.name?.includes(value?.name))) {
        draft = draft.filter((item) => item?.name !== value?.name);
        return draft;
      }
      if (draft.length > 2) {
        return draft;
      }
      draft.push(value);
    });
  };
  React.useMemo(() => {
    if (_onSelect) _onSelect({ selected, pinned });
  }, [_onSelect, pinned, selected]);

  return (
    <div className={css["dropdown"]} ref={ref}>
      <div className={css["dropdown-header"]} onClick={toggleDropdown}>
        {/* {selected
          ? `${items?.find((item) => item.name === selected).name} `
          : "Select Country"} */}
        <ul>
          {pinned.length > 0
            ? pinned?.map(({ name }) => {
                return <li>{`[${name}]`}</li>;
              })
            : "Select Country"}
        </ul>
      </div>
      {isOpen && (
        <div className={`${css["dropdown-body"]} `}>
          {items.map((item, index) => {
            const active = item.name === selected;

            return (
              <div
                key={index}
                className={css["dropdown-item"]}
                onClick={() => onSelect(item)}
              >
                {item.name}
                <span
                  className={css["center"]}
                  onClick={(event) => {
                    onPin(item);
                    event.stopPropagation();
                  }}
                >
                  {pinned.some((v) => v?.name?.includes(item?.name)) ? (
                    <PinSelectedIcon height={16} width={16} fill="#555" />
                  ) : (
                    <PinIcon height={16} width={16} fill="#555" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
