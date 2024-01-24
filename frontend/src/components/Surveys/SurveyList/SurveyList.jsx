import React from "react";
import PropTypes from "prop-types";
import SurveyCard from "../SurveyCards/SurveyCard";
import "./SurveyList.css";

export default function SurveyList({ surveys }) {
  surveys.sort((a, b) => (b.Updated_At > a.Updated_At ? 1 : -1));

  return (
    <div className="survey-list">
      {surveys.map((survey) => (
        <SurveyCard key={survey.Survey_ID} survey={survey} />
      ))}
    </div>
  );
}

SurveyList.propTypes = {
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      Survey_ID: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Content: PropTypes.string.isRequired,
    })
  ).isRequired,
};
