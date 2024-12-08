
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
      "schemas": {
        "SizePresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Unique identifier for the size",
              "example": 1
            },
            "name": {
              "type": "string",
              "description": "Name of the size (e.g., Small, Medium, Large)",
              "example": "Large"
            },
            "price": {
              "type": "number",
              "description": "Price of the size",
              "example": 15.99
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
              "type": "number",
              "example": 1,
              "description": "The unique identifier of the size."
            },
            "name": {
              "type": "string",
              "example": "Medium",
              "description": "The name of the size."
            },
            "price": {
              "type": "number",
              "example": 10,
              "description": "The price of the size."
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
              "type": "string",
              "example": "Large",
              "description": "The name of the size."
            },
            "price": {
              "type": "number",
              "example": 12,
              "description": "The price of the size."
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
              "type": "number",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "Margherita"
            },
            "additional_time": {
              "type": "number",
              "example": 5
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
              "type": "number",
              "example": 1,
              "description": "The unique identifier of the flavor."
            },
            "name": {
              "type": "string",
              "example": "Margherita",
              "description": "The name of the flavor."
            },
            "additionalTime": {
              "type": "number",
              "example": 5,
              "description": "The additional time (in minutes) required for this flavor."
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
              "type": "string",
              "example": "Pepperoni",
              "description": "The name of the flavor."
            },
            "additionalTime": {
              "type": "number",
              "example": 7,
              "description": "The additional time (in minutes) required for this flavor."
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
              "type": "number",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "Olives"
            },
            "additional_time": {
              "type": "number",
              "example": 10
            },
            "additional_price": {
              "type": "number",
              "example": 2.5
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
              "type": "number",
              "example": 1,
              "description": "The unique identifier of the additional item."
            },
            "name": {
              "type": "string",
              "example": "Olives",
              "description": "The name of the additional item."
            },
            "additionalTime": {
              "type": "number",
              "example": 10,
              "description": "The additional time (in minutes) required for this item."
            },
            "additionalPrice": {
              "type": "number",
              "example": 3,
              "description": "The additional price for this item."
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
              "type": "string",
              "example": "Olives",
              "description": "The name of the additional item."
            },
            "additionalTime": {
              "type": "number",
              "example": 10,
              "description": "The additional time (in minutes) required for this item."
            },
            "additionalPrice": {
              "type": "number",
              "example": 3,
              "description": "The additional price for this item."
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
              "example": [
                {
                  "id": 1,
                  "name": "Margherita",
                  "additional_time": 5
                },
                {
                  "id": 2,
                  "name": "Pepperoni",
                  "additional_time": 0
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/FlavorPresenter"
              }
            },
            "sizes": {
              "example": [
                {
                  "id": 1,
                  "name": "Small",
                  "price": 8.99
                },
                {
                  "id": 2,
                  "name": "Large",
                  "price": 12.99
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SizePresenter"
              }
            },
            "additionals": {
              "example": [
                {
                  "id": 1,
                  "name": "Olives",
                  "additional_time": 5,
                  "additional_price": 2.5
                },
                {
                  "id": 2,
                  "name": "Mushrooms",
                  "additional_time": 5,
                  "additional_price": 3
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdditionalPresenter"
              }
            }
          },
          "required": [
            "flavors",
            "sizes",
            "additionals"
          ]
        },
        "PizzaPresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1
            },
            "order_id": {
              "type": "string",
              "example": "ORD12345"
            },
            "size": {
              "example": {
                "id": 1,
                "name": "Large",
                "price": 15.99
              },
              "allOf": [
                {
                  "$ref": "#/components/schemas/SizePresenter"
                }
              ]
            },
            "flavor": {
              "example": {
                "id": 1,
                "name": "Margherita",
                "additional_time": 5
              },
              "allOf": [
                {
                  "$ref": "#/components/schemas/FlavorPresenter"
                }
              ]
            },
            "additionals": {
              "example": [
                {
                  "id": 1,
                  "name": "Olives",
                  "price": 20.5
                },
                {
                  "id": 2,
                  "name": "Mushrooms",
                  "price": 30.5
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdditionalPresenter"
              }
            },
            "price": {
              "type": "number",
              "example": 18.99
            },
            "preparation_time": {
              "type": "number",
              "example": 15
            }
          },
          "required": [
            "id",
            "order_id",
            "size",
            "flavor",
            "additionals",
            "price",
            "preparation_time"
          ]
        },
        "OrderPresenter": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "ORD12345"
            },
            "pizzas": {
              "example": [
                {
                  "id": 1,
                  "order_id": "ORD12345",
                  "size": {
                    "id": 1,
                    "name": "Large",
                    "price": 15.99
                  },
                  "flavor": {
                    "id": 1,
                    "name": "Margherita",
                    "additional_time": 5
                  },
                  "additionals": [
                    {
                      "id": 1,
                      "name": "Olives",
                      "additional_time": 5,
                      "additional_price": 15
                    }
                  ],
                  "price": 18.99,
                  "preparation_time": 15
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PizzaPresenter"
              }
            },
            "observation": {
              "type": "string",
              "example": "No onions on the pizza."
            },
            "total_preparation_time": {
              "type": "number",
              "example": 45
            },
            "total_price": {
              "type": "number",
              "example": 49.99
            },
            "created_at": {
              "format": "date-time",
              "type": "string",
              "example": "2024-12-07T12:00:00Z"
            },
            "updated_at": {
              "format": "date-time",
              "type": "string",
              "example": "2024-12-07T12:30:00Z"
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
              "type": "string",
              "example": "Extra spicy pizza with no olives.",
              "description": "Any special instructions or observations for the order."
            },
            "pizzas": {
              "example": [
                {
                  "id": 1,
                  "size_id": 1,
                  "flavor_id": 2,
                  "additional_ids": [
                    1,
                    2,
                    3
                  ]
                }
              ],
              "description": "The list of pizzas included in the order.",
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
              "type": "boolean",
              "description": "Indicates whether the response data is an array.",
              "example": true
            },
            "path": {
              "type": "string",
              "description": "The requested API path.",
              "example": "/api/orders"
            },
            "duration": {
              "type": "string",
              "description": "The duration of the request in milliseconds.",
              "example": "120ms"
            },
            "method": {
              "type": "string",
              "description": "The HTTP method used for the request (GET, POST, etc.).",
              "example": "GET"
            },
            "data": {
              "type": "object",
              "description": "The actual response data.",
              "example": {
                "id": 1,
                "name": "Margherita",
                "price": 12.5
              }
            }
          },
          "required": [
            "isArray",
            "path",
            "duration",
            "method",
            "data"
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
