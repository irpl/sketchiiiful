// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      name: "comic",
      type: "document",
      title: "Comic",
      fields: [
        {
          name: "title",
          type: "string"
        }
      ]
    },
    {
      name: "story",
      type: "document",
      title: "Story",
      fields: [
        {
          name: "title",
          type: "string"
        },
        {
          name: "slug",
          type: "slug",
          options: {
            source: "title"
          }
        },
        {
          name: "thumb",
          type: "number"
        },
        {
          name: "idea",
          title: "The Idea",
          type: "array",
          // type: "text"
          of: [
            {
              type: "block"
            }
          ]
        },
        {
          name: "imagesGallery",
          title: "Images gallery",
          type: "array",
          options: {
            editModal: "dialog"
          },
          of: [
            {
              type: "image",
              fields: [
                {
                  type: "array",
                  of: [{ type: "block" }],
                  name: "caption",
                  title: "Caption"
                }
                // {
                //   title: "Thumbnail",
                //   name: "released",
                //   type: "boolean"
                // }
              ]
            }
          ]
        }
      ]
    }
  ])
});
