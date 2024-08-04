import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import axios from "axios";
import ENV from "./config";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Received From");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [result, setResult] = useState("");
  const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } = ENV;

  const SendAlert = async () => {
    const alertData = {
      name: name,
      message: message,
      identifier: "donation",
      amount: amount,
      currency: currency,
    };
    if (!name || !Message || !amount) {
      setResult("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://streamlabs.com/api/v1.0/donations",
        alertData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      console.log("Response:", response);

      if (response.data.success) {
        setResult("Donation sent successfully!");
      } else {
        setResult("Failed to send donation!");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Headers:", error.response.headers);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/lalayt.jpg")} style={styles.image} />
      <Text>Name</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setName}
        value={name}
      />
      <Text>Message</Text>
      <TextInput
        style={{ height: 30, width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setMessage}
        value={message}
      />
      <SafeAreaView style={styles.payment}>
        <Button title="Gpay" onPress={() => setMessage("Received From GPay")} />
        <Button
          title="PhonePe"
          onPress={() => setMessage("Received From PhonePe")}
        />
        <Button
          title="Paytm"
          onPress={() => setMessage("Received From Paytm")}
        />
        <Button 
        title="Own"
        onPress={() => setMessage('')}
        />
      </SafeAreaView>
      <Text>Amount</Text>
      <TextInput
        style={{
          height: 30,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
        }}
        onChangeText={setAmount}
        value={amount}
      />
      <Button title="Send Donation" onPress={SendAlert} />
      <Text style={{ marginTop: 20 }}>{result}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  payment: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});
