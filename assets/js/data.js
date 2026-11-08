/* =====================================================================
   DATA FILE - edit this file to change pictures and project details.
   Every path is relative to index.html, so this folder works under any
   repository name, in any sub-folder, or on any hosting service.

   The picture folders and the file extension are set in assets/js/config.js.
   Folder names and file names must match exactly (capital letters, spaces).
   A project folder may also contain a folder with its own name (e.g. ASTER Mall/ASTER Mall); both work.
   ===================================================================== */

/* Projects. Each project window mirrors its folder tree:
   groups = sub-folders, children = folders inside a sub-folder, files = pictures (without the extension).
   place / company / role are optional: leave '' or [] to hide them. */
var PROJECTS = [
 {
  "title": "ASTER",
  "root": "ASTER Mall",
  "place": "Egypt",
  "company": "MAAP Electro-Mechanical Engineers",
  "role": [
   "HVAC design from scratch",
   "Initial load estimation",
   "HAP calculations",
   "Design drawings"
  ],
  "summary": "HVAC, drainage, water supply and firefighting drawings, riser diagrams, general details and schedules.",
  "tags": [
   "HVAC",
   "Drainage",
   "Water supply",
   "Firefighting"
  ],
  "cover": "ASTER Cover.jpeg",
  "groups": [
   {
    "name": "DRAIN",
    "label": null,
    "dir": "DRAIN",
    "files": [
     "561-2B-PD-02-00-01-C-561-2B-PD-02-00-01-C",
     "561-2B-PD-02-00-02-C-561-2B-PD-02-00-02-C",
     "561-2B-PD-02-00-03-C-561-2B-PD-02-00-03-C",
     "561-2B-PD-02-00-GR-C-561-2B-PD-02-00-GR-C",
     "561-2B-PD-02-03-04-C-H.L-561-2B-PD-02-03-04-C-H.L"
    ],
    "children": []
   },
   {
    "name": "FIREFIGHTING",
    "label": null,
    "dir": "FIREFIGHTING",
    "files": [
     "561-2B-FF-02-00-01-C-561-2B-FF-02-00-01-C",
     "561-2B-FF-02-00-02-C-561-2B-FF-02-00-02-C",
     "561-2B-FF-02-00-05-C-561-2B-FF-02-00-05-C",
     "561-2B-FF-02-00-06-C-561-2B-FF-02-00-06-C",
     "561-2B-FF-02-03-04-C-561-2B-FF-02-03-04-C"
    ],
    "children": []
   },
   {
    "name": "GENERAL DETAILS & SCHEDULES",
    "label": null,
    "dir": "GENERAL DETAILS & SCHEDULES",
    "files": [
     "561-2B-ME-00-00-01-C-561-2B-ME-00-00-01-C",
     "561-2B-ME-00-00-02-C (1)-561-2B-ME-00-00-02-C",
     "561-2B-ME-00-00-02-C-561-2B-ME-00-00-02-C",
     "561-2B-ME-00-00-03-C (1)-561-2B-ME-00-00-03-C",
     "561-2B-ME-00-00-03-C-561-2B-ME-00-00-03-C"
    ],
    "children": []
   },
   {
    "name": "HVAC",
    "label": null,
    "dir": "HVAC",
    "files": [
     "561-2B-ME-02-00-GR-C-561-2B-ME-02-00-GR-C"
    ],
    "children": []
   },
   {
    "name": "RISER DIAGRAM",
    "label": null,
    "dir": "RISER DIAGRAM",
    "files": [
     "561-2B-PW-00-00-RD-C-561-2B-PW-00-00-00-C",
     "561-2B-PW-00-00-RD-C-561-2B-PW-00-00-01-C",
     "561-2B-PW-00-00-RD-C-561-2B-PW-00-00-02-C"
    ],
    "children": []
   },
   {
    "name": "WATER SUPPLY",
    "label": null,
    "dir": "WATER SUPPLY",
    "files": [
     "561-2B-PW-02-00-01-C-561-2B-PW-02-00-01-C",
     "561-2B-PW-02-00-02-C-561-2B-PW-02-00-02-C",
     "561-2B-PW-02-00-03-C-561-2B-PW-02-00-03-C",
     "561-2B-PW-02-00-04-C-561-2B-PW-02-00-04-C",
     "561-2B-PW-02-03-04-C-561-2B-PW-02-03-04-C"
    ],
    "children": []
   }
  ],
  "files": [
   "ASTER Cover.jpeg"
  ]
 },
 {
  "title": "CO55 Park St",
  "root": "CO55 Park St",
  "place": "",
  "company": "",
  "role": [],
  "summary": "Coordination plan and sections, HVAC, plumbing and firefighting drawings.",
  "tags": [
   "Coordination",
   "HVAC",
   "Plumbing",
   "Firefighting"
  ],
  "cover": "Coordination/25016-CO-PLAN",
  "groups": [
   {
    "name": "Coordination",
    "label": null,
    "dir": "Coordination",
    "files": [
     "25016-CO-PLAN",
     "25016-CO-SECTIONS"
    ],
    "children": []
   },
   {
    "name": "HVAC",
    "label": null,
    "dir": "HVAC",
    "files": [
     "25016-ME-HV-CWP",
     "25016-ME-HV-DP"
    ],
    "children": []
   },
   {
    "name": "PL&FF",
    "label": "PL&FF · Plumbing and firefighting",
    "dir": "PL&FF",
    "files": [
     "25016-ME-FF",
     "25016-ME-PL-CD",
     "25016-ME-PL-DR",
     "25016-ME-PL-WS"
    ],
    "children": []
   }
  ]
 },
 {
  "title": "Crescent Walk",
  "root": "CRESCENT WALK",
  "place": "",
  "company": "",
  "role": [],
  "summary": "Two drawing sets (A02 and B02), each with HVAC, drainage and water supply.",
  "tags": [
   "HVAC",
   "Drainage",
   "Water supply"
  ],
  "cover": "A02/HVAC/06_10102_GROUND_FLOOR_PLAN",
  "groups": [
   {
    "name": "A02",
    "label": null,
    "dir": "A02",
    "files": [],
    "children": [
     {
      "name": "HVAC",
      "label": null,
      "dir": "A02/HVAC",
      "files": [
       "01_00001_COVER",
       "04_00004_INSTALLATION_EQUIUPMENT_DETAILS",
       "05_10101_BASEMENT_FLOOR_PLAN",
       "06_10102_GROUND_FLOOR_PLAN",
       "07_10103_FIRST_FLOOR_PLAN",
       "08_10104_SECOND_FLOOR_PLAN",
       "09_10105_ROOF_PLAN"
      ],
      "children": []
     },
     {
      "name": "PD",
      "label": "PD · Drainage",
      "dir": "A02/PD",
      "files": [
       "04_00004_GENERAL_DETIALS",
       "05_10102_BASEMENT_FLOOR_PLAN_LL",
       "06_10102_BASEMENT_FLOOR_PLAN_HL",
       "07_10102_GROUND_FLOOR_PLAN",
       "08_10103_FIRST_FLOOR_PLAN",
       "09_10104_ANNEX_FLOOR_PLAN",
       "10_10105_ROOF_FLOOR_PLAN"
      ],
      "children": []
     },
     {
      "name": "PW",
      "label": "PW · Water supply",
      "dir": "A02/PW",
      "files": [
       "04_PLW-00004_GENERAL_DETAILS",
       "05_PLW-10102_BASEMENT_FLOOR_PLAN",
       "06_PLW-10102_GROUND_FLOOR_PLAN",
       "07_PLW-10103_FIRST_FLOOR_PLAN",
       "08_PLW-10104_ANNEX_FLOOR_PLAN"
      ],
      "children": []
     }
    ]
   },
   {
    "name": "B02",
    "label": null,
    "dir": "B02",
    "files": [],
    "children": [
     {
      "name": "HVAC",
      "label": null,
      "dir": "B02/HVAC",
      "files": [
       "01_00001_COVER",
       "04_00004_INSTALLATION_EQUIUPMENT_DETAILS",
       "05_10101_BASEMENT_FLOOR_PLAN",
       "06_10102_GROUND_FLOOR_PLAN",
       "07_10103_FIRST_FLOOR_PLAN",
       "08_10104_ANNEX_FLOOR_PLAN"
      ],
      "children": []
     },
     {
      "name": "PD",
      "label": "PD · Drainage",
      "dir": "B02/PD",
      "files": [
       "04_00004_GENERAL_DETIALS",
       "05_10102_BASEMENT_FLOOR_PLAN_LL",
       "06_10103_BASEMENT_FLOOR_PLAN_HL",
       "07_10104_GROUND_FLOOR_PLAN",
       "08_10105_FIRST_FLOOR_PLAN",
       "09_10106_ANNEX_FLOOR_PLAN"
      ],
      "children": []
     },
     {
      "name": "PW",
      "label": "PW · Water supply",
      "dir": "B02/PW",
      "files": [
       "04_00004_GENERAL_DETIALS",
       "05_10102_BASEMENT_FLOOR_PLAN",
       "06_10103_GROUND_FLOOR_PLAN",
       "07_10104_FIRST_FLOOR_PLAN",
       "08_10105_ANNEX_FLOOR_PLAN"
      ],
      "children": []
     }
    ]
   }
  ]
 },
 {
  "title": "IB",
  "root": "IB",
  "place": "",
  "company": "",
  "role": [],
  "summary": "Firefighting, HVAC and plumbing drawings, with 3D views.",
  "tags": [
   "HVAC",
   "Plumbing",
   "Firefighting",
   "3D"
  ],
  "cover": "Cover.webp",
  "groups": [
   {
    "name": "FF",
    "label": "FF · Firefighting",
    "dir": "FF",
    "files": [
     "01.1",
     "01.12",
     "01",
     "02.1",
     "02",
     "03.1",
     "03",
     "04",
     "legend"
    ],
    "children": []
   },
   {
    "name": "HV",
    "label": "HV · HVAC",
    "dir": "HV",
    "files": [
     "01-3D",
     "01.1",
     "01.2",
     "01",
     "011",
     "012",
     "013",
     "02-3D-EX.FAN",
     "02",
     "03-3D-fresh fan",
     "03",
     "04-3D",
     "04"
    ],
    "children": []
   },
   {
    "name": "PL",
    "label": "PL · Plumbing",
    "dir": "PL",
    "files": [
     "01-3D-DR",
     "01-3D",
     "01.1",
     "01",
     "02-3D-DR",
     "02-3D-WS",
     "02-3D",
     "02.1",
     "02",
     "3D-01.1",
     "3D-02",
     "3D-05"
    ],
    "children": []
   }
  ],
  "files": [
   "Cover.webp"
  ]
 },
 {
  "title": "The Walk",
  "root": "The Walk",
  "place": "",
  "company": "",
  "role": [],
  "summary": "HVAC ducting, piping, risers, equipment schedules and general details.",
  "tags": [
   "HVAC"
  ],
  "cover": "The Walk Cover.jpeg",
  "groups": [
   {
    "name": "Ducting",
    "label": null,
    "dir": "Ducting",
    "files": [
     "24011-ME-A-HV-D-01",
     "24011-ME-A-HV-D-02",
     "24011-ME-A-HV-D-03",
     "24011-ME-A-HV-D-04",
     "24011-ME-A-HV-D-05"
    ],
    "children": []
   },
   {
    "name": "Equipment Schedule",
    "label": null,
    "dir": "Equipment Schedule",
    "files": [
     "24011-ME-A-HV-EQ",
     "24011-ME-BS-HV-EQ",
     "24011-ME-S-HV-EQ"
    ],
    "children": []
   },
   {
    "name": "General Details",
    "label": null,
    "dir": "General Details",
    "files": [
     "24011-ME-HV-GD-00",
     "24011-ME-HV-GD-01",
     "24011-ME-HV-GD-02",
     "24011-ME-HV-GN"
    ],
    "children": []
   },
   {
    "name": "Piping",
    "label": null,
    "dir": "Piping",
    "files": [
     "24011-ME-A-HV-P-01",
     "24011-ME-A-HV-P-05",
     "24011-ME-HV-GR-P-01",
     "24011-ME-HV-GR-P",
     "24011-ME-HV-P-B01",
     "24011-ME-HV-P-B02",
     "24011-ME-S-HV-P-01",
     "24011-ME-S-HV-P-02"
    ],
    "children": []
   },
   {
    "name": "Riser Diagram",
    "label": null,
    "dir": "Riser Diagram",
    "files": [
     "24011-ME-A-HV-RD-01",
     "24011-ME-A-HV-RD-02",
     "24011-ME-S-HV-RD-00",
     "24011-ME-S-HV-RD-01",
     "24011-ME-S-HV-RD-02"
    ],
    "children": []
   }
  ],
  "files": [
   "The Walk Cover.jpeg"
  ]
 }
];

/* Certificates: title, issuer (folder name) and picture path inside assets/certifications (without the extension). */
var CERTIFICATES = [
 {
  "title": "BIM for Consultants",
  "issuer": "Autodesk Certifications",
  "file": "Autodesk Certifications/BIM FOR CONSULTANTS"
 },
 {
  "title": "BIM for Contractors",
  "issuer": "Autodesk Certifications",
  "file": "Autodesk Certifications/BIM FOR CONTRACTORS"
 },
 {
  "title": "BIM for Operators",
  "issuer": "Autodesk Certifications",
  "file": "Autodesk Certifications/BIM FOR OPERATORS"
 },
 {
  "title": "BIM Implementation",
  "issuer": "Autodesk Certifications",
  "file": "Autodesk Certifications/BIM IMPLEMENTATION"
 },
 {
  "title": "BIM Management",
  "issuer": "Autodesk Certifications",
  "file": "Autodesk Certifications/BIM MANAGEMENT"
 },
 {
  "title": "BIM Coordinator",
  "issuer": "Kayan Academy",
  "file": "Autodesk Certifications/Kayan Academy/BIM Coordinator"
 },
 {
  "title": "BIM Documenter",
  "issuer": "Niqat Certifications",
  "file": "Niqat Certifications/BIM Documenter"
 },
 {
  "title": "BIM Modeler",
  "issuer": "Niqat Certifications",
  "file": "Niqat Certifications/BIM Modeler"
 }
];
