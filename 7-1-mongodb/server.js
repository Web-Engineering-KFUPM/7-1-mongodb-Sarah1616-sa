import mongoose from "mongoose";

mongoose
  .connect("mongodb://s202261060_db_user:Sarah4321@ac-zf6pvlu-shard-00-00.2zrmcma.mongodb.net:27017,ac-zf6pvlu-shard-00-01.2zrmcma.mongodb.net:27017,ac-zf6pvlu-shard-00-02.2zrmcma.mongodb.net:27017/TestDB?ssl=true&replicaSet=atlas-cgzilf-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ Connection error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});

const Student = mongoose.model("Student", studentSchema);

async function createStudents() {
  await Student.insertMany([
    { name: "Ali", age: 21, major: "CS" },
    { name: "Sara", age: 23, major: "SE" },
  ]);
  console.log("✅ Inserted");
}

async function readStudents() {
  const all = await Student.find();
  console.log(all);
}

async function updateStudent() {
  await Student.updateOne({ name: "Ali" }, { age: 22 });
  console.log("✅ Updated Ali");
}

async function deleteStudent() {
  await Student.deleteOne({ name: "Sara" });
  console.log("✅ Deleted Sara");
}

async function runLab() {
  try {
    await createStudents();
    await readStudents();
    await updateStudent();
    await deleteStudent();
    await readStudents();
  } catch (error) {
    console.log("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

runLab();