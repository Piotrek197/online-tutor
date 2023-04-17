const TutorImage = () => {
  return (
    <div className="first-section-hi">
      <div className="tutor-image-wrapper">
        <span className="tutor__image"></span>
      </div>
      <div className="basic-informations">
        <h1>Name Surname</h1>
        <h2>Positon</h2>
        {/* <div className="opinion-starts">opinion stars</div> */}
          <button>
          <span style={{width: "35px", height: "25px", border: "1px  solid white", display: "inline-block"}}></span>
          Message me
          </button>
      </div>
    </div>
  );
};

export default TutorImage;
