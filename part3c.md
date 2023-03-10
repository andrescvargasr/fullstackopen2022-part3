# Exercises 3.12

## 3.12: Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a _mongo.js_ file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

**NB**: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

```js
node mongo.js yourpassword Anna 040-1234556
```

As a result, the application will print:

```js
added Anna number 040-1234556 to phonebook
```

The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

```js
node mongo.js yourpassword "Arto Vihavainen" 045-1232456
```

If the password is the only parameter given to the program, meaning that it is invoked like this:

```js
node mongo.js yourpassword
```

Then the program should display all of the entries in the phonebook:

```js
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```

You can get the command-line parameters from the [process.argv](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_argv) variable.

**NB: do not close the connection in the wrong place**. E.g. the following code will not work:

```js
Person
  .find({})
  .then(persons=> {
    // ...
  })

mongoose.connection.close()
```

In the code above the _mongoose.connection.close()_ command will get executed immediately after the _Person.find_ operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where _Person.find_ operation finishes and the _callback_ function gets called.

The correct place for closing the database connection is at the end of the callback function:

```js
Person
  .find({})
  .then(persons=> {
    // ...
    mongoose.connection.close()
  })
```

**NB**: If you define a model with the name Person, mongoose will automatically name the associated collection as people.
