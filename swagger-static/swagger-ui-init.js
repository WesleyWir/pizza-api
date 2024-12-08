
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/sizes/{id}": {
        "get": {
          "operationId": "SizeController_getSize",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/SizePresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "sizes"
          ]
        },
        "put": {
          "operationId": "SizeController_updateSize",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSizeDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/SizePresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "sizes"
          ]
        },
        "delete": {
          "operationId": "SizeController_deleteSize",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/SizePresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "sizes"
          ]
        }
      },
      "/api/sizes": {
        "get": {
          "operationId": "SizeController_getSizes",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/SizePresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "sizes"
          ]
        },
        "post": {
          "operationId": "SizeController_createSize",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSizeDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/SizePresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "sizes"
          ]
        }
      },
      "/api/flavors/{id} ": {
        "get": {
          "operationId": "FlavorController_getFlavor",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/FlavorPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "flavors"
          ]
        }
      },
      "/api/flavors": {
        "get": {
          "operationId": "FlavorController_getFlavors",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/FlavorPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "flavors"
          ]
        },
        "post": {
          "operationId": "FlavorController_createFlavor",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFlavorDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/FlavorPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "flavors"
          ]
        }
      },
      "/api/flavors/{id}": {
        "put": {
          "operationId": "FlavorController_updateFlavor",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateFlavorDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/FlavorPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "flavors"
          ]
        },
        "delete": {
          "operationId": "FlavorController_deleteFlavor",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/FlavorPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "flavors"
          ]
        }
      },
      "/api/additionals/{id} ": {
        "get": {
          "operationId": "AdditionalController_getAdditional",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/AdditionalPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "additionals"
          ]
        }
      },
      "/api/additionals": {
        "get": {
          "operationId": "AdditionalController_getAdditionals",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/AdditionalPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "additionals"
          ]
        },
        "post": {
          "operationId": "AdditionalController_createAdditional",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAdditionalDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/AdditionalPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "additionals"
          ]
        }
      },
      "/api/additionals/{id}": {
        "put": {
          "operationId": "AdditionalController_updateAdditional",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAdditionalDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/AdditionalPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "additionals"
          ]
        },
        "delete": {
          "operationId": "AdditionalController_deleteAdditional",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/AdditionalPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "additionals"
          ]
        }
      },
      "/api/menu": {
        "get": {
          "operationId": "MenuController_getMenus",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/MenuPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "menu"
          ]
        }
      },
      "/api/orders": {
        "post": {
          "operationId": "OrderController_storeOrder",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StoreOrderDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/OrderPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "orders"
          ]
        }
      },
      "/api/orders/{id} ": {
        "get": {
          "operationId": "OrderController_getOrder",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/OrderPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "orders"
          ]
        }
      },
      "/api/orders/{id}": {
        "delete": {
          "operationId": "OrderController_deleteOrder",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ResponseFormat"
                      },
                      {
                        "properties": {
                          "data": {
                            "$ref": "#/components/schemas/OrderPresenter"
                          },
                          "isArray": {
                            "type": "boolean",
                            "default": true
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Internal error"
            }
          },
          "tags": [
            "orders"
          ]
        }
      }
    },
    "info": {
      "title": "Clean Architecture Pizza Api",
      "description": "Pizza Api",
      "version": "1",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "SizePresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name",
            "price"
          ]
        },
        "UpdateSizeDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name",
            "price"
          ]
        },
        "CreateSizeDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "name",
            "price"
          ]
        },
        "FlavorPresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "additional_time": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name",
            "additional_time"
          ]
        },
        "UpdateFlavorDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "additionalTime": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name",
            "additionalTime"
          ]
        },
        "CreateFlavorDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "additionalTime": {
              "type": "number"
            }
          },
          "required": [
            "name",
            "additionalTime"
          ]
        },
        "AdditionalPresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "additional_time": {
              "type": "number"
            },
            "additional_price": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name",
            "additional_time",
            "additional_price"
          ]
        },
        "UpdateAdditionalDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "additionalTime": {
              "type": "number"
            },
            "additionalPrice": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "CreateAdditionalDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "additionalTime": {
              "type": "number"
            },
            "additionalPrice": {
              "type": "number"
            }
          },
          "required": [
            "name"
          ]
        },
        "MenuPresenter": {
          "type": "object",
          "properties": {
            "flavors": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sizes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "additionals": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "flavors",
            "sizes",
            "additionals"
          ]
        },
        "OrderPresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "pizzas": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "observation": {
              "type": "string"
            },
            "total_preparation_time": {
              "type": "number"
            },
            "total_price": {
              "type": "number"
            },
            "created_at": {
              "format": "date-time",
              "type": "string"
            },
            "updated_at": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "id",
            "pizzas",
            "observation",
            "total_preparation_time",
            "total_price",
            "created_at",
            "updated_at"
          ]
        },
        "StoreOrderDto": {
          "type": "object",
          "properties": {
            "observation": {
              "type": "string"
            },
            "pizzas": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "pizzas"
          ]
        },
        "ResponseFormat": {
          "type": "object",
          "properties": {
            "isArray": {
              "type": "boolean"
            },
            "path": {
              "type": "string"
            },
            "duration": {
              "type": "string"
            },
            "method": {
              "type": "string"
            }
          },
          "required": [
            "isArray",
            "path",
            "duration",
            "method"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
