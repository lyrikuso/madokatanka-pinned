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
  }
] });
