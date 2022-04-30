import React from "react";

const categories = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

const ProjectFilter = ({ selected, changeFilter }) => {
  const handleClick = (category) => {
    changeFilter(category);
    console.log(category);
  };

  return (
    <div className="project-filter">
      <nav>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={selected === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
