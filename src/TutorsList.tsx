import "./scss/TutorsList.scss";

const TutorsList = () => {
  return (
    <div className="tutorslist">
      <div className="tutorslist__filters">
        Filter by subject, next availalbe date (available whenever, in 3 three days, tommorow) Sort
        by opinions, price
      </div>
      <div className="tutorslist__list">
        <div className="tutor-element">
          <span className="tutor-element__img"></span>
          <p className="tutor-element__name">
            <a href="#">Name Surname</a>
          </p>
          <small className="tutor-element__position">Position</small>
          <div className="tutor-element__stars">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
          </div>
          <p className="price">
            {new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(123.34)}
          </p>
          <div className="available-date">
            Next available date: 15.04.2023 <a href="#">Book now.</a>
          </div>
        </div>
        <div className="tutor-element"></div>
        <div className="tutor-element"></div>
        <div className="tutor-element"></div>
        <div className="tutor-element"></div>
        <div className="tutor-element"></div>
      </div>
    </div>
  );
};

export default TutorsList;
