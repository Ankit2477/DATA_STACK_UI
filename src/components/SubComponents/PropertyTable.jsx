/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";

export function PropertyTable({
  headers,
  sourceData,
  sources = [],
  onSourceDataChange,
}) {

  const [masterChecks, setMasterChecks] = useState({});
  const [individualChecks, setIndividualChecks] = useState({});

  const editableFields = ["grossArea", "nra", "officeNra"];

  const EDP_ID = "edp";

  useEffect(() => {
    if (!sources.length) return;

    const edp = sources.find((s) => s.id === EDP_ID);
    if (!edp) return;

    const newMaster = {};
    sources.forEach((s) => (newMaster[s.id] = s.id === EDP_ID ? true : false));

    const newSourceData = { ...sourceData };
    const newChecks = {};

    headers.forEach((header) => {
      if (header.key !== "source") {
        newChecks[`${EDP_ID}_${header.key}`] = true;
        if (!newSourceData[header.key]) {
  newSourceData[header.key] = String(edp[header.key] || "");
}

      }
    });

    setMasterChecks(newMaster);
    setIndividualChecks(newChecks);
    onSourceDataChange(newSourceData);
  }, []); 

  const handleMasterCheck = (sourceId, checked) => {
    const src = sources.find((s) => s.id === sourceId);
    if (!src) return;

    const newMaster = {};
    sources.forEach((s) => (newMaster[s.id] = s.id === sourceId ? checked : false));
    setMasterChecks(newMaster);

    const newChecks = {};
    const newSourceData = { ...sourceData };

    headers.forEach((header) => {
      if (header.key !== "source") {
        const key = `${sourceId}_${header.key}`;

        if (checked) {
          newChecks[key] = true;
          newSourceData[header.key] = String(src[header.key] || "");
        } else {
          newChecks[key] = false;
          newSourceData[header.key] = "";
        }
      }
    });

    setIndividualChecks(newChecks);
    onSourceDataChange(newSourceData);
  };

  const toggleCopy = (sourceId, field, checked) => {
    const newSourceData = { ...sourceData };
    const src = sources.find((s) => s.id === sourceId);

    const key = `${sourceId}_${field}`;
    const newMaster = {};
    sources.forEach((s) => (newMaster[s.id] = false));

    if (checked) {
      newSourceData[field] = String(src[field] || "");
    } else {
      newSourceData[field] = "";
    }

    setMasterChecks(newMaster);

    setIndividualChecks({
      ...individualChecks,
      [key]: checked,
    });

    onSourceDataChange(newSourceData);
  };


  const handleInputChange = (field, value) => {
    onSourceDataChange({
      ...sourceData,
      [field]: value,
    });
  };


  useEffect(() => {
    const newChecks = { ...individualChecks };
    const newMaster = { ...masterChecks };

    sources.forEach((src) => {
      let allMatch = true;

      headers.forEach((h) => {
        if (h.key === "source") return;

        const key = `${src.id}_${h.key}`;
        const matches = String(sourceData[h.key] || "") === String(src[h.key] || "");

        newChecks[key] = matches;

        if (!matches) allMatch = false;
      });

      newMaster[src.id] = allMatch;
    });

    setIndividualChecks(newChecks);
    setMasterChecks(newMaster);
  }, [sourceData]);

  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #E5E7EB",
        borderRadius: "4px",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#EBE8D9" }}>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#111827",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {header.label}
                {header.required && (
                  <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr style={{ backgroundColor: "#FFFFFF" }}>
            {headers.map((header) => (
              <td
                key={header.key}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E5E7EB",
                  position: "relative",
                }}
              >
                {header.key === "source" ? (
                  <div style={{ fontSize: "14px", color: "#111827" }}>Source</div>
                ) : (
                  <div style={{ position: "relative" }}>
                    {editableFields.includes(header.key) ? (
                      <>
                        <input
                          type="text"
                          value={sourceData[header.key] || ""}
                          onChange={(e) =>
                            handleInputChange(header.key, e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 8px",
                            fontSize: "14px",
                            border: `1px solid ${
                              header.required && !sourceData[header.key]
                                ? "#EF4444"
                                : "#D1D5DB"
                            }`,
                            borderRadius: "4px",
                            outline: "none",
                          }}
                        />

                        <EditIcon
                          fontSize="small"
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#9CA3AF",
                            cursor: "pointer",
                          }}
                        />
                      </>
                    ) : (
                      <input
                        type="text"
                        value={sourceData[header.key] || ""}
                        onChange={(e) =>
                          handleInputChange(header.key, e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "14px",
                          border: `1px solid ${
                            header.required && !sourceData[header.key]
                              ? "#EF4444"
                              : "#D1D5DB"
                          }`,
                          borderRadius: "4px",
                          outline: "none",
                        }}
                      />
                    )}

                    {header.required && !sourceData[header.key] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "100%",
                          marginTop: "4px",
                          backgroundColor: "#FEE2E2",
                          color: "#DC2626",
                          fontSize: "10px",
                          padding: "10px",
                          border: "1px solid #EF4444",
                          borderRadius: "4px",
                          whiteSpace: "nowrap",
                          height: "18px",
                          lineHeight: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {header.label.toUpperCase()} is required
                      </div>
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* ===================== MULTIPLE SOURCES ROWS ===================== */}
          {sources.map((src) => (
            <tr key={src.id} style={{ backgroundColor: "#F9FAFB" }}>
              {headers.map((header) => (
                <td
                  key={header.key}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  {header.key === "source" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="checkbox"
                        checked={masterChecks[src.id] || false}
                        onChange={(e) =>
                          handleMasterCheck(src.id, e.target.checked)
                        }
                        style={{
                          width: "16px",
                          height: "16px",
                          cursor: "pointer",
                          accentColor: "#fff",
                          border: "1px solid #9CA3AF",
                        }}
                      />

                      <div>
                        <div style={{ fontSize: "14px", color: "#111827" }}>
                          {src.source}
                        </div>
                        <div style={{ fontSize: "11px", color: "#6B7280" }}>
                          {src.date}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="checkbox"
                        checked={individualChecks[`${src.id}_${header.key}`] || false}
                        onChange={(e) =>
                          toggleCopy(src.id, header.key, e.target.checked)
                        }
                        style={{
                          width: "16px",
                          height: "16px",
                          cursor: "pointer",
                          accentColor: "#fff",
                          border: "1px solid #9CA3AF",
                        }}
                      />

                      <div style={{ fontSize: "14px", color: "#111827" }}>
                        {src[header.key] ?? "–"}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
