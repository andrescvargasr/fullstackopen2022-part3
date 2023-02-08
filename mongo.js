const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

mongoose.set("strictQuery", false);

const url = `mongodb+srv://fullstack:${password}@cluster0.72at7vc.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(url);
}

// mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((note) => {
      console.log(note.name, note.number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });

  if (process.argv.length < 3) {
    console.log(
      "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
  }
}
