export default {
  "datamodel": {
    "enums": [],
    "models": [
      {
        "name": "User",
        "isEmbedded": false,
        "dbName": null,
        "fields": [
          {
            "name": "id",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": true,
            "type": "String",
            "default": { "name": "cuid", "returnType": "String", "args": [] },
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "email",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": true,
            "isId": false,
            "type": "String",
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "name",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": false,
            "isUnique": false,
            "isId": false,
            "type": "String",
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "posts",
            "kind": "object",
            "dbName": null,
            "isList": true,
            "isRequired": false,
            "isUnique": false,
            "isId": false,
            "type": "Post",
            "relationName": "PostToUser",
            "relationToFields": [],
            "relationOnDelete": "NONE",
            "isGenerated": false,
            "isUpdatedAt": false
          }
        ],
        "isGenerated": false,
        "idFields": []
      },
      {
        "name": "Post",
        "isEmbedded": false,
        "dbName": null,
        "fields": [
          {
            "name": "id",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": true,
            "type": "String",
            "default": { "name": "cuid", "returnType": "String", "args": [] },
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "createdAt",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": false,
            "type": "DateTime",
            "default": { "name": "now", "returnType": "DateTime", "args": [] },
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "updatedAt",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": false,
            "type": "DateTime",
            "isGenerated": false,
            "isUpdatedAt": true
          },
          {
            "name": "published",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": false,
            "type": "Boolean",
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "title",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": true,
            "isUnique": false,
            "isId": false,
            "type": "String",
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "content",
            "kind": "scalar",
            "dbName": null,
            "isList": false,
            "isRequired": false,
            "isUnique": false,
            "isId": false,
            "type": "String",
            "isGenerated": false,
            "isUpdatedAt": false
          },
          {
            "name": "author",
            "kind": "object",
            "dbName": null,
            "isList": false,
            "isRequired": false,
            "isUnique": false,
            "isId": false,
            "type": "User",
            "relationName": "PostToUser",
            "relationToFields": ["id"],
            "relationOnDelete": "NONE",
            "isGenerated": false,
            "isUpdatedAt": false
          }
        ],
        "isGenerated": false,
        "idFields": []
      }
    ]
  },
  "schema": {
    "rootQueryType": "Query",
    "rootMutationType": "Mutation",
    "inputTypes": [
      {
        "name": "PostWhereInput",
        "fields": [
          {
            "name": "AND",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "OR",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "NOT",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_not_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_lt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_lte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_not",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "createdAt_not_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "createdAt_lt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_lte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_gt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_gte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_not",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "updatedAt_not_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "updatedAt_lt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_lte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_gt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_gte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published_not",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "title_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "title_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "content_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "content_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "author",
            "inputType": {
              "type": "UserWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserWhereInput",
        "fields": [
          {
            "name": "AND",
            "inputType": {
              "type": "UserWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "OR",
            "inputType": {
              "type": "UserWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "NOT",
            "inputType": {
              "type": "UserWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_not_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_lt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_lte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "email_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "email_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "name_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "name_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts_every",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts_some",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts_none",
            "inputType": {
              "type": "PostWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserWhereUniqueInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostWhereUniqueInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostCreateWithoutAuthorInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostCreateManyWithoutPostsInput",
        "fields": [
          {
            "name": "create",
            "inputType": {
              "type": "PostCreateWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "connect",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          }
        ]
      },
      {
        "name": "UserCreateInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts",
            "inputType": {
              "type": "PostCreateManyWithoutPostsInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateWithoutAuthorDataInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateWithWhereUniqueWithoutAuthorInput",
        "fields": [
          {
            "name": "where",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "data",
            "inputType": {
              "type": "PostUpdateWithoutAuthorDataInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostScalarWhereInput",
        "fields": [
          {
            "name": "AND",
            "inputType": {
              "type": "PostScalarWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "OR",
            "inputType": {
              "type": "PostScalarWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "NOT",
            "inputType": {
              "type": "PostScalarWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_not_in",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "id_lt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_lte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gt",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_gte",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_contains",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_starts_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "id_not_ends_with",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_not",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "createdAt_not_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "createdAt_lt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_lte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_gt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt_gte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_not",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "updatedAt_not_in",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "updatedAt_lt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_lte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_gt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt_gte",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published_not",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "title_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "title_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "content_not_in",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "content_lt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_lte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_gt",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_gte",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_contains",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_starts_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content_not_ends_with",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateManyDataInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateManyWithWhereNestedInput",
        "fields": [
          {
            "name": "where",
            "inputType": {
              "type": "PostScalarWhereInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "data",
            "inputType": {
              "type": "PostUpdateManyDataInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpsertWithWhereUniqueWithoutAuthorInput",
        "fields": [
          {
            "name": "where",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "update",
            "inputType": {
              "type": "PostUpdateWithoutAuthorDataInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "create",
            "inputType": {
              "type": "PostCreateWithoutAuthorInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateManyWithoutAuthorInput",
        "fields": [
          {
            "name": "create",
            "inputType": {
              "type": "PostCreateWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "connect",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "set",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "disconnect",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "delete",
            "inputType": {
              "type": "PostWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "update",
            "inputType": {
              "type": "PostUpdateWithWhereUniqueWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "updateMany",
            "inputType": {
              "type": "PostUpdateManyWithWhereNestedInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "deleteMany",
            "inputType": {
              "type": "PostScalarWhereInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          },
          {
            "name": "upsert",
            "inputType": {
              "type": "PostUpsertWithWhereUniqueWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          }
        ]
      },
      {
        "name": "UserUpdateInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts",
            "inputType": {
              "type": "PostUpdateManyWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserUpdateManyMutationInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserCreateWithoutPostsInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserCreateOneWithoutAuthorInput",
        "fields": [
          {
            "name": "create",
            "inputType": {
              "type": "UserCreateWithoutPostsInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "connect",
            "inputType": {
              "type": "UserWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostCreateInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "author",
            "inputType": {
              "type": "UserCreateOneWithoutAuthorInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserUpdateWithoutPostsDataInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "email",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "name",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserUpsertWithoutPostsInput",
        "fields": [
          {
            "name": "update",
            "inputType": {
              "type": "UserUpdateWithoutPostsDataInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "create",
            "inputType": {
              "type": "UserCreateWithoutPostsInput",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "UserUpdateOneWithoutPostsInput",
        "fields": [
          {
            "name": "create",
            "inputType": {
              "type": "UserCreateWithoutPostsInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "connect",
            "inputType": {
              "type": "UserWhereUniqueInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "disconnect",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "delete",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "update",
            "inputType": {
              "type": "UserUpdateWithoutPostsDataInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "upsert",
            "inputType": {
              "type": "UserUpsertWithoutPostsInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "author",
            "inputType": {
              "type": "UserUpdateOneWithoutPostsInput",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "PostUpdateManyMutationInput",
        "fields": [
          {
            "name": "id",
            "inputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "inputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "published",
            "inputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "title",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "content",
            "inputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      }
    ],
    "outputTypes": [
      {
        "name": "Post",
        "fields": [
          {
            "name": "id",
            "args": [],
            "outputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "createdAt",
            "args": [],
            "outputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "updatedAt",
            "args": [],
            "outputType": {
              "type": "DateTime",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "published",
            "args": [],
            "outputType": {
              "type": "Boolean",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "title",
            "args": [],
            "outputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "content",
            "args": [],
            "outputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "author",
            "args": [],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "User",
        "fields": [
          {
            "name": "id",
            "args": [],
            "outputType": {
              "type": "ID",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "email",
            "args": [],
            "outputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "name",
            "args": [],
            "outputType": {
              "type": "String",
              "kind": "scalar",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "posts",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "orderBy",
                "inputType": {
                  "type": "PostOrderByInput",
                  "kind": "enum",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "skip",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "after",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "before",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "first",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "last",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": false,
              "isList": true
            }
          }
        ]
      },
      {
        "name": "AggregateUser",
        "fields": [
          {
            "name": "count",
            "args": [],
            "outputType": {
              "type": "Int",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "AggregatePost",
        "fields": [
          {
            "name": "count",
            "args": [],
            "outputType": {
              "type": "Int",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "Query",
        "fields": [
          {
            "name": "findManyUser",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "orderBy",
                "inputType": {
                  "type": "UserOrderByInput",
                  "kind": "enum",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "skip",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "after",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "before",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "first",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "last",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": true,
              "isList": true
            }
          },
          {
            "name": "aggregateUser",
            "args": [],
            "outputType": {
              "type": "AggregateUser",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "findOneUser",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "findManyPost",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "orderBy",
                "inputType": {
                  "type": "PostOrderByInput",
                  "kind": "enum",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "skip",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "after",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "before",
                "inputType": {
                  "type": "ID",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "first",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              },
              {
                "name": "last",
                "inputType": {
                  "type": "Int",
                  "kind": "scalar",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": true,
              "isList": true
            }
          },
          {
            "name": "aggregatePost",
            "args": [],
            "outputType": {
              "type": "AggregatePost",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "findOnePost",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "BatchPayload",
        "fields": [
          {
            "name": "count",
            "args": [],
            "outputType": {
              "type": "Int",
              "kind": "scalar",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      },
      {
        "name": "Mutation",
        "fields": [
          {
            "name": "createOneUser",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "UserCreateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "deleteOneUser",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updateOneUser",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "UserUpdateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "upsertOneUser",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "create",
                "inputType": {
                  "type": "UserCreateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "update",
                "inputType": {
                  "type": "UserUpdateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "User",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "updateManyUser",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "UserUpdateManyMutationInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "BatchPayload",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "deleteManyUser",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "UserWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "BatchPayload",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "createOnePost",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "PostCreateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "deleteOnePost",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "updateOnePost",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "PostUpdateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": false,
              "isList": false
            }
          },
          {
            "name": "upsertOnePost",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereUniqueInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "create",
                "inputType": {
                  "type": "PostCreateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "update",
                "inputType": {
                  "type": "PostUpdateInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "Post",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "updateManyPost",
            "args": [
              {
                "name": "data",
                "inputType": {
                  "type": "PostUpdateManyMutationInput",
                  "kind": "object",
                  "isRequired": true,
                  "isList": false
                }
              },
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "BatchPayload",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          },
          {
            "name": "deleteManyPost",
            "args": [
              {
                "name": "where",
                "inputType": {
                  "type": "PostWhereInput",
                  "kind": "object",
                  "isRequired": false,
                  "isList": false
                }
              }
            ],
            "outputType": {
              "type": "BatchPayload",
              "kind": "object",
              "isRequired": true,
              "isList": false
            }
          }
        ]
      }
    ],
    "enums": [
      {
        "name": "UserOrderByInput",
        "values": [
          "id_ASC",
          "id_DESC",
          "email_ASC",
          "email_DESC",
          "name_ASC",
          "name_DESC"
        ]
      },
      {
        "name": "PostOrderByInput",
        "values": [
          "id_ASC",
          "id_DESC",
          "createdAt_ASC",
          "createdAt_DESC",
          "updatedAt_ASC",
          "updatedAt_DESC",
          "published_ASC",
          "published_DESC",
          "title_ASC",
          "title_DESC",
          "content_ASC",
          "content_DESC"
        ]
      }
    ]
  },
  "mappings": [
    {
      "model": "User",
      "aggregate": "aggregateUser",
      "createOne": "createOneUser",
      "deleteMany": "deleteManyUser",
      "deleteOne": "deleteOneUser",
      "findMany": "findManyUser",
      "findOne": "findOneUser",
      "updateMany": "updateManyUser",
      "updateOne": "updateOneUser",
      "upsertOne": "upsertOneUser"
    },
    {
      "model": "Post",
      "aggregate": "aggregatePost",
      "createOne": "createOnePost",
      "deleteMany": "deleteManyPost",
      "deleteOne": "deleteOnePost",
      "findMany": "findManyPost",
      "findOne": "findOnePost",
      "updateMany": "updateManyPost",
      "updateOne": "updateOnePost",
      "upsertOne": "upsertOnePost"
    }
  ]
}
