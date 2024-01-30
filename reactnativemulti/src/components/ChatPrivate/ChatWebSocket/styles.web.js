const styles = {
  chatModal: {
    width: "300px",
    maxHeight: "500px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  },
  chatHeader: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  minimizeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  chatBody: {
    flexGrow: "1",
    padding: "10px",
    overflowY: "auto",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  message: {
    maxWidth: "80%",
    padding: "8px 12px",
    borderRadius: "12px",
    marginBottom: "10px",
    fontSize: "14px",
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
    display: "flex",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderTop: "1px solid #ccc",
  },
  chatInput: {
    flexGrow: "1",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    marginRight: "10px",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  sendButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default styles;
