import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./SupportPage.scss"; // Ensure you create this CSS file or include styles directly

const SupportPage = () => {
  const sections = [
    {
      title: "Project Overview",
      content: `ECO Insight - an Early-stage Carbon Impact Observer for Intelligent Sustainability Forecasting in Buildings.<br><br>Developed by Daniel Favour O. Oshidero as part of an MSc in Computer Science at The University of Bath (2023/24). 
                <br><br> 
                ECO Insight aims to close the gap in sustainable architectural integrations by introducing an intelligent model capable of translating early-stage design descriptions into precise estimates of material masses and embodied carbon footprints.`,
      position: { gridColumn: "1 / span 2", gridRow: "1 / span 5" },
    },
    {
      title: "Research Statement",
      content: `The investigation and development of a machine learning (ML) model and end-user tool for the prediction of highly accurate carbon impact analyses from early outlines, with potential future integration into existing architectural design pipelines.`,
      position: { gridColumn: "3 / span 4", gridRow: "1 / span 2" },
    },
    {
      title: "Abstract",
      content: `An increasing need for carbon awareness and sustainable architecture has prompted the development of tools that can predict and mitigate the environmental impact of new constructions from the earliest stages of design.
                <br><br>
                ECO Insight is designed to integrate early-stage impact assessments into architectural processes, providing architects with immediate feedback on the carbon implications of their design choices, fostering more sustainable design practices from the outset.`,
      position: { gridColumn: "3 / span 4", gridRow: "3 / span 3" },
    },
    {
      title: "Expected Impact of Research",
      content: `The integration of intelligent learning techniques with environmental impact assessment could significantly transform the conceptualisation stage of building design with respect to their carbon footprint.
                <br><br>
                By equipping designers with the ability to predict the carbon impact of their proposals early and accurately, this research allows them to make informed, proactive decisions.`,
      position: { gridColumn: "5 / span 2", gridRow: "6 / span 4" },
    },
    {
      title: "Potential Applications",
      content: `- Existing building carbon audits with reduction recommendations.
                <br><br>
                - Real time carbon predictions in design meetings to enhance carbon awareness.
                <br><br>
                - Design optimisation capabilities through inverse predictions to find ideal parameters for carbon goals.
                <br><br>
                - Integration with operational energy systems for carbon offset forecasting. `,
      position: { gridColumn: "5 / span 2", gridRow: "10 / span 4" },
    },
    {
      title: "Tool Specifications",
      content: `This tool utilizes a robust dataset of 150,000 synthetic datapoints generated from pre-existing carbon calculators. Synthetic data has been used as there currently exists too large of a gap in existing research and data to currently predict whole building carbon from that data. 
                <br><br>
                These calculators used to generate carbon impact employ carbon factors derived from the Inventory of Carbon and Energy (ICE) database and Environmental Product Declarations (EPDs).
                <br><br>
                The full pipeline is as follows:
                <br><br>
                <div style="text-align: center;">
                Initial data entry in text form.
                <br> &darr; <br>
                Feature Extraction using NLP techniques, including SpaCy's en_core_web_trf model for Named Entity Recognition and the all-mpnet-base-v2 model from Sentence Transformers for semantic similarity.
                <br> &darr; <br>
                A Histogram-based Gradient Boosting (HistGradBoost) model processes the extracted features via regression.
                <br> &darr; <br>
                The model generates a final prediction based on the processed data.
                <br><br>
                </div>

                The final step regression model is highly precise with an average accuracy of 95% across multiple tests.
                <br><br>
                You can download any material assumptions <a style="color: #39a265" href="assets/assumptions.xlsx">here</a>.
                <br>
                You can download any logical constraints <a style="color: #39a265" href="assets/constraints.xlsx">here</a>.`,

      position: { gridColumn: "1 / span 4", gridRow: "6 / span 8" },
    },
    {
      title: "Disclaimers",
      content: `This tool is made as a Proof of Concept. It can be used by students, architects, and designers alike, but with caution. The estimates and assessments provided by ECO Insight are intended only for preliminary analysis and should not be relied upon as the final source of information for critical decision-making. Users are encouraged to validate results with additional tools and professional expertise.`,
      position: { gridColumn: "1 / span 6", gridRow: "14 / span 2" },
    },
  ];

  return (
    <div className="about-page">
      <div className="card-container">
        {sections.map((section, index) => (
          <Card
            className="about-card"
            style={{
              gridColumn: section.position.gridColumn,
              gridRow: section.position.gridRow,
            }}
            key={index}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
