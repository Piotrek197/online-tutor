import {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types";
import TutorOpinions from "./Tutor/TutorOpinions";
import TutorImage from "./Tutor/TutorImage";
import TutorAbout from "./Tutor/TutorAbout";
import TutorSubjects from "./Tutor/TutorSubjects";
import "./scss/Tutor.scss";

const TutorPage = () => {


  return (
    <section className="tutor">
      <div className="first-section">
        <div className="first-section__left">
          <TutorImage />
          <TutorAbout />
        </div>
        <div className="first-section__right">
          <div className="calendar-wrapper">
            <Calendar value={Date()} className={"calendar"} />
          </div>
          <TutorSubjects />
        </div>
      </div>
      <TutorOpinions />
    </section>
  );
};

export default TutorPage;
