import { useUser } from "@/app/context/UserContext";
import { useColorMode } from "@/app/context/ColorModeContext";
import { QuizFinished, QuizQuestion } from "@/interfaces/interface";
import { deleteQuiz, getQuizByUsername } from "@/services/data_supabase";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Quiz = ({ quiz }: { quiz: QuizQuestion }) => {
  const [quizExists, setQuizExists] = React.useState<boolean>(false);
  const [dataQuiz, setDataQuiz] = React.useState<QuizFinished[] | null>(null);
  const { username } = useUser();
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";
  const colors = {
    background: isDarkMode ? "#18181b" : "#f9f9f9",
    card: isDarkMode ? "#23232b" : "#fff",
    text: isDarkMode ? "#fff" : "#333",
    detail: isDarkMode ? "#bbb" : "#444",
    message: isDarkMode ? "#ccc" : "#888",
  };

  useEffect(() => {
    async function GetQuizByUser() {
      if (!username) {
        setQuizExists(false);
        setDataQuiz([]);
        return;
      }
      const data = await getQuizByUsername(username);
      if (data && data.length > 0) {
        setDataQuiz(data);
        setQuizExists(true);
      } else {
        setQuizExists(false);
        setDataQuiz([]);
      }
    }
    GetQuizByUser();
  }, [username]);

  if (dataQuiz === null) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {quizExists ? (
        <>
          <Text style={[styles.heading, { color: colors.text }]}>
            Your Quiz History
          </Text>
          <FlatList
            data={dataQuiz}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.cardRow, { backgroundColor: colors.card }]}>
                <View style={styles.cardText}>
                  <Text style={[styles.title, { color: colors.text }]}>
                    {item.quizTitle}
                  </Text>
                  <Text style={[styles.detail, { color: colors.detail }]}>
                    Score: {item.score}
                  </Text>
                  <Text style={[styles.detail, { color: colors.detail }]}>
                    Taken at: {new Date(item.created_at).toLocaleString()}
                  </Text>
                </View>
                <Pressable
                  onPress={async () => {
                    await deleteQuiz(item.id);
                    setDataQuiz((prev) =>
                      prev ? prev.filter((q) => q.id !== item.id) : []
                    );
                  }}
                  style={styles.trashIcon}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </Pressable>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={[styles.message, { color: colors.message }]}>
          Go start to make a quiz
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    flex: 1,
    marginRight: 8,
  },
  trashIcon: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});

export default Quiz;
