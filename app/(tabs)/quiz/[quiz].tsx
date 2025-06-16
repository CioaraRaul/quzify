import { useUser } from "@/app/context/UserContext";
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

  useEffect(() => {
    async function GetQuizByUser() {
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
  });

  if (dataQuiz === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quizExists ? (
        <>
          <Text style={styles.heading}>Your Quiz History</Text>
          <FlatList
            data={dataQuiz}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardRow}>
                <View style={styles.cardText}>
                  <Text style={styles.title}>{item.quizTitle}</Text>
                  <Text style={styles.detail}>Score: {item.score}</Text>
                  <Text style={styles.detail}>
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
        <Text style={styles.message}>Go start to make a quiz</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#fff",
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
    color: "#444",
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Quiz;
