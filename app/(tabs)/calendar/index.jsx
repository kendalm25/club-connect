import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from "../../../lib/supabase";

const windowWidth = Dimensions.get("window").width;

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposalsAndProfiles();
  }, []);

  async function fetchProposalsAndProfiles() {
    try {
      setLoading(true);
      const { data: proposals, error: proposalsError } = await supabase
        .from("proposals")
        .select("id, title, overview, club_id, venue, start_date, end_date");

      if (proposalsError) {
        throw proposalsError;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username");

      if (profilesError) {
        throw profilesError;
      }

      setEventsData(proposals);
      setProfiles(profiles);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // Helper function to format event data for Calendar
  const formatEventsForCalendar = (events) => {
    const formattedEvents = {};
    events.forEach((event) => {
      const startDate = event.start_date;
      const endDate = event.end_date || startDate; // If no end date, use start date
      let currentDate = startDate;
      while (currentDate <= endDate) {
        formattedEvents[currentDate] = {
          marked: true,
          dotColor: "#333",
          selected: currentDate === selectedDate,
          selectedColor: currentDate === selectedDate ? "#333" : undefined,
        };
        currentDate = new Date(
          new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
        )
          .toISOString()
          .split("T")[0];
      }
    });
    if (selectedDate) {
      formattedEvents[selectedDate] = {
        ...formattedEvents[selectedDate],
        selected: true,
        selectedColor: "#333",
      };
    }
    return formattedEvents;
  };

  const getClubName = (clubId) => {
    const profile = profiles.find((profile) => profile.id === clubId);
    return profile ? profile.username : "Unknown Club";
  };

  const renderEventDetails = () => {
    const selectedEvents = eventsData.filter(
      (event) =>
        event.start_date <= selectedDate && event.end_date >= selectedDate
    );
    return (
      <FlatList
        data={selectedEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.event}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.club}>{getClubName(item.club_id)}</Text>
            <Text style={styles.eventDescription}>{item.overview}</Text>
            {item.venue && (
              <Text style={styles.eventDetails}>Location: {item.venue}</Text>
            )}
          </View>
        )}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar</Text>
      </View>

      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        style={{
          width: windowWidth * 0.9,
          marginTop: 10,
          paddingBottom: 15,
          paddingTop: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 4,
          borderRadius: 5,
        }}
        monthFormat={"MMMM"}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={true}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        theme={{
          arrowColor: "#333",
          selectedDayBackgroundColor: "#333",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#333",
          dayTextColor: "#333",
          textDisabledColor: "#d9e1e8",
          dotColor: "#333",
          selectedDotColor: "#ffffff",
        }}
        markedDates={formatEventsForCalendar(eventsData)}
      />

      <View style={styles.eventContainer}>
        {selectedDate ? (
          renderEventDetails()
        ) : (
          <Text>No events for this day</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  eventContainer: {
    marginTop: 20,
    width: windowWidth * 0.9,
    flex: 1,
  },
  event: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
  },
  eventDetails: {
    fontSize: 14,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
