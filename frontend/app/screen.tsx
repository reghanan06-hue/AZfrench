// import { Buffer } from "buffer";
// import { Audio } from "expo-av";
// import * as FileSystem from "expo-file-system";
// import { OpenAI } from "openai";
// import React from "react";
// import { Button, View } from "react-native";

// const openai = new OpenAI({
//   apiKey: "YOUR_OPENAI_API_KEY",
// });

// export default function App() {
//   const playLetterA = async () => {
//     try {
//       const text = "A";

//       // 1️⃣ توليد الصوت عبر OpenAI TTS
//       const response = await openai.audio.speech.create({
//         model: "gpt-4o-mini-tts",
//         voice: "alloy",
//         input: text,
//       });

//       // 2️⃣ تحويل ArrayBuffer إلى Buffer
//       const audioData = Buffer.from(await response.arrayBuffer());

//       // 3️⃣ تحديد ملف مؤقت
//       const cacheDir: string = (FileSystem as any).cacheDirectory;
//       if (!cacheDir) throw new Error("Cache directory not available");
//       const fileUri = `${cacheDir}letterA.mp3`;

//       // 4️⃣ كتابة الملف بصيغة base64
//       await (FileSystem as any).writeAsStringAsync(fileUri, audioData.toString("base64"), {
//         encoding: "base64",
//       });

//       // 5️⃣ تشغيل الملف الصوتي
//       const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
//       await sound.playAsync();
//     } catch (error) {
//       console.error("Error generating or playing audio:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Play A" onPress={playLetterA} />
//     </View>
//   );
// }
