import { useState } from "react";

const SearchBar = ({ universities, setUniversities, isSorted }) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  return (
    <div className="inputWrapper">
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
      />
      <button
        disabled={!value ? true : false}
        onClick={() => {
          const filtered = universities.filter((obj) =>
            obj.name.includes(value)
          );
          if (isSorted) {
            setUniversities([
              ...filtered.sort((a, b) => (a.name < b.name ? -1 : 1)),
            ]);
          } else {
            setUniversities(filtered);
          }
          setCount((count) => count + 1);
          setValue("");
        }}
      >
        Search
      </button>
      <span>You searched {count} times</span>
    </div>
  );
};

export default SearchBar;
