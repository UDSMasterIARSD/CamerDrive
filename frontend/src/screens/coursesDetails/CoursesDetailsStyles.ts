import { Dimensions, StatusBar, StyleSheet } from 'react-native';

const CourseDetailsStyle = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    marginTop:StatusBar.currentHeight+40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'justify',
  },
  conceptsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  conceptContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom:25,
    width:Dimensions.get("window").width*0.9,
    alignItems:"center",

    //marginVertical: 5,
  },
  conceptText: {
    fontSize: 16,
    color: '#555',
  },
});

export default CourseDetailsStyle;