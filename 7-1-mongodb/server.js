import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/TestDB")
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