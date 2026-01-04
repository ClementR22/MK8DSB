const fs = require("fs");
const path = require("path");

const raw = require("../assets/licenses.json");

const cleaned = Object.fromEntries(
  Object.entries(raw).map(([name, data]) => {
    let licenseText = "";

    try {
      // Vérifie que licenseFile existe et n'est pas vide
      if (data.licenseFile) {
        // normalize path pour Windows / Unix
        const licensePath = data.licenseFile.replace(/\\/g, "/");

        if (fs.existsSync(licensePath)) {
          licenseText = fs.readFileSync(licensePath, "utf-8");
        } else {
          console.warn(`⚠️ License file does not exist for ${name}: ${licensePath}`);
        }
      } else {
        console.warn(`⚠️ No licenseFile property for ${name}`);
      }
    } catch (err) {
      console.warn(`⚠️ Could not read license for ${name}:`, err.message);
    }

    return [
      name,
      {
        licenses: data.licenses,
        licenseText,
      },
    ];
  })
);

fs.writeFileSync("assets/licenses.cleaned.json", JSON.stringify(cleaned, null, 2), "utf-8");

console.log("Licenses cleaned ✅");
