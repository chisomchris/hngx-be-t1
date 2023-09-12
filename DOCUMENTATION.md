# Person

This project is a backend API that's used to managed a person resource. 

`baseURL` = [`https://chisomchris-hngx.onrender.com/api`][1]

It can be used to: 
- Store a person's personal information.
- Retreive a person's personal information.
- Update a person's personal information.
- Delete a person's personal information.

<br>

## Summary

<br>

| Endpoint | Method | Parameter | Data | Description |
| ------ | ------ | ------- | ------- | ------ | 
| [baseURL][1] | GET |  | | Retrieve all the person on the database |
| [baseURL][1] | POST |  | **name** : String (required), **about** : String (optional), **hobbies** : String (optional)   | Add person to the database if no pereson has same name, otherwise return error |
| [baseURL/][1]{name} | GET |  **name** : name of person| | Retrieve person on the database by his/her **name**|
| [baseURL/][1]{id} | GET | **id** : id of person || Retrieve the person by **id** |
| [baseURL/][1]{id} | PUT |  **id** : id of person |**name** : String (optional), **about** : String (optional), **hobbies** : String (optional)   | find person by **id** and update supplied information |
| [baseURL/][1]{name} | PUT |  **name** : name of person |**name** : String (optional), **about** : String (optional), **hobbies** : String (optional)   | find person by **name** and update supplied information |
| [baseURL/][1]{id} | DELETE | **id** - id of person || find person by **id** and delete. |
| [baseURL/][1]{name} | DELETE | **name** - name of person || find person by **name** and delete. |

<br>

## Details

### Endpoints

####  [baseURL][1] - GET

Use this endpoint to retreive all the persons in the data base, no data required.

#### Example usage

make a `get` request to [baseURL][1]

#### JSON Response - 200 CODE

```sh
{
  "success": true,
  "result": [
                {
                    "id": "e982e23e3287a643b87f",
                    "name": "chisomchris",
                    "hobbies": "Loves bowling and hanging out with friends",
                    "about": ""
                },
                {
                    "id": "ac82e23e32873a643bed",
                    "name": "mark essien",
                    "hobbies": "Loves bowling and hanging out with friends",
                    "about": "Marketting expert"
                }, ...
            ]
  }
 ```
 
####  [baseURL][1] - POST

Use this endpoint to add new person to the data base, Pass the data you want to update in the body,  **name** attribute is required and all field values must be a string.

#### Example usage

make a `post` request to [baseURL][1]

#### Request body 
```javascript
{
    "name": "Chisom Chris"
    "about": "chartered accountant, with an MSc",
    "hobbies": "listening to music, playing tennis"
}
```

#### JSON Response - 201 CODE

```sh
{
  "success": true,
  "result":    {
                    "id": "e982e23e3287a643b87f",
                    "name": "Chisom Chris",
                    "hobbies": listening to music, playing tennis",
                    "about": ""
                }
  }
 ```
 
#### [baseURL/][1]{name} -  GET 

Use this endpoint to retreive information of a single persons in the database, pass in the **name** of the person in the URI. No data required in the body.

#### Example usage

make a `get` request to [baseURL/][1]chisomchris

#### JSON Response - 200 CODE

```sh
{
  "success": true,
  "result": {
        "id": "e982e23e3287a643b87f",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
  }
 ```
 
#### [baseURL/][1]{id} -  GET 

Use this endpoint to retreive information of a single persons in the database, pass in the **id** of the person in the URI. No data required in the body.

#### Example usage

make a `get` request to [baseURL/][1]e982e23e3287a643b87f

#### JSON Response - 200 CODE

```sh
{
  "success": true,
  "result": {
        "id": "e982e23e3287a643b87f",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
  }
 ```

#### [baseURL/][1]{id} -  PUT 

Use this endpoint to update information of a single persons in the database, pass in the **id** of the person in the URI.

Pass the data you want to update in the body, at least one of **name** , **about**, and **hobbies** attribute is required, all field values must be a string.

#### Example usage

make a `put` request to [baseURL/][1]e982e23e3287a643b87f

#### Request body 
```javascript
{
    "name": "Chisom Chris"
    "about": "chartered accountant, with an MSc",
    "hobbies": "listening to music"
}
```
#### JSON Response - 200 CODE

```sh
{
  "success": true,
  "result": {
        "id": "e982e23e3287a643b87f",
        "name": "Chisom Chris",
        "hobbies": "listening to music",
        "about": "chartered accountant, with an MSc"
    }
}
 ```
 
#### [baseURL/][1]{id} -  DELETE 

Use this endpoint to delete a person from the database, pass in the **id** of the person in the URI.

#### Example usage

make a `delete` request to [baseURL/][1]e982e23e3287a643b87f

#### JSON Response - 200 CODE

```sh
{
  "success": true,
  "result": {
        "id": "e982e23e3287a643b87f",
        "name": "chisomchris",
        "hobbies": "",
        "about": "Loves bowling and hanging out with friends"
    }
}
```
 
[1]: <https://chisomchris-hngx.onrender.com/api>