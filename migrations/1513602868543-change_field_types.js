'use strict'

let config = require('config')
let common = require('./.common')
function putMappings(db, indexName, next) {
  db.indices.putMapping({
      index: indexName,
      type: "product",
      body: {
          properties: {
              sku: { type: "string", "index" : "not_analyzed" },
              size: { type: "integer" },
              size_options: { type: "integer" },
              price: { type: "float" },
              has_options: { type: "boolean" },            
              special_price: { type: "float" },
              color: { type: "integer" },
              color_options: { type: "integer" },
              pattern: { type: "string" },
              id: { type: "long" },
              status: { type: "integer" },
              weight: { type: "integer" },
              visibility: { type: "integer" },
              created_at: { 
                  type: "date",           
                  format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
              },
              updated_at: { 
                  type: "date",           
                  format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
              },
              special_from_date: {
                  type: "date",           
                  format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
              },
              special_to_date: {
                  type: "date",           
                  format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
              },
              news_from_date: {
                  type: "date",           
                  format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
              },
              description: { type: "text" },
              name: { type: "text" },
              configurable_children: {
                  properties: {
                      has_options: { type: "boolean" },
                      price: { type: "float" },
                      sku: { type: "string", "index" : "not_analyzed" }
                  }
              },
              configurable_options: {
                  properties: {
                      attribute_id: { type: "long" },
                      default_label: { type: "text"},
                      label: { type: "text"},
                      frontend_label: { type: "text"},   
                      store_label: { type: "text"},
                      values: {
                          properties: {
                              default_label: { type: "text"},
                              label: { type: "text"},
                              frontend_label: { type: "text"},                           
                              store_label: { type: "text"},
                              value_index:  { type: "string", "index" : "not_analyzed" }                          
                          }
                      }
                  }
              },
              category_ids: { type: "long" },
              eco_collection: { type: "integer" },
              eco_collection_options: { type: "integer" },
              erin_recommends: { type: "integer" },
              tax_class_id: { type: "long" }
          }
      }
      }).then(res1 => {
          console.dir(res1, { depth: null, colors: true })

          db.indices.putMapping({
              index: indexName,
              type: "taxrule",
              body: {
              properties: {
                  id: { type: "long" },
                  rates: {
                  properties: {
                      rate: { type: "float" }
                  }
                  }
              }
              }
          }).then(res2 => {
              console.dir(res2, { depth: null, colors: true })

              db.indices.putMapping({
                  index: indexName,
                  type: "attribute",
                  body: {
                  properties: {
                      id: { type: "long" },
                      attribute_id: { type: "long" },

                      options: {
                      properties: {
                          value:  { type: "string", "index" : "not_analyzed" }                          
                      }
                      }
                  }
                  }
              }).then(res3 => {
                  console.dir(res3, { depth: null, colors: true })
                  next()
              }).catch(err3 => {
                  throw new Error(err3)
              })                
          }).catch(err2 => {
              throw new Error(err2)
          })
      }).catch(err1 => {
          console.error(err1)
          next(err1)
      })    
}

module.exports.up = next => {
  putMappings(common.db, config.esIndexes[0], next);
}

module.exports.down = next => {
  next()
}
