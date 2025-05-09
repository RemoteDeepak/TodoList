import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

const Index = () => {
  const [taskList, setTaskList] = useState<
    { title: string; description: string; expanded: boolean; editing: boolean }[]
  >([]);
  const [description, setDescription] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!description.trim()) return;

    const title = description.trim().split(/\s+/).slice(0, 2).join(" ");
    const newTask = {
      title,
      description: description.trim(),
      expanded: false,
      editing: false,
    };

    setTaskList([...taskList, newTask]);
    setDescription("");
  };

  const toggleExpand = (index: number) => {
    const updatedList = [...taskList];
    updatedList[index].expanded = !updatedList[index].expanded;
    setTaskList(updatedList);
  };

  const handleEdit = (index: number) => {
    setEditingTaskIndex(index);
    setDescription(taskList[index].description); 
    const updatedList = [...taskList];
    updatedList[index].editing = true; 
    setTaskList(updatedList);
  };

  const handleUpdate = () => {
    if (editingTaskIndex !== null) {
      const updatedList = [...taskList];
      updatedList[editingTaskIndex].description = description.trim();
      updatedList[editingTaskIndex].editing = false; // End editing mode
      setTaskList(updatedList);
      setEditingTaskIndex(null);
      setDescription(""); // Clear the input field
    }
  };

  const handleDelete = (index: number) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Task Description"
          value={description}
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={editingTaskIndex !== null ? handleUpdate : handleAdd}
        >
          <Text style={styles.addTxt}>
            {editingTaskIndex !== null ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.tasksWrapper}>
        {taskList.map((task, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.taskCard}
              onPress={() => toggleExpand(index)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                {task.expanded && (
                  <Text style={styles.taskDescription}>{task.description}</Text>
                )}
              </View>
              {!task.editing && (
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEdit(index)}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            {task.editing && (
              <View style={styles.editFormContainer}>
                <TextInput
                  value={description}
                  style={styles.editInput}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Edit Task"
                />
                <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                  <Text style={styles.updateText}>Update Task</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEEAE6",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  addBtn: {
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  addTxt: {
    color: "#fff",
    fontWeight: "600",
  },
  tasksWrapper: {
    paddingBottom: 20,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#FFF6F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    flexWrap: "wrap",
  },
  deleteBtn: {
    backgroundColor: "#FF6B6B",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  editBtn: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
  editFormContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF6F0",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  editInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  updateBtn: {
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  updateText: {
    color: "#fff",
    fontWeight: "600",
  },
});
