db = db.getSiblingDB('mydatabase');

db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Chat Validation Schema',
      required: [
        '_id',
        'users',
        'messages'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        users: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId'
          },
          minItems: 2,
          maxItems: 2
        },
        messages: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: [
              'sender_id',
              'message',
              'timestamp'
            ],
            properties: {
              sender_id: {
                bsonType: 'objectId'
              },
              timestamp: {
                bsonType: 'string'
              },
              message: {
                bsonType: 'string',
                minLength: 1
              }
            }
          }
        }
      },
      additionalProperties: false
    }
  }
});

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'User Validation Schema',
      required: [
        '_id',
        'name',
        'is_bot',
        'image'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        name: {
          bsonType: 'string'
        },
        is_bot: {
          bsonType: 'bool'
        },
        image: {
          bsonType: 'string'
        }
      },
      additionalProperties: false
    }
  }
});
