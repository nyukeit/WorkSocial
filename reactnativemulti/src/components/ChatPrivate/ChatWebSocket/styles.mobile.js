import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatModal: {
    width: 300,
    maxHeight: 500,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 8,
    flexDirection: "column",
    position: "absolute",
    bottom: 20,
    right: 20,
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  minimizeButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    fontSize: 16,
  },
  chatBody: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  message: {
    maxWidth: "80%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  sentMessage: {
    backgroundColor: "#e1e1e1",
    alignSelf: "flex-start",
  },
  receivedMessage: {
    backgroundColor: "#007bff",
    color: "white",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "white",
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    cursor: "pointer",
  },
  sendButtonHover: {
    backgroundColor: "#0056b3",
  },
});

export default styles;
