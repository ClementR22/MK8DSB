const { execSync } = require("child_process");
const fs = require("fs");

console.log("Generating licenses…");

const rawJson = execSync("npx license-checker --production --json", {
  encoding: "utf-8",
});

const raw = JSON.parse(rawJson);

const cleaned = Object.fromEntries(
  Object.entries(raw).map(([name, data]) => {
    let licenseText = "";

    try {
      if (data.licenseFile) {
        const licensePath = data.licenseFile.replace(/\\/g, "/");
        if (fs.existsSync(licensePath)) {
          licenseText = fs.readFileSync(licensePath, "utf-8");
        }
      }
    } catch (err) {
      console.warn(`⚠️ Could not read license for ${name}: ${err.message}`);
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

fs.writeFileSync("assets/licenses.json", JSON.stringify(cleaned, null, 2), "utf-8");

console.log("Licenses generated & cleaned ✅");
