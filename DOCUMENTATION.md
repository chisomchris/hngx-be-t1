# Person API

This project is a backend API that's used to managed a person resource. 

It can be used to: 
- Store a person's personal information.
- Retreive a person's personal information.
- Update a person's personal information.
- Delete a person's personal information.

## Summary

| Endpoint | Method | Parameter | Data | Description |
| ------ | ------ | ------- | ------- | ------ | 
| http://myapiendpoint/api | GET |  | | Retrieve all the person on the database |
| http://myapiendpoint/api | POST |  | **name** : String (required), **about** : String (optional), **hobbies** : String (optional)   | Add person to the database if no pereson has same name, otherwise return error |
| http://myapiendpoint/api/{name} | GET |  **name** : name of person| | Retrieve person on the database by his/her name|
| http://myapiendpoint/api/{id} | GET | **id** : id of person || Retrieve the person by **id** |
| http://myapiendpoint/api/{id} | PUT |  **id** : id of person |**name** : String (optional), **about** : String (optional), **hobbies** : String (optional)   | find person by **id** and update supplied information |
| http://myapiendpoint/api/{id} | DELETE | **id** - id of person || find person by **id** and delete. |



## Details

### Endpoints

####  http://myapiendpoint/api - GET

Use this endpoint to retreive all the persons in the data base, no data required.

#### Example usage

make a `get` request to http://myapiendpoint/api

#### JSON Response

```
{
  "success": true,
  "result": [
                {
                    "id": "y982e23gu3287r64387g",
                    "name": "chisomchris",
                    "hobbies": "Loves bowling and hanging out with friends",
                    "about": ""
                },
                {
                    "id": "iuhie4689ry34fbi38y",
                    "name": "mark essien",
                    "hobbies": "Loves bowling and hanging out with friends",
                    "about": "Marketting expert"
                }, ...
            ]
  }
 ```
 
#### http://myapiendpoint/api/{name} -  GET 

Use this endpoint to retreive information of a single persons in the database, pass in the **name** of the person in the URI. No data required in the body.

#### Example usage

make a `get` request to http://myapiendpoint/api/chisomchris

#### JSON Response

```
{
  "success": true,
  "result": {
        "id": "y982e23gu3287r64387g",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
  }
 ```
 
#### http://myapiendpoint/api/{id} -  GET 

Use this endpoint to retreive information of a single persons in the database, pass in the **id** of the person in the URI. No data required in the body.

#### Example usage

make a `get` request to http://myapiendpoint/api/y982e23gu3287r64387g

#### JSON Response

```
{
  "success": true,
  "result": {
        "id": "y982e23gu3287r64387g",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
  }
 ```

#### http://myapiendpoint/api/{id} -  PUT 

Use this endpoint to update information of a single persons in the database, pass in the **id** of the person in the URI.

Pass the data you want to update in the body, at least one of **name** , **about**, and **hobbies** attribute is required, all field values must be a string.

#### Example usage

make a `put` request to http://myapiendpoint/api/y982e23gu3287r64387g

#### Request body 
```javascript
{
    "name": "Chisom Chris"
    "about": "chartered accountant, with an MSc",
    "hobbies": "listening to music"
}
```
#### JSON Response

```
{
  "success": true,
  "result": {
        "id": "y982e23gu3287r64387g",
        "name": "Chisom Chris",
        "hobbies": "listening to music",
        "about": "chartered accountant, with an MSc"
    }
}
 ```
 
#### http://myapiendpoint/api/{id} -  DELETE 

Use this endpoint to delete a person from the database, pass in the **id** of the person in the URI.

#### Example usage

make a `delete` request to http://myapiendpoint/api/y982e23gu3287r64387g

#### JSON Response

```
{
  "success": true,
  "result": {
        "id": "y982e23gu3287r64387g",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
  }
 ```
 