import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { mapExtractedDataToOptions } from "../../utils/utils";
import options from "../../data/options";
import { extract, predict } from "../../utils/modelapi";
import { useModal } from "../../context/ModalContext";
import Loader from "../../components/LoaderOne/Loader";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import "./Project.scss";

const Project = () => {
  const location = useLocation();
  const { openGenericModal, closeGenericModal } = useModal();

  const {
    extractedData: initialExtractedData = {},
    input: initialInput = "",
    prediction: initialPrediction = "",
  } = location.state || {};

  const [buildingData, setBuildingData] = useState(initialExtractedData);
  const [description, setDescription] = useState(initialInput);
  const [prediction, setPrediction] = useState(initialPrediction);
  const [loading, setLoading] = useState(false);
  const tooltipRef = useRef();

  useEffect(() => {
    const sector = buildingData["Sector"];
    if (sector === "Non-residential") {
      setBuildingData((prevData) => ({
        ...prevData,
        "Sub-Sector": "Non-residential",
      }));
    }
  }, [buildingData]);

  const stripMaterial = (name) => name.replace(" Material", "");

  const mappedData = mapExtractedDataToOptions(buildingData, options);

  const sectionNames = {
    substructure: "Sub-Structure Materials",
    structure: "Structure Materials",
    external: "External Materials",
    internal: "Internal Materials",
    sectorInformation: "Sector",
    numericalInformation: "General Building Info",
  };

  const handleDropdownChange = (category, subcategory, value) => {
    const updatedData = {
      ...buildingData,
      [subcategory]: value,
    };
    setBuildingData(updatedData);
  };

  const handleInputChange = (option, value) => {
    const updatedData = {
      ...buildingData,
      [option]: value,
    };
    setBuildingData(updatedData);
  };

  const handleRecalculate = async () => {
    if (
      JSON.stringify(buildingData) !== JSON.stringify(initialExtractedData) &&
      Object.keys(initialExtractedData).length !== 0
    ) {
      openGenericModal(
        <div className="warning-modal">
          <p>Are you sure? You will lose your changes.</p>
          <button onClick={handleWarningConfirm}>Yes</button>
          <button onClick={handleWarningCancel}>No</button>
        </div>
      );
    } else if (
      Object.keys(initialExtractedData).length === 0 &&
      Object.keys(buildingData).length !== 0
    ) {
      openGenericModal(
        <div className="warning-modal">
          <p>Are you sure? You will lose your current project.</p>
          <button onClick={handleWarningConfirm}>Yes</button>
          <button onClick={handleWarningCancel}>No</button>
        </div>
      );
    } else {
      await recalculate();
    }
  };

  const recalculate = async () => {
    setLoading(true);
    closeGenericModal();
    try {
      const extractedData = await extract(description);
      setBuildingData(extractedData);
      const predictionValue = await predict(extractedData);
      setPrediction(parseFloat(predictionValue[0].toFixed(2)));
    } catch (error) {
      console.error("Error during recalculate:", error);
    }
    setLoading(false);
  };

  const handleWarningConfirm = async () => {
    await recalculate();
  };

  const handleWarningCancel = () => {
    closeGenericModal();
  };

  const allFieldsNone = (data) => {
    return Object.values(data).every(
      (value) => value === "None" || value === null || value === ""
    );
  };

  const handleCalculate = async () => {
    if (allFieldsNone(buildingData)) {
      openGenericModal(
        <div className="warning-modal">
          <p>Please input more data to make a prediction.</p>
          <button onClick={closeGenericModal}>OK</button>
        </div>
      );
      return;
    }

    try {
      const predictionValue = await predict(buildingData);
      setPrediction(parseFloat(predictionValue[0].toFixed(2)));
    } catch (error) {
      console.error("Error during calculate:", error);
    }
  };

  const isDisabled = (option) => {
    const constraints = {
      "Raft Foundation Material": [
        "Pile Caps Material",
        "Capping Beams Material",
      ],
      "Pile Caps Material": ["Raft Foundation Material"],
      "Capping Beams Material": ["Raft Foundation Material"],
      "Basement Walls Material": ["Storeys Below Ground"],
      "Floor Slab Material": ["Joisted Floors Material"],
      "Joisted Floors Material": ["Floor Slab Material"],
    };

    if (option === "Basement Walls Material") {
      const storeysBelowGround = buildingData["Storeys Below Ground"];
      return (
        storeysBelowGround === 0 ||
        storeysBelowGround === undefined ||
        storeysBelowGround === ""
      );
    }

    const disabledOption = constraints[option];
    if (disabledOption) {
      return disabledOption.some(
        (item) => buildingData[item] && buildingData[item] !== "None"
      );
    }

    if (option === "Sub-Sector") {
      return buildingData["Sector"] === "Non-residential";
    }

    return false;
  };

  const getTooltip = (option) => {
    const tooltips = {
      "Raft Foundation Material":
        "Cannot have Raft Foundation with Pile Caps or Capping Beams",
      "Pile Caps Material": "Cannot have Pile Caps with Raft Foundation",
      "Capping Beams Material":
        "Cannot have Capping Beams with Raft Foundation",
      "Basement Walls Material":
        "Cannot have Basement Walls without Basement Floors",
      "Floor Slab Material": "Cannot have Floor Slab with Joisted Floors",
      "Joisted Floors Material": "Cannot have Joisted Floors with Floor Slab",
      "Sub-Sector": "Non-residential sub-sectors not yet available",
    };

    return tooltips[option] || "";
  };

  const filteredSubSectorOptions = () => {
    if (buildingData["Sector"] === "Residential") {
      return options.subSectors.options.filter(
        (option) => option !== "Non-residential"
      );
    }
    return options.subSectors.options;
  };

  const filteredJoistedFloorOptions = () => {
    if (buildingData["Sector"] === "Residential") {
      return options.materials.structure.joistedFloors.options.filter(
        (option) => option !== "Timber Joists (Office)"
      );
    } else if (buildingData["Sector"] === "Non-residential") {
      return options.materials.structure.joistedFloors.options.filter(
        (option) => option !== "Timber Joists (Domestic)"
      );
    }
    return options.materials.structure.joistedFloors.options;
  };

  const handleMouseOver = (e, tooltipText) => {
    const tooltip = tooltipRef.current;
    tooltip.style.visibility = "visible";
    tooltip.innerText = tooltipText;
    const rect = e.target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltipRect.width / 2
    }px`;
  };

  const handleMouseOut = () => {
    const tooltip = tooltipRef.current;
    tooltip.style.visibility = "hidden";
  };

const handleExport = () => {
  const replaceNullsWithNone = (value) => (value === "None" ? null : value);

  const dataToExport = [
    { description: "description", value: replaceNullsWithNone(description) },
    { description: "", value: "" }, // Empty row for space
    { description: "prediction", value: replaceNullsWithNone(prediction) },
    { description: "", value: "" }, // Empty row for space
    ...Object.entries(buildingData).map(([feature, value]) => ({
      description: feature,
      value: replaceNullsWithNone(value),
    })),
  ];

  const csv = Papa.unparse(dataToExport);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Generate a unique filename based on the current date and time
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const filename = `ECO_Project${timestamp}.csv`;

  saveAs(blob, filename);
};



  return (
    <div className="project-container">
      {loading && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
      <div className={`resize-container ${loading ? "loading" : ""}`}>
        <div className="header-container">
          <div className="card">
            <h3>Description</h3>
            <div className="card-content description-box">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
              <button onClick={handleRecalculate} disabled={loading}>
                <i
                  className={
                    description === initialInput && initialInput
                      ? "fas fa-redo"
                      : "fas fa-arrow-up"
                  }
                ></i>
              </button>
            </div>
          </div>
          <div className="card">
            <div>
              <h3>Prediction</h3>
            </div>
            <div className="card-content">
              <div className="prediction">
                <p>
                  {prediction || 0} kgCO2e/m<sup>2</sup>
                </p>
                <button
                  className="project-predict-button"
                  onClick={handleCalculate}
                  disabled={loading}
                >
                  Adjust Prediction
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Export Project</h3>
            <div className="card-content">
              <div className="csv-button">
                <button onClick={handleExport} disabled={loading}>
                  Export to CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {Object.keys(options.materials).map((category) => (
            <div key={category} className="card">
              <h3>{sectionNames[category]}</h3>
              <div className="card-content">
                {Object.keys(options.materials[category]).map((subcategory) => (
                  <div key={subcategory} className="data-row">
                    <span className="data-label">
                      {stripMaterial(
                        options.materials[category][subcategory].name
                      )}
                      :
                    </span>
                    <span className="data-value">
                      <select
                        value={
                          mappedData[
                            options.materials[category][subcategory].name
                          ] ?? "None"
                        }
                        onChange={(e) =>
                          handleDropdownChange(
                            category,
                            options.materials[category][subcategory].name,
                            e.target.value
                          )
                        }
                        disabled={
                          loading ||
                          isDisabled(
                            options.materials[category][subcategory].name
                          )
                        }
                        onMouseOver={(e) =>
                          isDisabled(
                            options.materials[category][subcategory].name
                          ) &&
                          handleMouseOver(
                            e,
                            getTooltip(
                              options.materials[category][subcategory].name
                            )
                          )
                        }
                        onMouseOut={handleMouseOut}
                      >
                        {(subcategory === "joistedFloors"
                          ? filteredJoistedFloorOptions()
                          : options.materials[category][subcategory].options
                        ).map((option) => (
                          <option key={option} value={option}>
                            {stripMaterial(option)}
                          </option>
                        ))}
                        <option value="None">None</option>
                      </select>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="card">
            <h3>Typology</h3>
            <div className="card-content">
              <div className="data-row">
                <span className="data-label">
                  {stripMaterial(options.sectors.name)}:
                </span>
                <span className="data-value">
                  <select
                    value={mappedData[options.sectors.name] ?? "None"}
                    onChange={(e) =>
                      handleDropdownChange(
                        "sectors",
                        options.sectors.name,
                        e.target.value
                      )
                    }
                    disabled={loading}
                    onMouseOut={handleMouseOut}
                  >
                    {(options.sectors.options || []).map((option) => (
                      <option key={option} value={option}>
                        {stripMaterial(option)}
                      </option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">
                  {stripMaterial(options.subSectors.name)}:
                </span>
                <span className="data-value">
                  <select
                    value={
                      buildingData["Sector"] === "Non-residential"
                        ? "Non-residential"
                        : mappedData[options.subSectors.name] ?? "None"
                    }
                    onChange={(e) =>
                      handleDropdownChange(
                        "subSectors",
                        options.subSectors.name,
                        e.target.value
                      )
                    }
                    disabled={
                      loading || buildingData["Sector"] === "Non-residential"
                    }
                    onMouseOver={(e) =>
                      isDisabled("Sub-Sector") &&
                      handleMouseOver(e, getTooltip("Sub-Sector"))
                    }
                    onMouseOut={handleMouseOut}
                  >
                    {filteredSubSectorOptions().map((option) => (
                      <option key={option} value={option}>
                        {stripMaterial(option)}
                      </option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>General Building Info</h3>
            <div className="card-content">
              {options.numericalOptions.map((option) => (
                <div key={option} className="data-row">
                  <span className="data-label">{stripMaterial(option)}:</span>
                  <span className="data-value">
                    <input
                      type="number"
                      value={mappedData[option] ?? ""}
                      placeholder="None"
                      onChange={(e) =>
                        handleInputChange(option, e.target.value)
                      }
                      disabled={loading}
                      onMouseOver={(e) =>
                        isDisabled(option) &&
                        handleMouseOver(e, getTooltip(option))
                      }
                      onMouseOut={handleMouseOut}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tooltip" ref={tooltipRef}></div>
    </div>
  );
};

export default Project;
