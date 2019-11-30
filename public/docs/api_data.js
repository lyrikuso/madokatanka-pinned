define({ "api": [
  {
    "type": "get",
    "url": "/api/albums/:id",
    "title": "",
    "group": "API_ALBUMS",
    "name": "GetAlbums",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_ALBUMS"
  },
  {
    "type": "put",
    "url": "/api/albums",
    "title": "",
    "group": "API_ALBUMS",
    "name": "GetUserData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authuser",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_ALBUMS"
  },
  {
    "type": "post",
    "url": "/api/albums",
    "title": "",
    "group": "API_ALBUMS",
    "name": "UpdateUserData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authuser",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_ALBUMS"
  },
  {
    "type": "get",
    "url": "/api/tanka?month",
    "title": "",
    "group": "API_TANKA",
    "name": "GetTanka",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>Month (YYYYMM)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "contents",
            "description": "<p>Tanka poems.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_TANKA"
  },
  {
    "type": "post",
    "url": "/api/tanka",
    "title": "",
    "group": "API_TANKA",
    "name": "PostTanka",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Poem body.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>Month (YYYYMM)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_TANKA"
  },
  {
    "type": "put",
    "url": "/api/tanka",
    "title": "",
    "group": "API_TANKA",
    "name": "RemoveTanka",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Poem id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/api.js",
    "groupTitle": "API_TANKA"
  },
  {
    "type": "post",
    "url": "/canvas/upload",
    "title": "",
    "group": "CANVAS",
    "name": "Cloudinary_Upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Message to display.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Response from Cloudinary API.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Response from Cloudinary API.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/canvas.js",
    "groupTitle": "CANVAS"
  },
  {
    "type": "put",
    "url": "/webhooks/find",
    "title": "",
    "group": "WEBHOOKS_POEM",
    "name": "FindPhrasesComingAfterPrefix",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pref",
            "description": "<p>Prefix.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expec",
            "description": "<p>Expected length.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "error",
            "description": "<p>Unable to access database.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Generated phrase.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/webhooks.js",
    "groupTitle": "WEBHOOKS_POEM"
  },
  {
    "type": "get",
    "url": "/webhooks/vocab",
    "title": "",
    "group": "WEBHOOKS_POEM",
    "name": "GetVocabulary",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "error",
            "description": "<p>Unable to access database.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "vocab",
            "description": "<p>Vocabulary.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/webhooks.js",
    "groupTitle": "WEBHOOKS_POEM"
  },
  {
    "type": "post",
    "url": "/webhooks/poem",
    "title": "",
    "group": "WEBHOOKS_POEM",
    "name": "PoemCreation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyphrase.phraselast",
            "description": "<p>Last term of keyphrase.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyphrase.phrase",
            "description": "<p>Phrase body.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "keyphrase.mora",
            "description": "<p>Mora count of keyphrase</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "info",
            "description": "<p>Poem body.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/webhooks.js",
    "groupTitle": "WEBHOOKS_POEM"
  },
  {
    "type": "put",
    "url": "/webhooks/random",
    "title": "",
    "group": "WEBHOOKS_POEM",
    "name": "RandomPharaseGeneration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expec",
            "description": "<p>Expected length.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "error",
            "description": "<p>Unable to access database.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Generated phrase.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/webhooks.js",
    "groupTitle": "WEBHOOKS_POEM"
  }
] });
