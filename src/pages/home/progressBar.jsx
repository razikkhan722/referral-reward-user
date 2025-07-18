const PlanetProgress = ({ Pnt, prgicon,planets }) => {
  return (
  <ul className="list-unstyled mb-0 ps-4 pt-3 ">
  {planets.map((planet, index) => {
    const [start, end] = planet.range;
    
    const isActive = Pnt >= start && Pnt <= end;
    const showProgress = Pnt >= start;
  
    const showNextProgress = Pnt > end;

    return (
      <li
        key={index}
        className={`d-flex ${isActive ? "position-relative" : ""} `}
      >
        <div className="d-grid progress-side-sec">
          {/* Show previous progress hr if not active */}
           {index !==0 && (
            <hr className="opacity-100 progress-side-hr11" />
          )} 
          
          
          {/* Show current step image */}
          <img
            className="w-50 mx-auto"
            src={prgicon}
            alt="prgicon"
          />

          {/* Show active progress hr */}
          {isActive && <hr className="opacity-100 progress-side-hr" />}
        </div>

        {/* Tooltip for current range only */}
        {isActive && (
          <span className="position-absolute space-grotesk-medium font-12 tooltiptext p-2 rounded text-light-yellow">
            {Pnt} Meteors
          </span>
        )}

        {/* Planet Name */}
        <span
          className={`ms-2 progress-sect-name ${isActive && index == 0? "d-flex align-items-start":"d-flex align-items-end"} ${isActive &&  index !== 0 ? "d-flex align-items-center" :""}  ${
            isActive || Pnt > end
              ? "mt-0"
              : "progress-test-mt"
          } space-grotesk-medium font-16 text-blue-2`}
        >
          {planet.name}
        </span>
      </li>
    );
  })}
</ul>

  );
};
export default PlanetProgress;