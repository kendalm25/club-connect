import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import eventTypes from "../../../assets/eventColors";

const CreatePage = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [club, setClub] = useState("");
  const [overview, setOverview] = useState("");
  const [objectives, setObjectives] = useState("");
  const [audience, setAudience] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [attendance, setAttendance] = useState("");
  const [collabBenefits, setCollabBenefits] = useState("");
  const [budget, setBudget] = useState("");
  const [similarEvents, setSimilarEvents] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [types, setTypes] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  // Function to add or remove an event type
  const toggleType = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t !== type));
    } else if (types.length < 3) {
      setTypes([...types, type]);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (
      startDate.match(/^\d{4}-\d{2}-\d{2}$/) &&
      endDate.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      const proposalData = {
        title,
        club,
        overview,
        objectives,
        audience,
        start_date: startDate,
        end_date: endDate,
        venue,
        attendance,
        collab_benefits: collabBenefits,
        budget,
        similar_events: similarEvents,
        tasks,
        types,
      };

      console.log("New Proposal Data:", proposalData);

      if (onSubmit) {
        onSubmit(proposalData);
      }
    } else {
      Alert.alert(
        "Invalid Date Format",
        "Please enter dates in the YYYY-MM-DD format"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.input}
          placeholder="Name of Event"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Club"
          value={club}
          onChangeText={setClub}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Overview"
          value={overview}
          onChangeText={setOverview}
          multiline
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Objectives"
          value={objectives}
          onChangeText={setObjectives}
          multiline
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Audience"
          value={audience}
          onChangeText={setAudience}
          multiline
        />
        <View style={styles.setDates}>
          <View style={styles.setDateBox}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.setDateBox}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Venue"
          value={venue}
          onChangeText={setVenue}
        />
        <TextInput
          style={styles.input}
          placeholder="Approx. Number of Attendees"
          value={attendance}
          onChangeText={setAttendance}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Benefits of Collaborating"
          value={collabBenefits}
          onChangeText={setCollabBenefits}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Approx. Budget"
          value={budget}
          onChangeText={setBudget}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Similar Past Events"
          value={similarEvents}
          onChangeText={setSimilarEvents}
          multiline
        />

        {/* Tasks Section */}
        <View style={styles.tasksSection}>
          <Text style={styles.tasksTitle}>Remaining Tasks</Text>
          {tasks.map((task, index) => (
            <Text key={index} style={styles.taskItem}>
              {index + 1}. {task}
            </Text>
          ))}
          <View style={styles.taskInputContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Add a new task"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Types Section */}
        <View style={styles.tasksSection}>
          <Text style={styles.tasksTitle}>Event Type (Select up to 3)</Text>
          <View style={styles.typesContainer}>
            {Object.entries(eventTypes).map(([type, color], index) => {
              const isSelected = types.includes(type);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: isSelected ? color : "#e0e0e0",
                      opacity: isSelected ? 1 : 0.7,
                    },
                  ]}
                  onPress={() => toggleType(type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: isSelected ? "#ffffff" : "#000000" },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Proposal</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  label: {
    color: "gray",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  setDates: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  setDateBox: {
    flex: 1,
  },
  tasksSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 10,
  },
  taskItem: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 8,
  },
  taskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    gap: 10,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 10,
    padding: 10,
    flex: 5,
    backgroundColor: "#ffffff",
  },
  addTaskButton: {
    backgroundColor: "#4a4e69",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    alignItems: "center",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#4a4e69",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreatePage;
