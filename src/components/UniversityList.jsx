const UniversityList = ({ universities, sortClick }) => {
  return (
    <>
      <div className="sort">
        <button onClick={sortClick}>Sort</button>
      </div>
      <main>
        {universities.map((university, index) => {
          return (
            <figure key={`uni ${index}`}>
              <a href={university.url}>
                {university.name}
                <img
                  src={`https://source.unsplash.com/random/200x200?${university.name}`}
                  alt={university}
                />
              </a>
            </figure>
          );
        })}
      </main>
    </>
  );
};

export default UniversityList;
