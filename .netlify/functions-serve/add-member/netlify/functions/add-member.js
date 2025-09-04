var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/add-member.ts
var add_member_exports = {};
__export(add_member_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(add_member_exports);
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var handler = async (event, context) => {
  console.log("Function called with method:", event.httpMethod);
  console.log("Event body:", event.body);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
  try {
    console.log("Event body:", event.body);
    const { member } = JSON.parse(event.body || "{}");
    console.log("Parsed member:", member);
    if (!member || !member.name) {
      console.log("Missing member name");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Member name is required" })
      };
    }
    const researchInterestsText = member.research_interests && member.research_interests.length > 0 ? member.research_interests.map((interest) => `- ${interest}`).join("\n") : "- ";
    const markdownContent = `---
name: "${member.name}"
position: "${member.position}"
email: "${member.email}"
photo: "${member.photo}"
homepage: "${member.homepage}"
googleScholar: "${member.googleScholar}"
research_interests:
${researchInterestsText}
---

# ${member.name}

## \uC18C\uAC1C
${member.position}

## \uC5F0\uB77D\uCC98
- \uC774\uBA54\uC77C: ${member.email}
${member.homepage ? `- \uD648\uD398\uC774\uC9C0: [${member.homepage}](${member.homepage})` : ""}
${member.googleScholar ? `- Google Scholar: [\uD504\uB85C\uD544 \uBCF4\uAE30](${member.googleScholar})` : ""}

## \uC5F0\uAD6C \uAD00\uC2EC\uC0AC
${member.research_interests && member.research_interests.length > 0 ? member.research_interests.map((interest) => `- ${interest}`).join("\n") : "- \uC544\uC9C1 \uC5F0\uAD6C \uAD00\uC2EC\uC0AC\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."}

${member.graduation ? `## \uD559\uB825
- \uC878\uC5C5: ${member.graduation}` : ""}
${member.current ? `## \uD604\uC7AC
- ${member.current}` : ""}
`;
    const timestamp = Date.now();
    const fileName = `member-${timestamp}.md`;
    const filePath = path.join(process.cwd(), "content", "members", fileName);
    const membersDir = path.join(process.cwd(), "content", "members");
    if (!fs.existsSync(membersDir)) {
      fs.mkdirSync(membersDir, { recursive: true });
    }
    fs.writeFileSync(filePath, markdownContent, "utf8");
    setTimeout(() => {
      try {
        const stats = fs.statSync(filePath);
        fs.utimesSync(filePath, stats.atime, /* @__PURE__ */ new Date());
      } catch (error) {
        console.log("File touch failed:", error);
      }
    }, 100);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "\uBA64\uBC84\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
        fileName,
        filePath
      })
    };
  } catch (error) {
    console.error("Error adding member:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to add member",
        details: error instanceof Error ? error.message : "Unknown error"
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=add-member.js.map
