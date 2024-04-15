FROM node:alpine3.18
WORKDIR /app
COPY . ./app
RUN npm install -g expo-cli
RUN npm install
# RUN npx expo install react-native-web react-dom @expo/metro-runtime
RUN cd app
EXPOSE 8081
ENTRYPOINT ["npx", "expo", "start"]